import { StyleSheet, Text, View, ScrollView } from 'react-native';
import ChargebackIcon from '../../images/home/chargeback.svg';
import VendasPixIcon from '../../images/home/Icon vendas pix.svg';
import VendasBoletosIcon from '../../images/home/icon vendas boletos.svg';
import CetaPositivaIcon from '../../images/home/seta metricas de vendas positivos.svg';
import CetaNegativaIcon from '../../images/home/seta metricas de vendas negativos.svg';

export default function SalesMetricsCard({ balanceVisible }: { balanceVisible: boolean }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métricas de vendas</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsContainer}>
        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <ChargebackIcon width={16} height={16} />
            <Text style={styles.cardTitle}>Chargeback</Text>
          </View>
          <Text style={styles.cardValue}>8.54%</Text>
          <View style={styles.percentageContainer}>
            <CetaPositivaIcon width={20} height={20} />
            <Text style={styles.cardPercentageGood}>+7,8%</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <VendasPixIcon width={16} height={16} />
            <Text style={styles.cardTitle}>Vendas PIX</Text>
          </View>
          <Text style={styles.cardValue}>75.2%</Text>
          <View style={styles.percentageContainer}>
            <CetaPositivaIcon width={20} height={20} />
            <Text style={styles.cardPercentageGood}>+15%</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTitleContainer}>
            <VendasBoletosIcon width={16} height={16} />
            <Text style={styles.cardTitle}>Vendas Boletos</Text>
          </View>
          <Text style={styles.cardValue}>16.26%</Text>
          <View style={styles.percentageContainer}>
            <CetaNegativaIcon width={20} height={20} />
            <Text style={styles.cardPercentageBad}>-23,8%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardsContainer: {
    flexDirection: 'row',
  },
  card: {
    backgroundColor: '#F8FAFC',
    padding: 20,
    borderRadius: 20,
    width: 200,
    marginRight: 16,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    color: '#64748B',
    marginLeft: 8,
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardPercentageGood: {
    fontSize: 14,
    color: 'green',
    marginLeft: 5,
  },
  cardPercentageBad: {
    fontSize: 14,
    color: 'red',
    marginLeft: 5,
  },
});
