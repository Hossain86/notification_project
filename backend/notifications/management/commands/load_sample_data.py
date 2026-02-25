from django.core.management.base import BaseCommand
from notifications.models import NotificationCategory, Notification
from datetime import datetime, timedelta
import random


class Command(BaseCommand):
    help = 'Load sample notification data for all 23 notification types'

    def handle(self, *args, **kwargs):
        self.stdout.write('Loading sample data...')
        
        # Clear existing data
        Notification.objects.all().delete()
        NotificationCategory.objects.all().delete()
        
        # Create all 23 notification categories
        categories = [
            "Others Notification",
            "EHS Notification",
            "Global Approval Forwarded by Me",
            "Global Approval Notification",
            "Heavy Vehicle Notification",
            "Utility and Plumbing Notification",
            "Global Approval Forward Notification",
            "Workshop Notification",
            "Electrical Notification",
            "HVAC Notification",
            "Paint Notification",
            "Wastage Notification",
            "Wastage Forward Notification",
            "Comp & PCB Notification",
            "Carpenter Notification",
            "Permit to Work Notification",
            "Carpenter Forward Notification",
            "Gift Notification",
            "Software Req. Notification",
            "Policy Approval Notification",
            "ESM Automation Notification",
            "Machine Making Req. Notification",
            "Service Center Forward Notification",
            "Service Center Notification",
        ]
        
        for category_name in categories:
            category = NotificationCategory.objects.create(name=category_name)
            self.stdout.write(f'  Created category: {category_name}')
            
            # Create sample notifications for each category
            self.create_sample_notifications(category)
        
        self.stdout.write(self.style.SUCCESS('Successfully loaded sample data!'))
        self.stdout.write(f'Total categories: {NotificationCategory.objects.count()}')
        self.stdout.write(f'Total notifications: {Notification.objects.count()}')

    def create_sample_notifications(self, category):
        """Create 3-5 sample notifications for each category"""
        num_notifications = random.randint(3, 5)
        
        for i in range(num_notifications):
            data = self.get_sample_data(category.name, i + 1)
            is_read = random.choice([True, False])
            
            Notification.objects.create(
                category=category,
                data=data,
                is_read=is_read
            )

    def get_sample_data(self, category_name, index):
        """Generate sample data based on category type"""
        base_date = datetime.now()
        create_date = (base_date - timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d')
        for_date = (base_date + timedelta(days=random.randint(1, 30))).strftime('%Y-%m-%d')
        
        departments = ["Production", "IT", "HR", "Finance", "Operations", "Maintenance"]
        sections = ["Section A", "Section B", "Section C", "Admin"]
        priorities = ["High", "Medium", "Low"]
        cost_centers = ["CC-001", "CC-002", "CC-003", "CC-004"]
        
        sample_data = {
            "Others Notification": {
                "HRMS": f"HRMS-{1000 + index}",
                "EBS": f"EBS-{2000 + index}"
            },
            "EHS Notification": {
                "Code": f"EHS-{1000 + index}",
                "Details": f"Environmental health and safety issue #{index}",
                "Cost Center": random.choice(cost_centers),
                "Type": random.choice(["Incident", "Inspection", "Training"]),
                "For Date": for_date,
                "Create Date": create_date
            },
            "Global Approval Forwarded by Me": {
                "SL": index,
                "Code": f"GAF-{1000 + index}",
                "Priority": random.choice(priorities),
                "Subject": f"Approval request for project #{index}",
                "Insert By": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Create Date": create_date,
                "Forwarded To": f"Manager{random.randint(1, 5)}",
                "Forward Duration": f"{random.randint(1, 10)} days"
            },
            "Global Approval Notification": {
                "SL": index,
                "Code": f"GA-{1000 + index}",
                "Priority": random.choice(priorities),
                "Subject": f"Budget approval for Q{random.randint(1, 4)}",
                "Insert By": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Approval Deadline": for_date,
                "Waiting Duration": f"{random.randint(1, 15)} days"
            },
            "Heavy Vehicle Notification": {
                "SL": index,
                "Code": f"HV-{1000 + index}",
                "Details": f"Heavy vehicle request #{index}",
                "Name(ID)": f"Employee{random.randint(100, 999)}",
                "Section": random.choice(sections),
                "Department": random.choice(departments),
                "Required Date": for_date
            },
            "Utility and Plumbing Notification": {
                "Code": f"UP-{1000 + index}",
                "Details": f"Plumbing maintenance required in area #{index}",
                "Product": random.choice(["Pipes", "Valves", "Fittings", "Pumps"]),
                "Department": random.choice(departments),
                "Section": random.choice(sections),
                "Create Date": create_date
            },
            "Global Approval Forward Notification": {
                "SL": index,
                "Code": f"GAF-{1000 + index}",
                "Priority": random.choice(priorities),
                "Subject": f"Forward approval request #{index}",
                "Insert By": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Forward By": f"Supervisor{random.randint(1, 5)}",
                "Approval Deadline": for_date,
                "Waiting Duration": f"{random.randint(1, 20)} days"
            },
            "Workshop Notification": {
                "Code": f"WS-{1000 + index}",
                "Details": f"Workshop maintenance task #{index}",
                "Product": random.choice(["Tools", "Machinery", "Equipment", "Parts"]),
                "Department": random.choice(departments),
                "Section": random.choice(sections),
                "For Date": for_date,
                "Create Date": create_date
            },
            "Electrical Notification": {
                "Code": f"EL-{1000 + index}",
                "Details": f"Electrical work required #{index}",
                "Cost Center": random.choice(cost_centers),
                "Location": f"Building {random.choice(['A', 'B', 'C'])}, Floor {random.randint(1, 5)}",
                "Description": f"Installation/repair of electrical systems #{index}",
                "Create Date": create_date
            },
            "HVAC Notification": {
                "Code": f"HVAC-{1000 + index}",
                "Details": f"HVAC maintenance required #{index}",
                "Cost Center": random.choice(cost_centers),
                "Location": f"Building {random.choice(['A', 'B', 'C'])}, Floor {random.randint(1, 5)}",
                "Description": f"AC/Heating system service #{index}",
                "Create Date": create_date
            },
            "Paint Notification": {
                "Code": f"PT-{1000 + index}",
                "Details": f"Painting work required #{index}",
                "Cost Center": random.choice(cost_centers),
                "Description": f"Interior/exterior painting #{index}",
                "For Department": random.choice(departments),
                "Create Date": create_date
            },
            "Wastage Notification": {
                "Code": f"WN-{1000 + index}",
                "Details": f"Wastage report #{index}",
                "Wastage Type": random.choice(["Material", "Time", "Energy"]),
                "Wastage Category": random.choice(["Type A", "Type B", "Type C"]),
                "Insert by": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Create Date": create_date
            },
            "Wastage Forward Notification": {
                "Code": f"WF-{1000 + index}",
                "Details": f"Forwarded wastage report #{index}",
                "Wastage Type": random.choice(["Material", "Time", "Energy"]),
                "Wastage Category": random.choice(["Type A", "Type B", "Type C"]),
                "Insert by": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Create Date": create_date
            },
            "Comp & PCB Notification": {
                "Code": f"CP-{1000 + index}",
                "Details": f"Computer/PCB work required #{index}",
                "Cost Center": random.choice(cost_centers),
                "Description": f"PCB repair/replacement #{index}",
                "Create Date": create_date
            },
            "Carpenter Notification": {
                "Code": f"CN-{1000 + index}",
                "Details": f"Carpentry work required #{index}",
                "Cost Center": random.choice(cost_centers),
                "Description": f"Furniture/woodwork #{index}",
                "For Department": random.choice(departments),
                "Create Date": create_date
            },
            "Permit to Work Notification": {
                "Code": f"PTW-{1000 + index}",
                "Details": f"Work permit request #{index}",
                "Work Title": f"Maintenance Work #{index}",
                "Work Place": f"Zone {random.choice(['A', 'B', 'C', 'D'])}",
                "Insert By": f"User{random.randint(1, 20)}",
                "Create Date": create_date
            },
            "Carpenter Forward Notification": {
                "Code": f"CF-{1000 + index}",
                "Details": f"Forwarded carpentry work #{index}",
                "Cost Center": random.choice(cost_centers),
                "Description": f"Furniture/woodwork (forwarded) #{index}",
                "For Department": random.choice(departments),
                "Create Date": create_date
            },
            "Gift Notification": {
                "Code": f"GF-{1000 + index}",
                "Details": f"Gift approval request #{index}",
                "Receiver Name": f"Employee{random.randint(100, 999)}",
                "Reference By": f"Manager{random.randint(1, 10)}",
                "Create Date": create_date
            },
            "Software Req. Notification": {
                "SL": index,
                "Code": f"SR-{1000 + index}",
                "Details": f"Software development request #{index}",
                "Development Team": random.choice(["Team Alpha", "Team Beta", "Team Gamma"]),
                "Request Type": random.choice(["New Feature", "Bug Fix", "Enhancement"]),
                "Task Title": f"Implement feature #{index}",
                "For Department": random.choice(departments),
                "Create Date": create_date
            },
            "Policy Approval Notification": {
                "SL": index,
                "Code": f"PA-{1000 + index}",
                "Details": f"Policy approval required #{index}",
                "Doc. Title": f"Policy Document #{index}",
                "Insert By": f"User{random.randint(1, 20)}",
                "Department": random.choice(departments),
                "Create Date": create_date
            },
            "ESM Automation Notification": {
                "Code": f"ESM-{1000 + index}",
                "Details": f"ESM automation task #{index}",
                "Cost Center": random.choice(cost_centers),
                "Description": f"Automation workflow #{index}",
                "For Department": random.choice(departments),
                "Create Date": create_date
            },
            "Machine Making Req. Notification": {
                "Code": f"MM-{1000 + index}",
                "Details": f"Machine manufacturing request #{index}",
                "Legal Entity": random.choice(["Entity A", "Entity B", "Entity C"]),
                "Product": random.choice(["Machine Type 1", "Machine Type 2", "Machine Type 3"]),
                "Cost Center": random.choice(cost_centers),
                "Create Date": create_date,
                "Approval For": random.choice(departments)
            },
            "Service Center Forward Notification": {
                "SL": index,
                "Code": f"SCF-{1000 + index}",
                "Details": f"Service center forwarded request #{index}",
                "Name(ID)": f"Employee{random.randint(100, 999)}",
                "Department": random.choice(departments),
                "Section": random.choice(sections),
                "Date": create_date
            },
            "Service Center Notification": {
                "SL": index,
                "Code": f"SC-{1000 + index}",
                "Details": f"Service center request #{index}",
                "Name(ID)": f"Employee{random.randint(100, 999)}",
                "Department": random.choice(departments),
                "Section": random.choice(sections),
                "Date": create_date
            }
        }
        
        return sample_data.get(category_name, {})
