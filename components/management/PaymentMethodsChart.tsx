import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FormaPagamentoIcon from '../../images/gestão/forma de pagamento.svg';
import { Colors } from '../../constants/Colors';
import { ManagementData } from '../../services/api';

interface PaymentMethodsChartProps {
  managementData: ManagementData | null;
  formatCurrency: (value: number) => string;
}

export default function PaymentMethodsChart({ managementData, formatCurrency }: PaymentMethodsChartProps) {
  const pixSales = managementData?.pixSales || 0;
  const cardSales = managementData?.cardSales || 0;
  const boletoSales = managementData?.boletoSales || 0;
  const totalSales = managementData?.totalSales || 0;

  const data = [
    { label: 'Pix', value: formatCurrency(pixSales), color: Colors.blue['02'] },
    { label: 'Cartão', value: formatCurrency(cardSales), color: Colors.violet['01'] },
    { label: 'Boleto', value: formatCurrency(boletoSales), color: Colors.green['01'] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Forma de pagamento</Text>
        <Text style={styles.expandButton}>{'>'}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <FormaPagamentoIcon width={200} height={200} />
        <View style={styles.centerContent}>
          <Text style={styles.centerValue}>{formatCurrency(totalSales)}</Text>
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