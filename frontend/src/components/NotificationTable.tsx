import { useState } from 'react';
import { Notification } from '../types/notifications';
import '../styles/NotificationTable.css';

interface NotificationTableProps {
  categoryName: string;
  columns: string[];
  notifications: Notification[];
  loading: boolean;
}

type SortOrder = 'asc' | 'desc';

export const NotificationTable = ({ categoryName, columns, notifications, loading }: NotificationTableProps) => {
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Handle column sorting
  const handleSort = (column: string) => {
    // Don't sort the Details column
    if (column === 'Details') return;

    if (sortField === column) {
      // Toggle order if clicking the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(column);
      setSortOrder('asc');
    }
  };

  // Sort notifications
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (!sortField) return 0;

    let compareValue = 0;
    
    // Get values from notification data
    const aValue = a.data[sortField];
    const bValue = b.data[sortField];

    // Handle null/undefined values
    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    // Check if values are numbers
    const aNum = Number(aValue);
    const bNum = Number(bValue);
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      // Numeric comparison
      compareValue = aNum - bNum;
    } else {
      // String comparison
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      
      // Check if strings are dates
      const aDate = new Date(aStr);
      const bDate = new Date(bStr);
      
      if (!isNaN(aDate.getTime()) && !isNaN(bDate.getTime())) {
        // Date comparison
        compareValue = aDate.getTime() - bDate.getTime();
      } else {
        // Regular string comparison
        compareValue = aStr.localeCompare(bStr);
      }
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

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
                <th 
                  key={column}
                  onClick={() => handleSort(column)}
                  className={column !== 'Details' ? 'sortable' : ''}
                >
                  {column}
                  {sortField === column && column !== 'Details' && (
                    <span className="sort-indicator">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedNotifications.map((notification) => (
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
