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
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            # Count all notifications for this category that belong to the user or are global
            return obj.notifications.filter(
                models.Q(user=request.user) | models.Q(user__isnull=True)
            ).count()
        else:
            # Count all global notifications (user=None)
            return obj.notifications.filter(user__isnull=True).count()


class NotificationSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Notification
        fields = ['id', 'category_name', 'data', 'is_read', 'created_at', 'updated_at']


# ============ COLUMN DEFINITIONS ============
# Column definitions for each notification type
# "Details" is a special column that shows an expand button in the UI
COLUMN_DEFINITIONS = {
    "Others Notification": ["Details", "HRMS", "EBS"],
    "EHS Notification": ["Details", "Code", "Product", "Department", "Section", "For (Year & Date)", "Create Date"],
    "Global Approval Forwarded by Me": ["Details", "SL", "Code", "Priority", "Subject", "Inserted By", "Department", "Create Date", "Forwarded To", "Forward Duration"],
    "Global Approval Notification": ["Details", "SL", "Code", "Priority", "Subject", "Insert By", "Department", "Approval Deadline", "Waiting Duration"],
    "Heavy Vehicle Notification": ["Details", "SL", "Code", "Name (ID)", "Section", "Department", "Required Date"],
    "Utility and Plumbing Notification": ["Details", "Code", "Product", "Department", "Section", "Create Date"],
    "Global Approval Forward Notification": ["Details", "SL", "Code", "Priority", "Subject", "Insert By", "Department", "Forward By", "Approval Deadline", "Waiting Duration"],
    "Workshop Notification": ["Details", "Code", "Product", "Department", "Section", "For Date", "Create Date"],
    "Electrical Notification": ["Details", "Code", "Cost Center", "Location", "Description", "Create Date"],
    "HVAC Notification": ["Details", "Code", "Cost Center", "Location", "Description", "Create Date"],
    "Paint Notification": ["Details", "Code", "Cost Center", "Description", "For Department", "Create Date"],
    "Wastage Notification": ["Details", "Code", "Wastage Type", "Wastage Category", "Insert by", "Department", "Create Date"],
    "Wastage Forward Notification": ["Details", "Code", "Wastage Type", "Wastage Category", "Insert by", "Department", "Create Date"],
    "Comp & PCB Notification": ["Details", "Code", "Cost Center", "Description", "Create Date"],
    "Carpenter Notification": ["Details", "Code", "Cost Center", "Description", "For Department", "Create Date"],
    "Permit to Work Notification": ["Details", "Code", "Work Title", "Work Place", "Insert by", "Create Date"],
    "Carpenter Forward Notification": ["Details", "Code", "Cost Center", "Description", "For Department", "Create Date"],
    "Gift Notification": ["Details", "Code", "Receiver Name", "Reference By", "Create Date"],
    "Software Req. Notification": ["Details", "SL", "Code", "Development Team", "Request Type", "Task Title", "For Department", "Create Date"],
    "Policy Approval Notification": ["Details", "SL", "Code", "Doc. Title", "Insert By", "Department", "Create Date"],
    "ESM Automation Notification": ["Details", "Code", "Cost Center", "Description", "For Department", "Create Date"],
    "Machine Making Req. Notification": ["Details", "Code", "Legal Entity", "Product", "Cost Center", "Create Date", "Approval For"],
    "Service Center Forward Notification": ["Details", "SL", "Code", "Name(ID)", "Department", "Section", "Date"],
    "Service Center Notification": ["Details", "SL", "Code", "Name(ID)", "Department", "Section", "Date"],
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
    
    # Get sorting parameters
    sort_by = request.GET.get('sort_by', 'id')  # Default sort by id
    sort_order = request.GET.get('sort_order', 'asc')  # Default ascending
    
    # Apply sorting
    if sort_by in ['id', 'name']:
        order_prefix = '-' if sort_order == 'desc' else ''
        categories = categories.order_by(f'{order_prefix}{sort_by}')
    
    serializer = CategorySerializer(categories, many=True, context={'request': request})
    
    # If sorting by pending count, sort in Python since it's a computed field
    if sort_by == 'pending':
        data = serializer.data
        data = sorted(data, key=lambda x: x['pending'], reverse=(sort_order == 'desc'))
        return Response(data)
    
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
        
        # Get sorting parameters
        sort_by = request.GET.get('sort_by', '')
        sort_order = request.GET.get('sort_order', 'asc')
        
        serializer = NotificationSerializer(notifications, many=True)
        
        # Get column definitions for this category
        columns = COLUMN_DEFINITIONS.get(category_name, [])
        
        # Apply sorting if sort_by is specified and valid
        notifications_data = serializer.data
        if sort_by and sort_by != 'Details':
            def get_sort_value(notification):
                value = notification['data'].get(sort_by)
                if value is None:
                    return ''
                # Try to convert to number if possible
                try:
                    return float(value)
                except (ValueError, TypeError):
                    # Try to parse as date
                    try:
                        from datetime import datetime
                        return datetime.fromisoformat(str(value).replace('Z', '+00:00'))
                    except:
                        # Return as string
                        return str(value).lower()
            
            notifications_data = sorted(
                notifications_data,
                key=get_sort_value,
                reverse=(sort_order == 'desc')
            )
        
        return Response({
            'category': category_name,
            'columns': columns,
            'notifications': notifications_data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=404)


@api_view(['GET'])
def get_notification_summary(request):
    """Get summary of recent unread notifications for the notification icon"""
    try:
        # Get all unread notifications for user or global (last 7 days)
        from datetime import timedelta
        from django.utils import timezone
        
        # Calculate the timestamp for 7 days ago
        time_threshold = timezone.now() - timedelta(days=7)
        
        if request.user.is_authenticated:
            recent_notifications = Notification.objects.filter(
                models.Q(user=request.user) | models.Q(user__isnull=True),
                created_at__gte=time_threshold,
                is_read=False
            ).select_related('category').order_by('-created_at')[:20]
        else:
            recent_notifications = Notification.objects.filter(
                user__isnull=True,
                created_at__gte=time_threshold,
                is_read=False
            ).select_related('category').order_by('-created_at')[:20]
        
        # Get total count
        total_count = recent_notifications.count()
        
        # Format notifications for the dropdown
        notifications_data = []
        for notification in recent_notifications:
            # Extract a title and details from the notification data
            data = notification.data
            title = notification.category.name
            details = ""
            
            # Try to get meaningful title and details from the data
            if isinstance(data, dict):
                # Extract title (first meaningful field)
                title_field = (data.get('Subject') or 
                              data.get('Code') or 
                              data.get('Work Title') or 
                              data.get('Task Title') or 
                              data.get('Description') or 
                              data.get('Doc. Title') or
                              data.get('Product') or
                              data.get('Name (ID)') or
                              f"Notification #{notification.id}")
                
                # Extract details (second or third meaningful field)
                detail_fields = []
                for key in ['Department', 'Section', 'Priority', 'Insert By', 'Inserted By', 'For Date', 'Required Date', 'Create Date']:
                    if key in data and data[key]:
                        detail_fields.append(f"{data[key]}")
                
                if detail_fields:
                    details = " • ".join(detail_fields[:2])  # Limit to 2 detail fields
                
                title = str(title_field)[:80]  # Limit title length
            
            notifications_data.append({
                'id': notification.id,
                'category_name': notification.category.name,
                'title': title,
                'details': details[:100],  # Limit details length
                'created_at': notification.created_at.isoformat()
            })
        
        return Response({
            'total_count': total_count,
            'recent_notifications': notifications_data
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
@csrf_exempt
def mark_notification_as_read(request, notification_id):
    """Mark a specific notification as read"""
    try:
        if request.user.is_authenticated:
            notification = Notification.objects.filter(
                models.Q(user=request.user) | models.Q(user__isnull=True),
                id=notification_id
            ).first()
        else:
            notification = Notification.objects.filter(
                user__isnull=True,
                id=notification_id
            ).first()
        
        if not notification:
            return Response({'error': 'Notification not found'}, status=404)
        
        notification.is_read = True
        notification.save()
        
        return Response({'message': 'Notification marked as read'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
@csrf_exempt
def mark_all_notifications_as_read(request):
    """Mark all notifications as read for the current user"""
    try:
        if request.user.is_authenticated:
            # Mark all unread notifications for this user
            Notification.objects.filter(
                models.Q(user=request.user) | models.Q(user__isnull=True),
                is_read=False
            ).update(is_read=True)
        else:
            # Mark all unread global notifications
            Notification.objects.filter(
                user__isnull=True,
                is_read=False
            ).update(is_read=True)
        
        return Response({'message': 'All notifications marked as read'})
    except Exception as e:
        return Response({'error': str(e)}, status=400)


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

