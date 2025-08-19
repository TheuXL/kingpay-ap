import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { PeriodFilter } from '@/hooks/useHomeData';
import CalendarioIcon from '@/images/calendario.svg';

interface PeriodFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectPeriod: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

const periods: PeriodFilter[] = ['30 dias', '15 dias', 'Ontem', 'Hoje'];

export default function PeriodFilterModal({
  visible,
  onClose,
  onSelectPeriod,
  currentPeriod,
}: PeriodFilterModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Handle */}
          <View style={styles.handle} />
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Selecione o período</Text>
          </View>

          {/* Period Options */}
          <View style={styles.optionsContainer}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period}
                style={styles.optionItem}
                onPress={() => {
                  onSelectPeriod(period);
                  onClose();
                }}
              >
                <View style={styles.optionContent}>
                  <CalendarioIcon width={20} height={20} />
                  <Text style={styles.optionText}>{period}</Text>
                </View>
                <View style={[
                  styles.radioButton,
                  currentPeriod === period && styles.radioButtonSelected
                ]}>
                  {currentPeriod === period && (
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
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black['01'],
  },
  optionsContainer: {
    width: '100%',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray['04'],
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: Colors.black['01'],
    marginLeft: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.gray['03'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioButtonSelected: {
    borderColor: Colors.blue['01'],
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.blue['01'],
  },
});
