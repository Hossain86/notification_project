import { useState } from 'react';
import { Notification } from '../types/notifications';
import '../styles/NotificationTable.css';

interface NotificationTableProps {
  categoryName: string;
  columns: string[];
  notifications: Notification[];
  loading: boolean;
}

export const NotificationTable = ({ categoryName, columns, notifications, loading }: NotificationTableProps) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  if (loading) {
    return <div className="table-loading">Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return <div className="no-data">No notifications found</div>;
  }

  const handleDetailsClick = (notification: Notification) => {
    setSelectedNotification(notification);
  };

  const closeModal = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="notification-table-container">
      <h2>{categoryName}</h2>
      <div className="table-wrapper">
        <table className="notification-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification.id} className={notification.is_read ? 'read' : 'unread'}>
                {columns.map((column) => (
                  <td key={column}>
                    {column === 'Details' ? (
                      <button 
                        className="details-expand-btn" 
                        onClick={() => handleDetailsClick(notification)}
                        title="View Details"
                      >
                        ▼
                      </button>
                    ) : (
                      notification.data[column] !== undefined && notification.data[column] !== null
                        ? String(notification.data[column])
                        : '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {selectedNotification && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>✕</button>
            <h3>Notification Details</h3>
            <div className="modal-details">
              {Object.entries(selectedNotification.data).map(([key, value]) => (
                <div key={key} className="detail-row">
                  <span className="detail-label">{key}:</span>
                  <span className="detail-value">{value !== null && value !== undefined ? String(value) : '-'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
