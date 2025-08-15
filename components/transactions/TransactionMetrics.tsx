import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AbandonedSalesCard from './AbandonedSalesCard';
import ApprovedSalesCard from './ApprovedSalesCard';
import CommissionCard from './CommissionCard';
import RefundsCard from './RefundsCard';

export default function TransactionMetrics() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 dias');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Métricas de transações</Text>
        <TouchableOpacity style={styles.periodSelector}>
          <Text>{selectedPeriod}</Text>
          <Ionicons name="chevron-down" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
        <ApprovedSalesCard />
        <AbandonedSalesCard />
        <CommissionCard />
        <RefundsCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
});