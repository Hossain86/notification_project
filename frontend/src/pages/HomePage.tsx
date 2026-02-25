import { useEffect, useState } from 'react';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationCategory } from '../types/notifications';
import { getCategories } from '../services/api';
import '../styles/HomePage.css';

export const HomePage = () => {
  const [categories, setCategories] = useState<NotificationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
        setError(null);
      } catch (err) {
        setError('Failed to load categories. Please make sure the backend is running.');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="home-page">
      <header className="app-header">
        <h1>Notification Management System</h1>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="content-full">
        <NotificationPanel categories={categories} loading={loading} />
      </div>
    </div>
  );
};
