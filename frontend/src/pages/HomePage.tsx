import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationPanel } from '../components/NotificationPanel';
import { NotificationIcon } from '../components/NotificationIcon';
import { NavigationMenu } from '../components/NavigationMenu';
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
    if (categoryName === 'Global Approval Notification') {
      navigate('/global-approval');
    } else if (categoryName === 'Soft. Req. Notification') {
      navigate('/software-req-system');
    } else if (categoryName === 'Workshop Notification') {
      navigate('/workshop-system');
    } else if (categoryName === 'Paint Notification') {
      navigate('/paint-requisition');
    } else if (categoryName === 'EHS Notification') {
      navigate('/esm-automation');
    }
    // Other categories could have their own routes in the future
  };

  // Custom static category list with unique colors
  const customCategories = [
    { name: 'Global Approval Notification', color: '#3498db' },
    { name: 'Soft. Req. Notification', color: '#e74c3c' },
    { name: 'EHS Notification', color: '#2ecc71' },
    { name: 'Workshop Notification', color: '#f39c12' },
    { name: 'Heavy Vehicle Notification', color: '#9b59b6' },
    { name: 'Utility & Plumbing Notification', color: '#1abc9c' },
    { name: 'Electrical Notification', color: '#e67e22' },
    { name: 'HVAC Notification', color: '#34495e' },
    { name: 'Paint Notification', color: '#16a085' },
    { name: 'Comt & PCB Notification', color: '#d35400' },
    { name: 'Wastage Notification', color: '#c0392b' },
    { name: 'PTW Notification', color: '#27ae60' },
    { name: 'Carpenter Notification', color: '#2980b9' },
    { name: 'Gift Approval Notification', color: '#8e44ad' },
    { name: 'Gift Provide', color: '#f1c40f' },
    { name: 'Policy Approval Notification', color: '#e84393' },
    { name: 'ESM Automation Notification', color: '#00b894' },
    { name: 'Machine Making Notification', color: '#0984e3' },
    { name: 'Other GatePass Notification', color: '#6c5ce7' },
    { name: 'Service Center Notification', color: '#fd79a8' },
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
          <NotificationIcon />
          <span className="user-info">Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>
      {error && <div className="error-message">{error}</div>}
      <div className="content-split">
        <NavigationMenu />
        <div className="panel-section">
          <NotificationPanel categories={categories} loading={loading} />
        </div>
        <div className="category-buttons-section">
          <h2 className="section-title">Categories</h2>
          <div className="category-buttons-grid">
            {customCategories.map((category, index) => {
              const isClickable = ['Global Approval Notification', 'Soft. Req. Notification', 'Workshop Notification', 'Paint Notification', 'EHS Notification'].includes(category.name);
              return (
                <button
                  key={index}
                  className={`category-button ${!isClickable ? 'non-clickable-btn' : ''}`}
                  style={{ backgroundColor: category.color }}
                  disabled={!isClickable}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span className="category-button-name">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
