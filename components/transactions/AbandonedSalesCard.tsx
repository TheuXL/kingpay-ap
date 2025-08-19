import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import VendasAbandonadasIcon from '../../images/transações/Icon vendas abandonadas.svg';
import { Colors } from '@/constants/Colors';
import { TransactionMetricsData } from '../../services/api';

interface AbandonedSalesCardProps {
  transactionMetrics: TransactionMetricsData | null;
  formatCurrency: (value: number) => string;
}

export default function AbandonedSalesCard({ transactionMetrics, formatCurrency }: AbandonedSalesCardProps) {
  const totalAbandonedSales = transactionMetrics?.totalAbandonedSales || 0;
  const totalAbandonedAmount = transactionMetrics?.totalAbandonedAmount || 0;
  const abandonedPixAmount = transactionMetrics?.abandonedPixSales ? (transactionMetrics.abandonedPixSales * 100) : 0; // Estimativa
  const abandonedCardAmount = transactionMetrics?.abandonedCardSales ? (transactionMetrics.abandonedCardSales * 100) : 0; // Estimativa
  const abandonedBoletoAmount = transactionMetrics?.abandonedBoletoSales ? (transactionMetrics.abandonedBoletoSales * 100) : 0; // Estimativa

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{totalAbandonedSales} vendas abandonadas</Text>
          <Text style={styles.value}>{formatCurrency(totalAbandonedAmount)}</Text>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentage}>+1,2%</Text>
          </View>
        </View>
        <View style={styles.iconSection}>
          <VendasAbandonadasIcon width={60} height={60} />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.label}>Pix</Text>
        <Text style={styles.itemValue}>{formatCurrency(abandonedPixAmount)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Cartão</Text>
        <Text style={styles.itemValue}>{formatCurrency(abandonedCardAmount)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Boleto</Text>
        <Text style={styles.itemValue}>{formatCurrency(abandonedBoletoAmount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.gray['04'],
    borderRadius: 12,
    padding: 20,
    width: 300,
    marginRight: 16,
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoSection: {
    justifyContent: 'center',
  },
  iconSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#64748B',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginVertical: 4,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentage: {
    fontSize: 14,
    color: 'red',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#64748B',
  },
  itemValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
});