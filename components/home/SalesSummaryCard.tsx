import { StyleSheet, Text, View } from 'react-native';
import Grafico from '../../images/home/grafico.svg';
import { DashboardData } from '../../services/api';

interface SalesSummaryCardProps {
  balanceVisible: boolean;
  dashboardData: DashboardData | null;
  formatCurrency: (value: number) => string;
}

export default function SalesSummaryCard({ balanceVisible, dashboardData, formatCurrency }: SalesSummaryCardProps) {
  const totalSales = dashboardData?.sumPaid || 0;
  const pendingSales = dashboardData?.sumPending || 0;
  const refundedSales = dashboardData?.sumRefunded || 0;

  return (
    <View style={styles.container}>
      <Text style={styles.totalSales}>
        {balanceVisible ? formatCurrency(totalSales) : '*******'}
      </Text>
      <Text style={styles.salesPeriod}>Últimos 30 dias</Text>
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <Grafico width={'100%'} height={220} />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2A2AFF' }]} />
          <Text>Vendas</Text>
          <Text style={styles.legendValue}>
            {balanceVisible ? formatCurrency(totalSales) : '*******'}
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFA500' }]} />
          <Text>Pendente</Text>
          <Text style={styles.legendValue}>
            {balanceVisible ? formatCurrency(pendingSales) : '*******'}
          </Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
          <Text>Estorno</Text>
          <Text style={styles.legendValue}>
            {balanceVisible ? formatCurrency(refundedSales) : '*******'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
  },
  totalSales: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 10,
  },
  salesPeriod: {
    fontSize: 14,
    color: '#666',
  },
  legendContainer: {
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendValue: {
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
});
