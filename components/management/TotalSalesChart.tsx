import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TotalVendasIcon from '../../images/gestão/total de vendas.svg';
import { Colors } from '../../constants/Colors';

export default function TotalSalesChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Total de vendas</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>

      <Text style={styles.totalValue}>R$ 24.678,12</Text>
      
      <View style={styles.chartContainer}>
        <TotalVendasIcon width={280} height={180} />
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <Text style={styles.legendText}>Número de vendas</Text>
          <Text style={styles.legendValue}>17.274</Text>
        </View>
        <View style={styles.legendItem}>
          <Text style={styles.legendText}>Ticket Médio</Text>
          <Text style={styles.legendValue}>R$ 67,62</Text>
        </View>
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
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black['02'],
    marginBottom: 20,
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