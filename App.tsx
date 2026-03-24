import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { sendTestMessage } from './services/telegramService';

export default function App() {
  const handleTest = async () => {
    const success = await sendTestMessage();
    Alert.alert(
      success ? '✅ Başarılı!' : '❌ Hata!', 
      success ? 'Telegram\'a test mesajı gönderildi!' : 'Gönderilemedi.'
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📱 Telegram Bildirim</Text>
      <Text style={styles.subtitle}>Yönlendirici</Text>
      <TouchableOpacity style={styles.button} onPress={handleTest}>
        <Text style={styles.buttonText}>📤 Telegram'ı Test Et</Text>
      </TouchableOpacity>
      <Text style={styles.info}>Butona basın, Telegram'da mesaj göreceksiniz!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#0f0f0f', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#fff'
  },
  subtitle: { 
    fontSize: 20, 
    color: '#999', 
    marginBottom: 40 
  },
  button: { 
    backgroundColor: '#0088cc', 
    padding: 20, 
    borderRadius: 15, 
    width: '80%',
    marginBottom: 20
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'center' 
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20
  }
});
