from django.core.management.base import BaseCommand
from notifications.models import NotificationCategory, Notification
import random


class Command(BaseCommand):
    help = 'Load sample notification data for all 24 notification types'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading sample data...')
        
        # Clear existing data
        Notification.objects.all().delete()
        NotificationCategory.objects.all().delete()
        
        # Create all notification categories with actual data
        self.create_ehs_notifications()
        self.create_global_approval_forwarded_notifications()
        self.create_global_approval_forward_notifications()
        self.create_global_approval_notifications()
        self.create_utility_plumbing_notifications()
        self.create_heavy_vehicle_notifications()
        self.create_workshop_notifications()
        self.create_electrical_notifications()
        self.create_hvac_notifications()
        self.create_paint_notifications()
        self.create_wastage_notifications()
        self.create_wastage_forward_notifications()
        self.create_comp_pcb_notifications()
        self.create_permit_to_work_notifications()
        self.create_carpenter_notifications()
        self.create_carpenter_forward_notifications()
        self.create_gift_notifications()
        self.create_software_req_notifications()
        self.create_policy_approval_notifications()
        self.create_esm_automation_notifications()
        self.create_machine_making_notifications()
        self.create_service_center_notifications()
        self.create_service_center_forward_notifications()
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded sample data!'))
        self.stdout.write(f'Total categories: {NotificationCategory.objects.count()}')
        self.stdout.write(f'Total notifications: {Notification.objects.count()}')

    def create_ehs_notifications(self):
        """EHS Notification"""
        category = NotificationCategory.objects.create(name="EHS Notification")
        notifications_data = [
            {"Code": 217, "Product": "Common", "Department": "Utility Services", "Section": "Plumbing & Fire Protection System", "For (Year & Date)": "2025-10-09", "Create Date": "2025-10-09 10:18:05"},
            {"Code": 216, "Product": "Common", "Department": "Utility Services", "Section": "Plumbing & Fire Protection System", "For (Year & Date)": "2025-10-09", "Create Date": "2025-10-09 10:11:45"},
            {"Code": 152, "Product": "Compressor", "Department": "Engineering Services Management", "Section": "General Admin", "For (Year & Date)": "2023-08-26", "Create Date": "2023-08-26 09:36:10"},
            {"Code": 151, "Product": "Blender", "Department": "Engineering Services Management", "Section": "General Admin", "For (Year & Date)": "2023-08-26", "Create Date": "2023-08-26 09:35:25"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_global_approval_forwarded_notifications(self):
        """Global Approval Forwarded by Me"""
        category = NotificationCategory.objects.create(name="Global Approval Forwarded by Me")
        notifications_data = [
            {"SL": 1, "Code": 658, "Priority": "Urgent Priority", "Subject": "testing by", "Inserted By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Create Date": "2025-06-20 12:09:03", "Forwarded To": "Kamrul Hasan (11366)", "Forward Duration": "40 days, 20 hours"},
            {"SL": 2, "Code": 537, "Priority": "R", "Subject": "Randomly test", "Inserted By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Create Date": "2025-01-06 12:28:06", "Forwarded To": "Sahadat Hossain (54669)", "Forward Duration": "128 days, 19 hours"},
            {"SL": 3, "Code": 461, "Priority": "R", "Subject": "Randomly Forward test", "Inserted By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Create Date": "2024-10-17 11:27:17", "Forwarded To": "Md. Arifur Rahman (Noyon) (25600)", "Forward Duration": "345 days, 22 hours"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_global_approval_forward_notifications(self):
        """Global Approval Forward Notification"""
        category = NotificationCategory.objects.create(name="Global Approval Forward Notification")
        notifications_data = [
            {"SL": 1, "Code": 732, "Priority": "Regular", "Subject": "sfste", "Insert By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Forward By": "Md. Motaleb Hossain (14930)", "Approval Deadline": "2026-03-02 11:25:29", "Waiting Duration": "3 days, 0 hours"},
            {"SL": 2, "Code": 731, "Priority": "Regular", "Subject": "This is test version of approval path", "Insert By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Forward By": "Sahadat Hossain (54669)", "Approval Deadline": "—", "Waiting Duration": "38 days, 23 hours"},
            {"SL": 3, "Code": 712, "Priority": "Regular", "Subject": "number format test", "Insert By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Forward By": "Md. Arifur Rahman (Noyon) (25600)", "Approval Deadline": "—", "Waiting Duration": "133 days, 21 hours"},
            {"SL": 4, "Code": 651, "Priority": "Regular", "Subject": "MD sir forward test", "Insert By": "Md. Arifur Rahman (Noyon) (25600)", "Department": "ICT", "Forward By": "S.M. Mahbubul Alam (M005)", "Approval Deadline": "—", "Waiting Duration": "251 days, 21 hours"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_global_approval_notifications(self):
        """Global Approval Notification"""
        category = NotificationCategory.objects.create(name="Global Approval Notification")
        notifications_data = [
            {"SL": 1, "Code": 727, "Priority": "Regular", "Subject": "test", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Approval Deadline": "2026-01-25 12:01:34", "Waiting Duration": "39 days, 21 hours"},
            {"SL": 2, "Code": 724, "Priority": "Regular", "Subject": "dfg", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Approval Deadline": "", "Waiting Duration": "66 days, 21 hours"},
            {"SL": 3, "Code": 644, "Priority": "Regular", "Subject": "Testing 1", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Approval Deadline": "", "Waiting Duration": "252 days, 16 hours"},
            {"SL": 4, "Code": 637, "Priority": "Regular", "Subject": "sdfs", "Insert By": "Sahadat Hossain(54669)", "Department": "ICT", "Approval Deadline": "", "Waiting Duration": "253 days, 19 hours"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_utility_plumbing_notifications(self):
        """Utility and Plumbing Notification - NO Details field"""
        category = NotificationCategory.objects.create(name="Utility and Plumbing Notification")
        notifications_data = [
            {"Code": 58, "Product": "Engineering Services Management", "Department": "Plumber", "Section": "Plumber", "Create Date": "2025-07-22 15:23:15"},
            {"Code": 57, "Product": "Engineering Services Management", "Department": "Plumber", "Section": "Plumber", "Create Date": "2025-07-22 15:16:54"},
            {"Code": 49, "Product": "ICT", "Department": "Walton Software Development", "Section": "Walton Software Development", "Create Date": "2025-03-19 13:43:43"},
            {"Code": 48, "Product": "ICT", "Department": "Walton Software Development", "Section": "Walton Software Development", "Create Date": "2025-03-19 13:41:56"},
            {"Code": 47, "Product": "ICT", "Department": "Walton Software Development", "Section": "Walton Software Development", "Create Date": "2025-03-18 16:00:27"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_heavy_vehicle_notifications(self):
        """Heavy Vehicle Notification"""
        category = NotificationCategory.objects.create(name="Heavy Vehicle Notification")
        notifications_data = [
            {"SL": 1, "Code": 187, "Name (ID)": "Md. Arifur Rahman (Noyon) (25600)", "Section": "Walton Software Development", "Department": "ICT", "Required Date": "02-02-2026"},
            {"SL": 2, "Code": 167, "Name (ID)": "Md. Sajibul Islam Apon (54743)", "Section": "Walton Software Development", "Department": "ICT", "Required Date": "21-08-2025"},
            {"SL": 3, "Code": 58, "Name (ID)": "Md. Arifur Rahman (Noyon) (25600)", "Section": "Walton Software Development", "Department": "ICT", "Required Date": "18-01-2025"},
            {"SL": 4, "Code": 56, "Name (ID)": "Md. Arifur Rahman (Noyon) (25600)", "Section": "Walton Software Development", "Department": "ICT", "Required Date": "18-01-2025"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_workshop_notifications(self):
        """Workshop Notification"""
        category = NotificationCategory.objects.create(name="Workshop Notification")
        notifications_data = [
            {"Code": 217, "Product": "Common", "Department": "Utility Services", "Section": "Plumbing & Fire Protection System", "For Date": "2025-10-09", "Create Date": "2025-10-09 10:18:05"},
            {"Code": 216, "Product": "Common", "Department": "Utility Services", "Section": "Plumbing & Fire Protection System", "For Date": "2025-10-09", "Create Date": "2025-10-09 10:11:45"},
            {"Code": 152, "Product": "Compressor", "Department": "Engineering Services Management", "Section": "General Admin", "For Date": "2023-08-26", "Create Date": "2023-08-26 09:36:10"},
            {"Code": 151, "Product": "Blender", "Department": "Engineering Services Management", "Section": "General Admin", "For Date": "2023-08-26", "Create Date": "2023-08-26 09:35:25"},
            {"Code": 150, "Product": "Common", "Department": "Engineering Services Management", "Section": "General Admin", "For Date": "2023-08-26", "Create Date": "2023-08-26 09:34:01"},
            {"Code": 149, "Product": "Common", "Department": "ICT", "Section": "Walton Software Development", "For Date": "2023-08-26", "Create Date": "2023-08-26 09:32:45"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_electrical_notifications(self):
        """Electrical Notification"""
        category = NotificationCategory.objects.create(name="Electrical Notification")
        notifications_data = [
            {"Code": 120, "Cost Center": "IT-Walton Software Development", "Location": "Corporate Office", "Description": "For Official", "Create Date": "2025-04-22 11:27:55"},
            {"Code": 118, "Cost Center": "Common", "Location": "Building-1, 2, 3 & Alamin City_Block-C", "Description": "For Official", "Create Date": "2025-03-18 14:51:33"},
            {"Code": 110, "Cost Center": "Common", "Location": "Building-2 & Shed-1_Block-B", "Description": "For Official", "Create Date": "2024-12-08 15:21:29"},
            {"Code": 109, "Cost Center": "Transport Management-General Transport Management-General Pool", "Location": "Building-2 & Shed-1_Block-B", "Description": "For Official", "Create Date": "2024-12-03 12:59:36"},
            {"Code": 107, "Cost Center": "Common", "Location": "Building-2 & Shed-1_Block-B", "Description": "For Official", "Create Date": "2024-09-29 15:18:31"},
            {"Code": 100, "Cost Center": "Common", "Location": "Building-2 & Shed-1_Block-B", "Description": "For Official", "Create Date": "2024-05-22 11:34:33"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_hvac_notifications(self):
        """HVAC Notification"""
        category = NotificationCategory.objects.create(name="HVAC Notification")
        notifications_data = [
            {"Code": 52, "Cost Center": "Finance & Accounts-Finance-Financing", "Location": "Main Building_Block-A", "Description": "For Official", "Create Date": "2024-09-30 15:14:20"},
            {"Code": 51, "Cost Center": "Common", "Location": "Building-2_Block-A", "Description": "For Official", "Create Date": "2024-08-29 17:19:02"},
            {"Code": 49, "Cost Center": "Common", "Location": "Main Building_Block-A", "Description": "For Official", "Create Date": "2024-08-03 14:55:24"},
            {"Code": 47, "Cost Center": "Administration-Transport Management-General Pool", "Location": "Main Building_Block-A", "Description": "For Official", "Create Date": "2024-07-31 13:07:07"},
            {"Code": 46, "Cost Center": "Administration-Transport Management-General Pool", "Location": "Building-2_Block-A", "Description": "For Official", "Create Date": "2024-07-31 13:05:35"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_paint_notifications(self):
        """Paint Notification"""
        category = NotificationCategory.objects.create(name="Paint Notification")
        notifications_data = [
            {"Code": 40, "Cost Center": "Administration-Core Admin", "Description": "For Official", "For Department": "ICT", "Create Date": "2024-10-03 17:14:00"},
            {"Code": 30, "Cost Center": "Finance & Accounts-Finance-Financing", "Description": "For Official", "For Department": "Engineering Services Management", "Create Date": "2023-08-31 12:24:37"},
            {"Code": 28, "Cost Center": "Administration-Core Admin", "Description": "For Official", "For Department": "Engineering Services Management", "Create Date": "2023-08-27 14:33:56"},
            {"Code": 27, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2023-08-27 14:32:22"},
            {"Code": 26, "Cost Center": "Administration-Transport Management-General Pool", "Description": "For Official", "For Department": "ICT", "Create Date": "2023-08-27 13:29:53"},
            {"Code": 25, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2023-08-27 13:22:28"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_wastage_notifications(self):
        """Wastage Notification"""
        category = NotificationCategory.objects.create(name="Wastage Notification")
        notifications_data = [
            {"Code": 597, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Free Packaging Item (Bag, Drum, Cartoon, Box etc.)", "Insert by": "25600", "Department": "ICT", "Create Date": "2026-02-18 12:06:21"},
            {"Code": 596, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Free Packaging Item (Metal)", "Insert by": "25600", "Department": "ICT", "Create Date": "2026-02-18 11:41:00"},
            {"Code": 595, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Free Packaging Item (Metal)", "Insert by": "25600", "Department": "ICT", "Create Date": "2026-02-18 11:40:42"},
            {"Code": 594, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Free Packaging Item (Metal)", "Insert by": "25600", "Department": "ICT", "Create Date": "2026-02-18 11:40:29"},
            {"Code": 581, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Free Packaging Item (Bag, Drum, Cartoon, Box etc.)", "Insert by": "25600", "Department": "ICT", "Create Date": "2026-01-10 09:44:27"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_wastage_forward_notifications(self):
        """Wastage Forward Notification"""
        category = NotificationCategory.objects.create(name="Wastage Forward Notification")
        notifications_data = [
            {"Code": 497, "Wastage Type": "Mold, Die and Jig Wastage/Disposal Declaration", "Wastage Category": "Mold", "Insert by": "25600", "Department": "ICT", "Create Date": "2025-09-25 12:11:53"},
            {"Code": 395, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Inventory (Non-Metallic: Raw Material, Packaging Material, Semi-Finished Goods)", "Insert by": "25600", "Department": "ICT", "Create Date": "2024-03-02 14:32:58"},
            {"Code": 400, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Inventory (Non-Metallic: Raw Material, Packaging Material, Semi-Finished Goods)", "Insert by": "25600", "Department": "ICT", "Create Date": "2024-04-07 10:52:48"},
            {"Code": 160, "Wastage Type": "Item Wastage Declaration", "Wastage Category": "Fixed Asset (Except Machine) [Taken from In-House Manufacturing]", "Insert by": "I-248", "Department": "IT", "Create Date": "2023-06-14 14:26:35"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_comp_pcb_notifications(self):
        """Comp & PCB Notification"""
        category = NotificationCategory.objects.create(name="Comp & PCB Notification")
        notifications_data = [
            {"Code": 56, "Cost Center": "Common", "Description": "For Official", "Create Date": "2025-04-09 14:40:43"},
            {"Code": 31, "Cost Center": "Common", "Description": "For Official", "Create Date": "2023-07-11 15:30:33"},
            {"Code": 30, "Cost Center": "Administration-Transport Management-General Pool", "Description": "For Official", "Create Date": "2023-07-11 15:29:22"},
            {"Code": 24, "Cost Center": "HRM-Core HR", "Description": "For Official", "Create Date": "2023-06-06 10:11:43"},
            {"Code": 19, "Cost Center": "IT-Walton Software Development", "Description": "For Official test", "Create Date": "2023-05-18 14:27:09"},
            {"Code": 16, "Cost Center": "Administration-Core Admin", "Description": "Official use", "Create Date": "2023-05-04 15:04:09"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_permit_to_work_notifications(self):
        """Permit to Work Notification"""
        category = NotificationCategory.objects.create(name="Permit to Work Notification")
        notifications_data = [
            {"Code": 4, "Work Title": "ghfgh", "Work Place": "g,", "Insert by": "25600", "Create Date": "2025-08-14 10:24:10"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_carpenter_notifications(self):
        """Carpenter Notification"""
        category = NotificationCategory.objects.create(name="Carpenter Notification")
        notifications_data = [
            {"Code": 119, "Cost Center": "Production Management-Manufacturing (SFG)-Mold & Jig Support", "Description": "For Official", "For Department": "Production Management", "Create Date": "2026-01-30 11:17:55"},
            {"Code": 116, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-10-21 15:18:49"},
            {"Code": 115, "Cost Center": "Administration-Core Admin", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-07-21 16:47:56"},
            {"Code": 114, "Cost Center": "Transport Management-General Transport Management-General Pool", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-07-21 15:53:42"},
            {"Code": 112, "Cost Center": "Transport Management-General Transport Management-General Pool", "Description": "For Official", "For Department": "Finance & Accounts", "Create Date": "2025-03-20 11:52:19"},
            {"Code": 109, "Cost Center": "IT-Walton Software Development", "Description": "For Official", "For Department": "ICT", "Create Date": "2024-12-02 16:46:34"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_carpenter_forward_notifications(self):
        """Carpenter Forward Notification"""
        category = NotificationCategory.objects.create(name="Carpenter Forward Notification")
        notifications_data = [
            {"Code": 55, "Cost Center": "Administration-Transport Management-General Pool", "Description": "For Official", "For Department": "ICT", "Create Date": "2024-02-20 12:30:40"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_gift_notifications(self):
        """Gift Notification"""
        category = NotificationCategory.objects.create(name="Gift Notification")
        notifications_data = [
            {"Code": 85, "Receiver Name": "Md. Arifur Rahman (Noyon)", "Reference By": "Md. Arifur Rahman (Noyon)", "Create Date": "2025-09-30 10:42:52"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_software_req_notifications(self):
        """Software Req. Notification"""
        category = NotificationCategory.objects.create(name="Software Req. Notification")
        notifications_data = [
            {"SL": 1, "Code": 81, "Development Team": "Administrative Automation", "Request Type": "Report Modification", "Task Title": "test", "For Department": "ICT", "Create Date": "2026-01-18 12:03:10"},
            {"SL": 2, "Code": 79, "Development Team": "Administrative Automation", "Request Type": "Wrong Entry / Issue Fixing", "Task Title": "Test", "For Department": "ICT", "Create Date": "2026-01-11 12:31:47"},
            {"SL": 3, "Code": 77, "Development Team": "Administrative Automation", "Request Type": "New User Access", "Task Title": "tesssss", "For Department": "ICT", "Create Date": "2026-01-07 12:55:36"},
            {"SL": 4, "Code": 76, "Development Team": "Administrative Automation", "Request Type": "New System/Project dev.", "Task Title": "test", "For Department": "ICT", "Create Date": "2026-01-07 10:52:39"},
            {"SL": 5, "Code": 68, "Development Team": "Administrative Automation", "Request Type": "New System/Project dev.", "Task Title": "test", "For Department": "ICT", "Create Date": "2025-12-15 14:31:16"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_policy_approval_notifications(self):
        """Policy Approval Notification"""
        category = NotificationCategory.objects.create(name="Policy Approval Notification")
        notifications_data = [
            {"SL": 1, "Code": 140, "Doc. Title": "sdfsdf", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Create Date": "2025-06-25 16:53:16"},
            {"SL": 2, "Code": 135, "Doc. Title": "test", "Insert By": "Md. Faysal Hossan(54373)", "Department": "HRM", "Create Date": "2025-02-25 12:17:18"},
            {"SL": 3, "Code": 128, "Doc. Title": "TEST", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Create Date": "2024-11-14 12:04:49"},
            {"SL": 4, "Code": 113, "Doc. Title": "test", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Create Date": "2024-11-12 09:43:39"},
            {"SL": 5, "Code": 112, "Doc. Title": "test title 2 2", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Create Date": "2024-11-11 10:14:00"},
            {"SL": 6, "Code": 109, "Doc. Title": "test", "Insert By": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Create Date": "2024-11-09 09:40:41"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_esm_automation_notifications(self):
        """ESM Automation Notification"""
        category = NotificationCategory.objects.create(name="ESM Automation Notification")
        notifications_data = [
            {"Code": 22, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-02-12 12:48:09"},
            {"Code": 21, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-02-01 16:16:20"},
            {"Code": 18, "Cost Center": "IT-Walton Software Development", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-01-28 12:01:12"},
            {"Code": 17, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2025-01-02 10:18:05"},
            {"Code": 14, "Cost Center": "Common", "Description": "For Official", "For Department": "ICT", "Create Date": "2024-12-28 17:05:56"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_machine_making_notifications(self):
        """Machine Making Req. Notification"""
        category = NotificationCategory.objects.create(name="Machine Making Req. Notification")
        notifications_data = [
            {"Code": 32, "Legal Entity": "Walton Hi-Tech Industries PLC.", "Product": "Common", "Cost Center": "Common", "Create Date": "2025-07-20 10:39:35", "Approval For": "Delivery"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_service_center_notifications(self):
        """Service Center Notification"""
        category = NotificationCategory.objects.create(name="Service Center Notification")
        notifications_data = [
            {"SL": 1, "Code": 844, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "09/02/2026"},
            {"SL": 2, "Code": 729, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "05/02/2026"},
            {"SL": 3, "Code": 724, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "05/02/2026"},
            {"SL": 4, "Code": 723, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "05/02/2026"},
            {"SL": 5, "Code": 722, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "05/02/2026"},
            {"SL": 6, "Code": 721, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "05/02/2026"},
            {"SL": 7, "Code": 250, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "29/12/2025"},
            {"SL": 8, "Code": 249, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "29/12/2025"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')

    def create_service_center_forward_notifications(self):
        """Service Center Forward Notification"""
        category = NotificationCategory.objects.create(name="Service Center Forward Notification")
        notifications_data = [
            {"SL": 1, "Code": 51, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "27/07/2025"},
            {"SL": 2, "Code": 61, "Name(ID)": "Md. Arifur Rahman (Noyon)(25600)", "Department": "ICT", "Section": "Walton Software Development", "Date": "31/07/2025"},
            {"SL": 3, "Code": 10, "Name(ID)": "Md. Sajibul Islam Apon(54743)", "Department": "ICT", "Section": "Walton Software Development", "Date": "13/07/2025"},
        ]
        for data in notifications_data:
            Notification.objects.create(category=category, data=data, is_read=random.choice([True, False]))
        self.stdout.write(f'  Created category: {category.name}')
