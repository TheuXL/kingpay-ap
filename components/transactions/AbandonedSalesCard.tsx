import { Feather } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import VendasAbandonadasIcon from '../../images/transações/Icon vendas abandonadas.svg';
import { Colors } from '@/constants/Colors';

export default function AbandonedSalesCard() {
  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <View style={styles.infoSection}>
          <Text style={styles.title}>42 vendas abandonadas</Text>
          <Text style={styles.value}>R$ 1.579,18</Text>
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
        <Text style={styles.itemValue}>R$ 400,00</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Cartão</Text>
        <Text style={styles.itemValue}>R$ 350,00</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Boleto</Text>
        <Text style={styles.itemValue}>R$ 50,17</Text>
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