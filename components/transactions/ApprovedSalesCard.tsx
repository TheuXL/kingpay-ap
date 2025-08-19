import { StyleSheet, Text, View } from 'react-native';
import VendasAprovadasIcon from '../../images/transações/icon vendas aprovadas.svg';
import { Colors } from '@/constants/Colors';
import { TransactionMetricsData } from '../../services/api';

interface ApprovedSalesCardProps {
  transactionMetrics: TransactionMetricsData | null;
  formatCurrency: (value: number) => string;
}

export default function ApprovedSalesCard({ transactionMetrics, formatCurrency }: ApprovedSalesCardProps) {
  const totalApprovedSales = transactionMetrics?.totalApprovedSales || 0;
  const totalApprovedAmount = transactionMetrics?.totalApprovedAmount || 0;
  const approvedPixAmount = transactionMetrics?.approvedPixSales || 0;
  const approvedCardAmount = transactionMetrics?.approvedCardSales || 0;
  const approvedBoletoAmount = transactionMetrics?.approvedBoletoSales || 0;

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>{totalApprovedSales} vendas aprovadas</Text>
          <Text style={styles.value}>{formatCurrency(totalApprovedAmount)}</Text>
          <View style={styles.percentageContainer}>
            <Text style={styles.percentage}>+2,8%</Text>
          </View>
        </View>
        <View style={styles.iconSection}>
          <VendasAprovadasIcon width={60} height={60} />
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.item}>
        <Text style={styles.label}>Pix</Text>
        <Text style={styles.itemValue}>{formatCurrency(approvedPixAmount)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Cartão</Text>
        <Text style={styles.itemValue}>{formatCurrency(approvedCardAmount)}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Boleto</Text>
        <Text style={styles.itemValue}>{formatCurrency(approvedBoletoAmount)}</Text>
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
    color: 'green',
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