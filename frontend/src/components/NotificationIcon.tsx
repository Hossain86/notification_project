import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotificationSummary, markNotificationAsRead, markAllNotificationsAsRead } from '../services/api';
import '../styles/NotificationIcon.css';

interface NotificationSummary {
  total_count: number;
  recent_notifications: Array<{
    id: number;
    category_name: string;
    title: string;
    details: string;
    created_at: string;
  }>;
}

export const NotificationIcon = () => {
  const [summary, setSummary] = useState<NotificationSummary | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const fetchSummary = async () => {
    try {
      const data = await getNotificationSummary();
      setSummary(data);
    } catch (error) {
      console.error('Error fetching notification summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
    
    // Poll every 30 seconds for new notifications
    const interval = setInterval(fetchSummary, 30000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const handleNotificationClick = (categoryName: string) => {
    setShowDropdown(false);
    navigate(`/notifications/${encodeURIComponent(categoryName)}`);
  };

  const handleMarkAsRead = async (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    try {
      await markNotificationAsRead(notificationId);
      await fetchSummary();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await fetchSummary();
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  return (
    <div className="notification-icon-container" ref={dropdownRef}>
      <button
        className="notification-icon-btn"
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="Notifications"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        {summary && summary.total_count > 0 && (
          <span className="notification-badge">{summary.total_count}</span>
        )}
      </button>

      {showDropdown && (
        <div className="notification-dropdown">
          <div className="notification-dropdown-header">
            <h3>Notifications</h3>
            <div className="header-actions-row">
              {summary && summary.total_count > 0 && (
                <>
                  <span className="notification-count-badge">{summary.total_count} new</span>
                  <button 
                    className="mark-all-read-btn"
                    onClick={handleMarkAllAsRead}
                    title="Mark all as read"
                  >
                    Mark all as read
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="notification-dropdown-content">
            {summary && summary.recent_notifications.length > 0 ? (
              summary.recent_notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className="notification-item"
                  onClick={() => handleNotificationClick(notification.category_name)}
                >
                  <div className="notification-item-content">
                    <div className="notification-item-header">
                      <span className="notification-category">{notification.category_name}</span>
                      <span className="notification-time">{formatTime(notification.created_at)}</span>
                    </div>
                    <div className="notification-text">
                      <strong>{notification.title}</strong>
                      {notification.details && (
                        <span className="notification-details"> - {notification.details}</span>
                      )}
                    </div>
                  </div>
                  <button
                    className="mark-read-btn"
                    onClick={(e) => handleMarkAsRead(notification.id, e)}
                    title="Mark as read"
                    aria-label="Mark as read"
                  >
                    →
                  </button>
                </div>
              ))
            ) : (
              <div className="notification-empty">
                <p>No new notifications</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
