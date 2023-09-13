import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function PushScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  useEffect(() => {
    // Bildirim izinleri alma
    Notifications.requestPermissionsAsync().then((status) => {
      if (status.granted) {
        console.log('Bildirim izinleri alındı.');
      } else {
        console.log('Bildirim izinleri reddedildi.');
      }
    });
  }, []);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const toggleNotifications = () => {
    if (notificationEnabled) {
      // Bildirimleri durdur
      Notifications.cancelAllScheduledNotificationsAsync();
    } else {
      // Bildirimleri başlat
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'Su İçmen Gerekiyor',
          body: 'Bir bardak su içme zamanı geldi!',
        },
        trigger: {
          repeats: true, // Her dakika tekrarla
          seconds: 3600, // Her dakika gönder
        },
      });
    }
    setNotificationEnabled(!notificationEnabled);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analiz Sonuçları</Text>
      <Button title="Sonuçları Görüntüle" onPress={handleOpenModal} style={styles.button} />

      <Button
        title={notificationEnabled ? 'Su İçme Bildirimlerini Durdur' : 'Su İçme Bildirimlerini Aktifleştir'}
        onPress={toggleNotifications}
        style={styles.button}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Analiz Sonuçları</Text>
            <Text style={styles.fixedText}>
              Elmas Koyuncu Diyor ki: Günlük minimum 3 litre su içmeniz gerekiyor. Tek seferde 250 ml yani 1 su bardağı olacak şekilde su içmeniz için push ayarlamak isterseniz aşağıdaki butona basın.
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.button, styles.closeButton]}
                onPress={handleCloseModal}
              >
                <Text style={styles.buttonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 10, // Eski -20 yerine 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  fixedText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'gray',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
