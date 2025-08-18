import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaxaAprovacaoIcon from '../../images/gestão/taxa de aprovação.svg';
import { Colors } from '../../constants/Colors';

const data = [
  { label: 'Pix', percentage: '98%', color: Colors.blue['02'] },
  { label: 'Cartão', percentage: '96%', color: Colors.violet['01'] },
  { label: 'Boleto', percentage: '92%', color: Colors.green['01'] },
];

export default function ApprovalRateChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taxa de aprovação</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <TaxaAprovacaoIcon width={280} height={180} />
      </View>

      <View style={styles.legend}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: item.color }]} />
              <Text style={styles.legendText}>{item.label}</Text>
            </View>
            <Text style={styles.legendValue}>{item.percentage}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
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