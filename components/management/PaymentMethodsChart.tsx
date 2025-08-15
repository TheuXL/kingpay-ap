import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormaPagamentoIcon from '../../images/gestão/forma de pagamento.svg';

export default function PaymentMethodsChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forma de pagamento</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <FormaPagamentoIcon width={200} height={200} />
        <View style={styles.centerContent}>
          <Text style={styles.centerValue}>R$ 1.5M</Text>
          <Text style={styles.centerLabel}>Em vendas</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  expandButton: {
    fontSize: 18,
    color: '#64748B',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  centerLabel: {
    fontSize: 16,
    color: '#64748B',
  },
});