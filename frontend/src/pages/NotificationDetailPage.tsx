import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationTable } from '../components/NotificationTable';
import { NotificationCategory, Notification } from '../types/notifications';
import { getCategories, getNotifications } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/NotificationDetailPage.css';

export const NotificationDetailPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [categories, setCategories] = useState<NotificationCategory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        if (categoryName) {
          const notificationsData = await getNotifications(categoryName);
          setNotifications(notificationsData.notifications);
          setColumns(notificationsData.columns);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load data. Please make sure the backend is running.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName]);

  return (
    <div className="detail-page">
      <header className="app-header">
        <div className="header-left">
          <img src="/walton.webp" alt="Walton Logo" className="header-logo" />
          <h1>Notification Management System</h1>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/profile')} className="profile-button">Profile</button>
          <span className="user-info">Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="content-split">
        <div className="panel-section">
          <NotificationPanel categories={categories} loading={loading} />
        </div>
        <div className="table-section">
          <NotificationTable
            categoryName={categoryName || ''}
            columns={columns}
            notifications={notifications}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
