import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationCategory } from '../types/notifications';
import { getCategories } from '../services/api';
import { useAuth } from '../context/AuthContext';
import '../styles/HomePage.css';

export const HomePage = () => {
  const [categories, setCategories] = useState<NotificationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

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
      <div className="content-full">
        <NotificationPanel categories={categories} loading={loading} />
      </div>
    </div>
  );
};
