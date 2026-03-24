import RNAndroidNotificationListener from 'react-native-android-notification-listener';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendToTelegram } from './telegramService';

const NOTIFICATIONS_KEY = '@notification_history';

export interface NotificationData {
  id: string;
  app: string;
  title: string;
  text: string;
  time: number;
  sentToTelegram: boolean;
}

export const checkPermissionStatus = async (): Promise<string> => {
  try {
    const status = await RNAndroidNotificationListener.getPermissionStatus();
    return status;
  } catch (error) {
    return 'unknown';
  }
};

export const requestPermission = async (): Promise<void> => {
  try {
    await RNAndroidNotificationListener.requestPermission();
  } catch (error) {
    console.error('Permission request error:', error);
  }
};

export const handleNotification = async (notification: any): Promise<void> => {
  try {
    const appName = notification.app || '';
    
    if (!appName.toLowerCase().includes('trend signals')) {
      return;
    }

    const notificationData: NotificationData = {
      id: `${Date.now()}-${Math.random()}`,
      app: appName,
      title: notification.title || 'Bildirim',
      text: notification.text || '',
      time: notification.time || Date.now(),
      sentToTelegram: false,
    };

    const success = await sendToTelegram(notificationData);
    notificationData.sentToTelegram = success;

    const historyJson = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    const history: NotificationData[] = historyJson ? JSON.parse(historyJson) : [];
    history.unshift(notificationData);
    const trimmedHistory = history.slice(0, 50);
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(trimmedHistory));
  } catch (error) {
    console.error('Handle notification error:', error);
  }
};

export const getNotificationHistory = async (): Promise<NotificationData[]> => {
  try {
    const historyJson = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
    return historyJson ? JSON.parse(historyJson) : [];
  } catch (error) {
    return [];
  }
};

export const clearNotificationHistory = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify([]));
  } catch (error) {
    console.error('Clear history error:', error);
  }
};
