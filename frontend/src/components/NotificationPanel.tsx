import { useNavigate } from 'react-router-dom';
import { NotificationCategory } from '../types/notifications';
import '../styles/NotificationPanel.css';

interface NotificationPanelProps {
  categories: NotificationCategory[];
  loading: boolean;
}

export const NotificationPanel = ({ categories, loading }: NotificationPanelProps) => {
  const navigate = useNavigate();

  if (loading) {
    return <div className="panel-loading">Loading...</div>;
  }

  return (
    <div className="notification-panel">
      <h2>Notification Panel</h2>
      <table className="panel-table">
        <thead>
          <tr>
            <th>Software Name</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              onClick={() => navigate(`/notifications/${encodeURIComponent(category.name)}`)}
              className="panel-row"
            >
              <td className="category-name">{category.name}</td>
              <td className="pending-count">{category.pending}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
