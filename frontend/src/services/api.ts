import axios from 'axios';
import { NotificationCategory, NotificationResponse } from '../types/notifications';

const API_BASE_URL = '/api';

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Get CSRF token from cookie
function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

// Get CSRF token endpoint
export const getCSRFToken = async () => {
  try {
    await axios.get(`${API_BASE_URL}/auth/check/`);
    return getCookie('csrftoken');
  } catch (error) {
    console.error('Failed to get CSRF token:', error);
    return null;
  }
};

// Authentication API calls
export const login = async (username: string, password: string) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/auth/login/`, 
    { username, password },
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const register = async (username: string, password: string, email?: string) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/auth/register/`, 
    { username, password, email },
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const logout = async () => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/auth/logout/`,
    {},
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const checkAuth = async () => {
  const response = await axios.get(`${API_BASE_URL}/auth/check/`);
  return response.data;
};

// Notification API calls
export const getCategories = async (): Promise<NotificationCategory[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories/`);
  return response.data;
};

export const getNotifications = async (categoryName: string): Promise<NotificationResponse> => {
  const response = await axios.get(`${API_BASE_URL}/notifications/${encodeURIComponent(categoryName)}/`);
  return response.data;
};

export const getNotificationSummary = async () => {
  const response = await axios.get(`${API_BASE_URL}/notifications/summary/`);
  return response.data;
};

export const markNotificationAsRead = async (notificationId: number) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/notifications/${notificationId}/mark-read/`,
    {},
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/notifications/mark-all-read/`,
    {},
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

// Profile/User API calls
export const getUserCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}/profile/categories/`);
  return response.data;
};

export const createCategory = async (name: string) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/profile/categories/create/`,
    { name },
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const deleteCategory = async (categoryId: number) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.delete(`${API_BASE_URL}/profile/categories/${categoryId}/delete/`,
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const createNotification = async (categoryId: number, data: Record<string, any>) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.post(`${API_BASE_URL}/profile/notifications/create/`,
    { category_id: categoryId, data },
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};

export const deleteNotification = async (notificationId: number) => {
  const csrfToken = getCookie('csrftoken');
  const response = await axios.delete(`${API_BASE_URL}/profile/notifications/${notificationId}/delete/`,
    { headers: csrfToken ? { 'X-CSRFToken': csrfToken } : {} }
  );
  return response.data;
};



