import { StyleSheet, Text, View } from 'react-native';
import Grafico from '../../images/home/grafico.svg';

export default function SalesSummaryCard({ balanceVisible }: { balanceVisible: boolean }) {
  return (
    <View style={styles.container}>
      <Text style={styles.totalSales}>{balanceVisible ? 'R$ 138.241,15' : '*******'}</Text>
      <Text style={styles.salesPeriod}>Últimos 30 dias</Text>
      <View style={{ alignItems: 'center', marginVertical: 8 }}>
        <Grafico width={'100%'} height={220} />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#2A2AFF' }]} />
          <Text>Vendas</Text>
          <Text style={styles.legendValue}>{balanceVisible ? 'R$ 7.724,23' : '*******'}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FFA500' }]} />
          <Text>Pendente</Text>
          <Text style={styles.legendValue}>{balanceVisible ? 'R$ 2.822,91' : '*******'}</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF0000' }]} />
          <Text>Estorno</Text>
          <Text style={styles.legendValue}>{balanceVisible ? 'R$ 609,87' : '*******'}</Text>
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
    marginHorizontal: 20,
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
