from django.db import models
from django.contrib import admin
from django.contrib.auth.models import User

# Create your models here.
class NotificationCategory(models.Model):
    name = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='categories', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    
    class Meta:
        verbose_name_plural = "Notification Categories"
        unique_together = ['name', 'user']  # Each user can have unique category names

    def __str__(self):
        return self.name


class Notification(models.Model):
    category = models.ForeignKey(NotificationCategory, on_delete=models.CASCADE, related_name='notifications')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications', null=True, blank=True)
    data = models.JSONField()  # Stores all notification-specific fields
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.category.name} - {self.data.get('Code', self.data.get('SL', 'N/A'))}"


# ============ ADMIN REGISTRATION ============
@admin.register(NotificationCategory)
class NotificationCategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'name']
    search_fields = ['name']


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['id', 'category', 'is_read', 'created_at']
    list_filter = ['category', 'is_read', 'created_at']
    search_fields = ['data']
    readonly_fields = ['created_at', 'updated_at']