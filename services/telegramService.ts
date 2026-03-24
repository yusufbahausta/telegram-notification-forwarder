import axios from 'axios';
import { NotificationData } from './notificationService';

const TELEGRAM_BOT_TOKEN = process.env.EXPO_PUBLIC_TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.EXPO_PUBLIC_TELEGRAM_CHAT_ID || '';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

export const sendToTelegram = async (notification: NotificationData): Promise<boolean> => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('❌ Telegram bot token veya chat ID yapılandırılmamış!');
      return false;
    }

    const date = new Date(notification.time);
    const timeString = date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const message = `
🔔 <b>Yeni Bildirim</b>

📱 <b>Uygulama:</b> ${notification.app}
📌 <b>Başlık:</b> ${notification.title}
💬 <b>Mesaj:</b> ${notification.text}
🕐 <b>Zaman:</b> ${timeString}
    `.trim();

    const response = await axios.post(TELEGRAM_API_URL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: 'HTML',
    });

    return true;
  } catch (error) {
    console.error('Telegram send error:', error);
    return false;
  }
};

export const sendTestMessage = async (): Promise<boolean> => {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return false;
    }

    const testMessage = `
🧪 <b>Test Mesajı</b>

✅ Telegram bağlantısı çalışıyor!
⏰ ${new Date().toLocaleString('tr-TR')}
    `.trim();

    await axios.post(TELEGRAM_API_URL, {
      chat_id: TELEGRAM_CHAT_ID,
      text: testMessage,
      parse_mode: 'HTML',
    });

    return true;
  } catch (error) {
    return false;
  }
};
