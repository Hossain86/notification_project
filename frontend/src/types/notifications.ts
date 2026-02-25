export interface NotificationCategory {
  id: number;
  name: string;
  pending: number;
}

export interface Notification {
  id: number;
  category_name: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface NotificationResponse {
  category: string;
  columns: string[];
  notifications: Notification[];
}
