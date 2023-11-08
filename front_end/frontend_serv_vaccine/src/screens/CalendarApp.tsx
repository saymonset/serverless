import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, Modal, View } from 'react-native';
import { CalendarList } from 'react-native-calendars';

function CalendarApp() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const markedDates = {
    '2023-11-06': { marked: true, dotColor: 'blue' },
    '2023-11-07': { marked: true, dotColor: 'green' },
    '2023-11-08': { marked: true, dotColor: 'red' },
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <CalendarList
        current={'2023-11-06'}
        pastScrollRange={24}
        futureScrollRange={24}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={markedDates}
        // markedDates={{
        //   [selectedDate]: { selected: true, selectedColor: 'blue' },
        // }}
        onDayPress={handleDayPress}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Fecha seleccionada: {selectedDate}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 5,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default CalendarApp;
