import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TotalVendasIcon from '../../images/gestão/total de vendas.svg';

export default function TotalSalesChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Total de vendas</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <TotalVendasIcon width={280} height={230} />
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
    color: '#1E293B',
  },
  expandButton: {
    fontSize: 18,
    color: '#64748B',
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});