from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.db import models
from .models import NotificationCategory, Notification


# ============ SERIALIZERS ============
class CategorySerializer(serializers.ModelSerializer):
    pending = serializers.SerializerMethodField()

    class Meta:
        model = NotificationCategory
        fields = ['id', 'name', 'pending']

    def get_pending(self, obj):
        return obj.notifications.filter(is_read=False).count()


class NotificationSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'category_name', 'data', 'is_read', 'created_at', 'updated_at']


# ============ COLUMN DEFINITIONS ============
# Column definitions for each notification type
COLUMN_DEFINITIONS = {
    "Others Notification": ["HRMS", "EBS"],
    "EHS Notification": ["Code", "Details", "Cost Center", "Type", "For Date", "Create Date"],
    "Global Approval Forwarded by Me": ["SL", "Code", "Priority", "Subject", "Insert By", "Department", "Create Date", "Forwarded To", "Forward Duration"],
    "Global Approval Notification": ["SL", "Code", "Priority", "Subject", "Insert By", "Department", "Approval Deadline", "Waiting Duration"],
    "Heavy Vehicle Notification": ["SL", "Code", "Details", "Name(ID)", "Section", "Department", "Required Date"],
    "Utility and Plumbing Notification": ["Code", "Details", "Product", "Department", "Section", "Create Date"],
    "Global Approval Forward Notification": ["SL", "Code", "Priority", "Subject", "Insert By", "Department", "Forward By", "Approval Deadline", "Waiting Duration"],
    "Workshop Notification": ["Code", "Details", "Product", "Department", "Section", "For Date", "Create Date"],
    "Electrical Notification": ["Code", "Details", "Cost Center", "Location", "Description", "Create Date"],
    "HVAC Notification": ["Code", "Details", "Cost Center", "Location", "Description", "Create Date"],
    "Paint Notification": ["Code", "Details", "Cost Center", "Description", "For Department", "Create Date"],
    "Wastage Notification": ["Code", "Details", "Wastage Type", "Wastage Category", "Insert by", "Department", "Create Date"],
    "Wastage Forward Notification": ["Code", "Details", "Wastage Type", "Wastage Category", "Insert by", "Department", "Create Date"],
    "Comp & PCB Notification": ["Code", "Details", "Cost Center", "Description", "Create Date"],
    "Carpenter Notification": ["Code", "Details", "Cost Center", "Description", "For Department", "Create Date"],
    "Permit to Work Notification": ["Code", "Details", "Work Title", "Work Place", "Insert By", "Create Date"],
    "Carpenter Forward Notification": ["Code", "Details", "Cost Center", "Description", "For Department", "Create Date"],
    "Gift Notification": ["Code", "Details", "Receiver Name", "Reference By", "Create Date"],
    "Software Req. Notification": ["SL", "Code", "Details", "Development Team", "Request Type", "Task Title", "For Department", "Create Date"],
    "Policy Approval Notification": ["SL", "Code", "Details", "Doc. Title", "Insert By", "Department", "Create Date"],
    "ESM Automation Notification": ["Code", "Details", "Cost Center", "Description", "For Department", "Create Date"],
    "Machine Making Req. Notification": ["Code", "Details", "Legal Entity", "Product", "Cost Center", "Create Date", "Approval For"],
    "Service Center Forward Notification": ["SL", "Code", "Details", "Name(ID)", "Department", "Section", "Date"],
    "Service Center Notification": ["SL", "Code", "Details", "Name(ID)", "Department", "Section", "Date"],
}

@api_view(['GET'])
def get_categories(request):
    # Get categories for the logged-in user and global categories (user=None)
    if request.user.is_authenticated:
        categories = NotificationCategory.objects.filter(
            models.Q(user=request.user) | models.Q(user__isnull=True)
        )
    else:
        categories = NotificationCategory.objects.filter(user__isnull=True)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_notifications(request, category_name):
    try:
        # Get category for user or global
        if request.user.is_authenticated:
            category = NotificationCategory.objects.filter(
                models.Q(user=request.user) | models.Q(user__isnull=True),
                name=category_name
            ).first()
        else:
            category = NotificationCategory.objects.filter(user__isnull=True, name=category_name).first()
        
        if not category:
            return Response({'error': 'Category not found'}, status=404)
            
        # Get notifications for this category and user
        if request.user.is_authenticated:
            notifications = Notification.objects.filter(
                category=category
            ).filter(
                models.Q(user=request.user) | models.Q(user__isnull=True)
            )
        else:
            notifications = Notification.objects.filter(category=category, user__isnull=True)
        serializer = NotificationSerializer(notifications, many=True)
        
        # Get column definitions for this category
        columns = COLUMN_DEFINITIONS.get(category_name, [])
        
        return Response({
            'category': category_name,
            'columns': columns,
            'notifications': serializer.data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=404)


# ============ AUTHENTICATION VIEWS ============

@api_view(['POST'])
@csrf_exempt
def register_user(request):
    """Register a new user"""
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email', '')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)
    
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)
    
    try:
        user = User.objects.create_user(username=username, password=password, email=email)
        login(request, user)
        return Response({
            'message': 'User registered successfully',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@csrf_exempt
def login_user(request):
    """Login user"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=400)
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            'message': 'Login successful',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        })
    else:
        return Response({'error': 'Invalid credentials'}, status=401)


@api_view(['POST'])
@csrf_exempt
def logout_user(request):
    """Logout user"""
    logout(request)
    return Response({'message': 'Logout successful'})


@api_view(['GET'])
@ensure_csrf_cookie
def check_auth(request):
    """Check if user is authenticated and ensure CSRF cookie is set"""
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': {'id': request.user.id, 'username': request.user.username, 'email': request.user.email}
        })
    else:
        return Response({'authenticated': False})


# ============ USER PROFILE VIEWS ============

@api_view(['POST'])
@csrf_exempt
def create_category(request):
    """Create a new notification category"""
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)
    
    name = request.data.get('name')
    
    if not name:
        return Response({'error': 'Category name is required'}, status=400)
    
    # Check if category already exists for this user
    if NotificationCategory.objects.filter(user=request.user, name=name).exists():
        return Response({'error': 'Category already exists'}, status=400)
    
    try:
        category = NotificationCategory.objects.create(
            name=name,
            user=request.user
        )
        return Response({
            'message': 'Category created successfully',
            'category': {'id': category.id, 'name': category.name}
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@csrf_exempt
def create_notification(request):
    """Create a new notification"""
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)
    
    category_id = request.data.get('category_id')
    data = request.data.get('data')
    
    if not category_id or not data:
        return Response({'error': 'Category ID and data are required'}, status=400)
    
    try:
        # Check if category belongs to user or is global
        category = NotificationCategory.objects.filter(
            models.Q(user=request.user) | models.Q(user__isnull=True),
            id=category_id
        ).first()
        
        if not category:
            return Response({'error': 'Category not found'}, status=404)
        
        notification = Notification.objects.create(
            category=category,
            user=request.user,
            data=data,
            is_read=False
        )
        
        serializer = NotificationSerializer(notification)
        return Response({
            'message': 'Notification created successfully',
            'notification': serializer.data
        }, status=201)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['GET'])
def get_user_categories(request):
    """Get all categories for the logged-in user"""
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)
    
    categories = NotificationCategory.objects.filter(user=request.user)
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@csrf_exempt
def delete_category(request, category_id):
    """Delete a category (only if it belongs to the user)"""
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)
    
    try:
        category = NotificationCategory.objects.get(id=category_id, user=request.user)
        category.delete()
        return Response({'message': 'Category deleted successfully'})
    except NotificationCategory.DoesNotExist:
        return Response({'error': 'Category not found or you do not have permission'}, status=404)


@api_view(['DELETE'])
@csrf_exempt
def delete_notification(request, notification_id):
    """Delete a notification (only if it belongs to the user)"""
    if not request.user.is_authenticated:
        return Response({'error': 'Authentication required'}, status=401)
    
    try:
        notification = Notification.objects.get(id=notification_id, user=request.user)
        notification.delete()
        return Response({'message': 'Notification deleted successfully'})
    except Notification.DoesNotExist:
        return Response({'error': 'Notification not found or you do not have permission'}, status=404)

