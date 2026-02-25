import { Notification } from '../types/notifications';
import '../styles/NotificationTable.css';

interface NotificationTableProps {
  categoryName: string;
  columns: string[];
  notifications: Notification[];
  loading: boolean;
}

export const NotificationTable = ({ categoryName, columns, notifications, loading }: NotificationTableProps) => {
  if (loading) {
    return <div className="table-loading">Loading notifications...</div>;
  }

  if (notifications.length === 0) {
    return <div className="no-data">No notifications found</div>;
  }

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
                    {notification.data[column] !== undefined && notification.data[column] !== null
                      ? String(notification.data[column])
                      : '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
