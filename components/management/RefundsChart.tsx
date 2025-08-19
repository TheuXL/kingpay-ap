import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReembolsosIcon from '../../images/gestão/reebolsos.svg';
import { Colors } from '../../constants/Colors';
import { ManagementData } from '../../services/api';

interface RefundsChartProps {
  managementData: ManagementData | null;
  formatCurrency: (value: number) => string;
  formatPercentage: (value: number) => string;
}

export default function RefundsChart({ managementData, formatCurrency, formatPercentage }: RefundsChartProps) {
  const refunds = managementData?.refunds || 0;
  const chargebacks = managementData?.chargebacks || 0;
  const totalRefunds = refunds + chargebacks;
  const totalSales = managementData?.totalSales || 1; // Evitar divisão por zero
  const refundPercentage = totalSales > 0 ? (totalRefunds / totalSales) * 100 : 0;

  const data = [
    { label: 'Estornos', value: formatCurrency(refunds), color: Colors.blue['02'] },
    { label: 'Chargeback', value: formatCurrency(chargebacks), color: Colors.violet['01'] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reembolsos</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <ReembolsosIcon width={200} height={200} />
        <View style={styles.centerContent}>
          <Text style={styles.centerValue}>{formatPercentage(refundPercentage)}</Text>
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
    fontWeight: 'bold',
    color: Colors.black['02'],
  },
});