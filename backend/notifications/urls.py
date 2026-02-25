from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', views.login_user, name='login'),
    path('auth/logout/', views.logout_user, name='logout'),
    path('auth/check/', views.check_auth, name='check_auth'),
    
    # Notification endpoints
    path('categories/', views.get_categories, name='get_categories'),
    path('notifications/<str:category_name>/', views.get_notifications, name='get_notifications'),
]