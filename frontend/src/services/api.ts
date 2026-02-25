import axios from 'axios';
import { NotificationCategory, NotificationResponse } from '../types/notifications';

const API_BASE_URL = '/api';

export const getCategories = async (): Promise<NotificationCategory[]> => {
  const response = await axios.get(`${API_BASE_URL}/categories/`);
  return response.data;
};

export const getNotifications = async (categoryName: string): Promise<NotificationResponse> => {
  const response = await axios.get(`${API_BASE_URL}/notifications/${encodeURIComponent(categoryName)}/`);
  return response.data;
};
