from django.urls import path
from . import views

urlpatterns = [
    path('categories/', views.get_categories, name='get_categories'),
    path('notifications/<str:category_name>/', views.get_notifications, name='get_notifications'),
]