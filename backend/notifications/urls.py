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
    path('notifications/summary/', views.get_notification_summary, name='get_notification_summary'),
    path('notifications/mark-all-read/', views.mark_all_notifications_as_read, name='mark_all_notifications_as_read'),
    path('notifications/<int:notification_id>/mark-read/', views.mark_notification_as_read, name='mark_notification_as_read'),
    path('notifications/<str:category_name>/', views.get_notifications, name='get_notifications'),
    
    # User profile endpoints
    path('profile/categories/', views.get_user_categories, name='get_user_categories'),
    path('profile/categories/create/', views.create_category, name='create_category'),
    path('profile/categories/<int:category_id>/delete/', views.delete_category, name='delete_category'),
    path('profile/notifications/create/', views.create_notification, name='create_notification'),
    path('profile/notifications/<int:notification_id>/delete/', views.delete_notification, name='delete_notification'),
]