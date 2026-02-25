# Notification Management System

A comprehensive notification panel system built with Django (Python) backend and React TypeScript (Vite) frontend. The system manages 24 different types of notifications with varying column structures.

## Features

- **24 Notification Categories**: Including EHS, Global Approval, Heavy Vehicle, Workshop, Electrical, HVAC, and many more
- **Dynamic Column Display**: Each notification type has its own specific columns
- **Responsive UI**: Clean interface with panel view and detailed table view
- **REST API**: Django REST Framework backend with CORS support
- **Type Safety**: TypeScript frontend for better development experience
- **Sample Data**: Pre-loaded with sample notifications for testing

## Project Structure

```
notification_project/
├── backend/              # Django backend
│   ├── config/          # Django settings and URLs
│   ├── notifications/   # Main app with models, views, serializers
│   ├── db.sqlite3       # SQLite database
│   ├── manage.py        # Django management script
│   └── requirements.txt # Python dependencies
├── frontend/            # React TypeScript frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service layer
│   │   ├── styles/      # CSS stylesheets
│   │   └── types/       # TypeScript type definitions
│   ├── package.json     # Node dependencies
│   └── vite.config.ts   # Vite configuration
└── venv/                # Python virtual environment
```

## Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- npm or yarn

## Backend Setup

1. **Navigate to project root:**
   ```bash
   cd C:\Users\WALTON\Documents\IA-CODE\notification_project
   ```

2. **Activate virtual environment:**
   ```bash
   .\venv\Scripts\Activate.ps1
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r backend\requirements.txt
   ```

4. **Run migrations** (already done, but if needed):
   ```bash
   python backend\manage.py migrate
   ```

5. **Load sample data** (already done, but if needed):
   ```bash
   python backend\manage.py load_sample_data
   ```

6. **Create superuser** (optional, for Django admin):
   ```bash
   python backend\manage.py createsuperuser
   ```

7. **Start Django development server:**
   ```bash
   python backend\manage.py runserver
   ```
   
   Backend will be available at: http://localhost:8000
   Admin panel at: http://localhost:8000/admin

## Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node dependencies:**
   ```bash
   npm install
   ```

3. **Start Vite development server:**
   ```bash
   npm run dev
   ```
   
   Frontend will be available at: http://localhost:5173

## Usage

1. **Start the backend server** (in one terminal):
   ```bash
   .\venv\Scripts\Activate.ps1
   python backend\manage.py runserver
   ```

2. **Start the frontend server** (in another terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open your browser** and navigate to:
   ```
   http://localhost:5173
   ```

4. **Navigate the interface:**
   - **Home Page**: Shows all 24 notification categories with pending counts
   - **Click any category**: View detailed table with category-specific columns
   - **Panel (left)**: Always visible in detail view for easy navigation
   - **Table (right)**: Shows all notifications for selected category

## API Endpoints

### Get All Categories
```
GET /api/categories/
```
Returns all notification categories with pending counts.

### Get Notifications by Category
```
GET /api/notifications/{category_name}/
```
Returns notifications for a specific category along with column definitions.

## Notification Categories

The system supports 24 notification types:

1. Others Notification
2. EHS Notification
3. Global Approval Forwarded by Me
4. Global Approval Notification
5. Heavy Vehicle Notification
6. Utility and Plumbing Notification
7. Global Approval Forward Notification
8. Workshop Notification
9. Electrical Notification
10. HVAC Notification
11. Paint Notification
12. Wastage Notification
13. Wastage Forward Notification
14. Comp & PCB Notification
15. Carpenter Notification
16. Permit to Work Notification
17. Carpenter Forward Notification
18. Gift Notification
19. Software Req. Notification
20. Policy Approval Notification
21. ESM Automation Notification
22. Machine Making Req. Notification
23. Service Center Forward Notification
24. Service Center Notification

Each category has its own set of columns defined in the backend.

## Technology Stack

### Backend
- **Django 5.1.5**: Web framework
- **Django REST Framework 3.15.2**: API framework
- **django-cors-headers 4.6.0**: CORS support
- **SQLite**: Database

### Frontend
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite 5**: Build tool and dev server
- **React Router 6**: Client-side routing
- **Axios**: HTTP client
- **CSS**: Styling (no framework, custom styles)

## Development

### Adding New Notification Categories

1. Add category in `load_sample_data.py` command
2. Define columns in `COLUMN_DEFINITIONS` in `views.py`
3. Run `python backend\manage.py load_sample_data` to recreate data

### Frontend Development
- Components are in `frontend/src/components/`
- Pages are in `frontend/src/pages/`
- API calls are centralized in `frontend/src/services/api.ts`
- Types are defined in `frontend/src/types/notifications.ts`

### Backend Development
- Models: `backend/notifications/models.py`
- Views: `backend/notifications/views.py`
- Serializers: `backend/notifications/serializers.py`
- URLs: `backend/notifications/urls.py`

## Troubleshooting

### Backend Issues
- **Import errors**: Make sure virtual environment is activated
- **Database errors**: Run `python backend\manage.py migrate`
- **No data**: Run `python backend\manage.py load_sample_data`

### Frontend Issues
- **Cannot connect to backend**: Ensure Django server is running on port 8000
- **CORS errors**: Check `django-cors-headers` is installed and configured
- **Module not found**: Run `npm install` in frontend directory

## Team Collaboration

The project structure allows team members to work independently:

- **Backend developers**: Work in `backend/` directory
- **Frontend developers**: Work in `frontend/` directory
- **Merge**: Simple git merge as directories are separate

## Future Enhancements

- Add user authentication
- Implement notification read/unread toggle
- Add filtering and search functionality
- Export notifications to Excel/PDF
- Real-time notifications with WebSockets
- Pagination for large datasets
- Dark mode support

## License

This project is for internal use.

## Contact

For questions or issues, contact the development team.
