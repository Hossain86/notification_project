import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserCategories, createCategory, deleteCategory, createNotification, getCategories } from '../services/api';
import { NotificationCategory } from '../types/notifications';
import '../styles/ProfilePage.css';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userCategories, setUserCategories] = useState<NotificationCategory[]>([]);
  const [allCategories, setAllCategories] = useState<NotificationCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Category form
  const [newCategoryName, setNewCategoryName] = useState('');
  const [creatingCategory, setCreatingCategory] = useState(false);

  // Notification form
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | ''>('');
  const [notificationFields, setNotificationFields] = useState<{ key: string; value: string }[]>([
    { key: '', value: '' }
  ]);
  const [creatingNotification, setCreatingNotification] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [userCats, allCats] = await Promise.all([
        getUserCategories(),
        getCategories()
      ]);
      setUserCategories(userCats);
      setAllCategories(allCats);
    } catch (err) {
      setError('Failed to load data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    setCreatingCategory(true);
    setError(null);
    setSuccess(null);

    try {
      await createCategory(newCategoryName);
      setSuccess('Category created successfully!');
      setNewCategoryName('');
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create category');
    } finally {
      setCreatingCategory(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (!confirm('Are you sure you want to delete this category? All associated notifications will also be deleted.')) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      setSuccess('Category deleted successfully!');
      await fetchData();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete category');
    }
  };

  const handleAddField = () => {
    setNotificationFields([...notificationFields, { key: '', value: '' }]);
  };

  const handleRemoveField = (index: number) => {
    setNotificationFields(notificationFields.filter((_, i) => i !== index));
  };

  const handleFieldChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...notificationFields];
    updated[index][field] = value;
    setNotificationFields(updated);
  };

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategoryId) {
      setError('Please select a category');
      return;
    }

    // Build data object from fields
    const data: Record<string, string> = {};
    notificationFields.forEach(field => {
      if (field.key.trim()) {
        data[field.key] = field.value;
      }
    });

    if (Object.keys(data).length === 0) {
      setError('Please add at least one field');
      return;
    }

    setCreatingNotification(true);
    setError(null);
    setSuccess(null);

    try {
      await createNotification(Number(selectedCategoryId), data);
      setSuccess('Notification created successfully!');
      setSelectedCategoryId('');
      setNotificationFields([{ key: '', value: '' }]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create notification');
    } finally {
      setCreatingNotification(false);
    }
  };

  return (
    <div className="profile-page">
      <header className="app-header">
        <div className="header-left">
          <img src="/walton.webp" alt="Walton Logo" className="header-logo" />
          <h1>User Profile</h1>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/')} className="home-button">Home</button>
          <span className="user-info">Welcome, {user?.username}</span>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </header>

      <div className="profile-content">
        {error && <div className="message error-message">{error}</div>}
        {success && <div className="message success-message">{success}</div>}

        {/* Create Category Section */}
        <section className="profile-section">
          <h2>Create New Notification Type</h2>
          <form onSubmit={handleCreateCategory} className="create-form">
            <div className="form-group">
              <label htmlFor="categoryName">Category Name</label>
              <input
                type="text"
                id="categoryName"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="e.g., Meeting Notifications"
                required
                disabled={creatingCategory}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={creatingCategory}>
              {creatingCategory ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </section>

        {/* User Categories List */}
        <section className="profile-section">
          <h2>Your Notification Types</h2>
          {loading ? (
            <p>Loading...</p>
          ) : userCategories.length === 0 ? (
            <p className="empty-message">You haven't created any notification types yet.</p>
          ) : (
            <div className="categories-list">
              {userCategories.map((category) => (
                <div key={category.id} className="category-item">
                  <span className="category-name">{category.name}</span>
                  <span className="category-pending">{category.pending} pending</span>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Create Notification Section */}
        <section className="profile-section">
          <h2>Add New Notification</h2>
          <form onSubmit={handleCreateNotification} className="create-form">
            <div className="form-group">
              <label htmlFor="category">Select Category</label>
              <select
                id="category"
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value ? Number(e.target.value) : '')}
                required
                disabled={creatingNotification}
              >
                <option value="">-- Select a category --</option>
                {allCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="notification-fields">
              <label>Notification Data Fields</label>
              {notificationFields.map((field, index) => (
                <div key={index} className="field-row">
                  <input
                    type="text"
                    placeholder="Field name (e.g., Title)"
                    value={field.key}
                    onChange={(e) => handleFieldChange(index, 'key', e.target.value)}
                    disabled={creatingNotification}
                  />
                  <input
                    type="text"
                    placeholder="Field value"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, 'value', e.target.value)}
                    disabled={creatingNotification}
                  />
                  {notificationFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(index)}
                      className="btn btn-remove"
                      disabled={creatingNotification}
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddField}
                className="btn btn-secondary"
                disabled={creatingNotification}
              >
                + Add Field
              </button>
            </div>

            <button type="submit" className="btn btn-primary" disabled={creatingNotification}>
              {creatingNotification ? 'Creating...' : 'Create Notification'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};
