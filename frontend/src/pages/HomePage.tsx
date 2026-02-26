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

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/notifications/${encodeURIComponent(categoryName)}`);
  };

  // Array of colors for the category buttons
  const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6',
    '#1abc9c', '#e67e22', '#34495e', '#16a085', '#d35400',
    '#c0392b', '#27ae60', '#2980b9', '#8e44ad', '#f1c40f',
    '#e84393', '#00b894', '#0984e3', '#6c5ce7', '#fd79a8',
    '#fdcb6e', '#00cec9', '#ff7675', '#74b9ff', '#a29bfe'
  ];

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
        <div className="header-left" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <img src="/walton.webp" alt="Walton Logo" className="header-logo" />
          <h1>Notification Management System</h1>
        </div>
        <div className="header-actions">
          <span className="user-info">Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="content-split">
        <div className="panel-section">
          <NotificationPanel categories={categories} loading={loading} />
        </div>
        <div className="category-buttons-section">
          <h2 className="section-title">Categories</h2>
          {loading ? (
            <div className="loading-text">Loading categories...</div>
          ) : (
            <div className="category-buttons-grid">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  className="category-button"
                  style={{ backgroundColor: colors[index % colors.length] }}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="category-button-name">{category.name}</span>
                  <span className="category-button-count">{category.pending}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
