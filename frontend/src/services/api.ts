import axios from 'axios';
import { NotificationCategory, NotificationResponse } from '../types/notifications';

const API_BASE_URL = '/api';

// Configure axios to send cookies with requests
axios.defaults.withCredentials = true;

// Authentication API calls
export const login = async (username: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/login/`, { username, password });
  return response.data;
};

export const register = async (username: string, password: string, email?: string) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register/`, { username, password, email });
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(`${API_BASE_URL}/auth/logout/`);
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

