import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCategory } from '../types/notifications';
import '../styles/NotificationPanel.css';

interface NotificationPanelProps {
  categories: NotificationCategory[];
  loading: boolean;
}

export const NotificationPanel = ({ categories, loading }: NotificationPanelProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get suggestions (limit to top 5)
  const suggestions = searchTerm.trim() ? filteredCategories.slice(0, 5) : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (categoryName: string) => {
    setSearchTerm('');
    setShowSuggestions(false);
    navigate(`/notifications/${encodeURIComponent(categoryName)}`);
  };

  const handleSearchFocus = () => {
    if (searchTerm.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay to allow click on suggestion
    setTimeout(() => setShowSuggestions(false), 300);
  };

  if (loading) {
    return <div className="panel-loading">Loading...</div>;
  }

  return (
    <div className="notification-panel">
      <h2>Notification Panel</h2>
      
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
          onBlur={handleSearchBlur}
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="search-suggestions">
            {suggestions.map((category) => (
              <div
                key={category.id}
                className="suggestion-item"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSuggestionClick(category.name);
                }}
              >
                <span className="suggestion-name">{category.name}</span>
                <span className="suggestion-count">{category.pending}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <table className="panel-table">
        <thead>
          <tr>
            <th>Software Name</th>
            <th>Pending</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <tr
                key={category.id}
                onClick={() => navigate(`/notifications/${encodeURIComponent(category.name)}`)}
                className="panel-row"
              >
                <td className="category-name">{category.name}</td>
                <td className="pending-count">{category.pending}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="no-results">
                No categories found matching "{searchTerm}"
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
