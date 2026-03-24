import { AppRegistry } from 'react-native';
import RNAndroidNotificationListener, {
  RNAndroidNotificationListenerHeadlessJsName,
} from 'react-native-android-notification-listener';
import { handleNotification } from './notificationService';

const headlessNotificationListener = async ({ notification }: any) => {
  if (notification) {
    try {
      await handleNotification(notification);
    } catch (error) {
      console.error('Headless notification handler error:', error);
    }
  }
};

export const setupNotificationListener = () => {
  try {
    AppRegistry.registerHeadlessTask(
      RNAndroidNotificationListenerHeadlessJsName,
      () => headlessNotificationListener
    );
  } catch (error) {
    console.error('Failed to register notification listener:', error);
  }
};
