from django.core.management.base import BaseCommand
from notifications.models import NotificationCategory, Notification
from django.utils import timezone


class Command(BaseCommand):
    help = 'Add 5 new test notifications to check notification icon'

    def handle(self, *args, **kwargs):
        self.stdout.write('Adding test notifications...')
        
        # Get or create categories
        categories_to_use = [
            "EHS Notification",
            "Global Approval Notification",
            "Workshop Notification",
            "Software Req. Notification",
            "Heavy Vehicle Notification"
        ]
        
        for cat_name in categories_to_use:
            category, created = NotificationCategory.objects.get_or_create(name=cat_name)
            if created:
                self.stdout.write(f'  Created new category: {cat_name}')
        
        # Add new notifications (all unread)
        test_notifications = [
            {
                "category_name": "EHS Notification",
                "data": {
                    "Code": "EHS-2026-001",
                    "Product": "Safety Equipment",
                    "Department": "Engineering Services",
                    "Section": "Health & Safety",
                    "For (Year & Date)": "2026-03-01",
                    "Create Date": "2026-03-01 14:30:00"
                }
            },
            {
                "category_name": "Global Approval Notification",
                "data": {
                    "SL": 1,
                    "Code": 999,
                    "Priority": "Urgent Priority",
                    "Subject": "New Equipment Purchase Request",
                    "Insert By": "John Smith (12345)",
                    "Department": "Production",
                    "Approval Deadline": "2026-03-05 17:00:00",
                    "Waiting Duration": "0 days, 0 hours"
                }
            },
            {
                "category_name": "Workshop Notification",
                "data": {
                    "Code": "WS-2026-045",
                    "Product": "Machine Repair",
                    "Department": "Workshop",
                    "Section": "Mechanical",
                    "For Date": "2026-03-01",
                    "Create Date": "2026-03-01 15:00:00"
                }
            },
            {
                "category_name": "Software Req. Notification",
                "data": {
                    "SL": 1,
                    "Code": "SR-2026-012",
                    "Development Team": "Backend Team",
                    "Request Type": "Feature Request",
                    "Task Title": "Add Export to Excel Functionality",
                    "For Department": "Finance",
                    "Create Date": "2026-03-01 13:45:00"
                }
            },
            {
                "category_name": "Heavy Vehicle Notification",
                "data": {
                    "SL": 1,
                    "Code": "HV-2026-008",
                    "Name (ID)": "Transport Request - RAW Materials",
                    "Section": "Logistics",
                    "Department": "Supply Chain",
                    "Required Date": "2026-03-02"
                }
            }
        ]
        
        added_count = 0
        for notif_data in test_notifications:
            category = NotificationCategory.objects.get(name=notif_data["category_name"])
            notification = Notification.objects.create(
                category=category,
                data=notif_data["data"],
                is_read=False,
                created_at=timezone.now()
            )
            added_count += 1
            self.stdout.write(f'  ✓ Added notification to {category.name}')
        
        self.stdout.write(self.style.SUCCESS(f'\nSuccessfully added {added_count} new test notifications!'))
        self.stdout.write(f'Total unread notifications: {Notification.objects.filter(is_read=False).count()}')
