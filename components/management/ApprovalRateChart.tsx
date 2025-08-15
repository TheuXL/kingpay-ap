import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaxaAprovacaoIcon from '../../images/gestão/taxa de aprovação.svg';

export default function ApprovalRateChart() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Taxa de aprovação</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <TaxaAprovacaoIcon width={280} height={230} />
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