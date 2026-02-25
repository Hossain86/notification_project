import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationTable } from '../components/NotificationTable';
import { NotificationCategory, Notification } from '../types/notifications';
import { getCategories, getNotifications } from '../services/api';
import '../styles/NotificationDetailPage.css';

export const NotificationDetailPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [categories, setCategories] = useState<NotificationCategory[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <h1>Notification Management System</h1>
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
