import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormaPagamentoIcon from '../../images/gestão/forma de pagamento.svg';
import { Colors } from '../../constants/Colors';

const data = [
  { label: 'Pix', value: 'R$ 17.274,68', color: Colors.blue['02'] },
  { label: 'Cartão', value: 'R$ 4.935,62', color: Colors.violet['01'] },
  { label: 'Boleto', value: 'R$ 2.467,81', color: Colors.green['01'] },
];

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
          <Text style={styles.centerValue}>R$ 24.678,12</Text>
        </View>
      </View>
      
      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
            <Text style={styles.legendValue}>{item.value}</Text>
          </View>
        ))}
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
    color: Colors.black['02'],
  },
  expandButton: {
    fontSize: 18,
    color: Colors.gray['01'],
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
    color: Colors.black['02'],
  },
  centerLabel: {
    fontSize: 16,
    color: Colors.gray['01'],
  },
  legend: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    fontSize: 16,
    color: Colors.gray['01'],
  },
  legendValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black['02'],
  },
});