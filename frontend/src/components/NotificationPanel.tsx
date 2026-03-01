import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationCategory } from '../types/notifications';
import '../styles/NotificationPanel.css';

interface NotificationPanelProps {
  categories: NotificationCategory[];
  loading: boolean;
}

type SortField = 'id' | 'name' | 'pending';
type SortOrder = 'asc' | 'desc';

export const NotificationPanel = ({ categories, loading }: NotificationPanelProps) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Handle column sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle order if clicking the same field
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filter categories based on search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a, b) => {
    let compareValue = 0;
    
    switch (sortField) {
      case 'id':
        compareValue = a.id - b.id;
        break;
      case 'name':
        compareValue = a.name.localeCompare(b.name);
        break;
      case 'pending':
        compareValue = a.pending - b.pending;
        break;
    }
    
    return sortOrder === 'asc' ? compareValue : -compareValue;
  });

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
            <th onClick={() => handleSort('name')} className="sortable">
              Software Name
              {sortField === 'name' && (
                <span className="sort-indicator">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
            <th onClick={() => handleSort('pending')} className="sortable">
              Pending
              {sortField === 'pending' && (
                <span className="sort-indicator">{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedCategories.length > 0 ? (
            sortedCategories.map((category) => (
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
