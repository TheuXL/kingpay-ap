import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function MonthSelector({ selectedMonth, onSelectMonth }: { selectedMonth: string; onSelectMonth: (month: string) => void }) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectMonth = (month: string) => {
    onSelectMonth(month);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
        <Text>{selectedMonth}</Text>
        <Ionicons name="chevron-down" size={20} color="black" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Selecione o mês</Text>
            {months.map((month) => (
              <TouchableOpacity
                key={month}
                style={styles.monthItem}
                onPress={() => handleSelectMonth(month)}
              >
                <Ionicons name="calendar-outline" size={24} color="#64748B" />
                <Text style={styles.monthText}>{month}</Text>
                <View style={[styles.radio, selectedMonth === month && styles.radioSelected]} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
  },
  monthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  monthText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
    marginLeft: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#64748B',
  },
  radioSelected: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
});