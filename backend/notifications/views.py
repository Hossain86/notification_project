from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import serializers
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
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
    categories = NotificationCategory.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_notifications(request, category_name):
    try:
        category = NotificationCategory.objects.get(name=category_name)
        notifications = Notification.objects.filter(category=category)
        serializer = NotificationSerializer(notifications, many=True)
        
        # Get column definitions for this category
        columns = COLUMN_DEFINITIONS.get(category_name, [])
        
        return Response({
            'category': category_name,
            'columns': columns,
            'notifications': serializer.data
        })
    except NotificationCategory.DoesNotExist:
        return Response({'error': 'Category not found'}, status=404)


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
