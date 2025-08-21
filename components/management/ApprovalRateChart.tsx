import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TaxaAprovacaoIcon from '../../images/gestão/taxa de aprovação.svg';
import { Colors } from '../../constants/Colors';
import { ManagementData } from '../../services/api';

interface ApprovalRateChartProps {
  managementData: ManagementData | null;
  formatPercentage: (value: number) => string;
}

export default function ApprovalRateChart({ managementData, formatPercentage }: ApprovalRateChartProps) {
  const pixApprovalRate = managementData?.pixApprovalRate || 0;
  const cardApprovalRate = managementData?.cardApprovalRate || 0;
  const boletoApprovalRate = managementData?.boletoApprovalRate || 0;

  const data = [
    { label: 'Pix', percentage: formatPercentage(pixApprovalRate), color: Colors.blue['02'] },
    { label: 'Cartão', percentage: formatPercentage(cardApprovalRate), color: Colors.violet['01'] },
    { label: 'Boleto', percentage: formatPercentage(boletoApprovalRate), color: Colors.green['01'] },
  ];

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
    color: Colors.blue['04'],
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
    color: Colors.gray['01'], // Pix, Cartão, Boleto - mantém gray-01
  },
  legendValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue['04'], // Valores dos dados
  },
});