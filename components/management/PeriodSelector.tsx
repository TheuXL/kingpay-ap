import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface PeriodSelectorProps {
  visible: boolean;
  onClose: () => void;
  selectedPeriod: string;
  onSelectPeriod: (period: string) => void;
}

const periods = [
  { label: '30 dias', value: '30 dias' },
  { label: '15 dias', value: '15 dias' },
  { label: 'Ontem', value: 'Ontem' },
  { label: 'Hoje', value: 'Hoje' },
];

export default function PeriodSelector({ visible, onClose, selectedPeriod, onSelectPeriod }: PeriodSelectorProps) {
  const handleSelectPeriod = (period: string) => {
    onSelectPeriod(period);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#1E293B" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>Selecione o período</Text>
          
          <View style={styles.optionsContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.value}
                style={styles.option}
                onPress={() => handleSelectPeriod(period.value)}
              >
                <View style={styles.optionContent}>
                  <Ionicons name="calendar-outline" size={20} color="#64748B" />
                  <Text style={styles.optionText}>{period.label}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedPeriod === period.value && styles.radioButtonSelected
                ]}>
                  {selectedPeriod === period.value && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    minHeight: 400,
  },
  header: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    color: '#1E293B',
    fontWeight: '400',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: '#2563EB',
  },
  radioButtonInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
});