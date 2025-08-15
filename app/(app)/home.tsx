import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import BalanceCard from '../../components/home/BalanceCard';
import ExploreCard from '../../components/home/ExploreCard';
import HomeHeader from '../../components/home/HomeHeader';
import KingPayJourneyCard from '../../components/home/KingPayJourneyCard';
import QuickActions from '../../components/home/QuickActions';
import SalesMetricsCard from '../../components/home/SalesMetricsCard';
import SalesSummaryCard from '../../components/home/SalesSummaryCard';
import FloatingMenu from '../../components/ui/FloatingMenu';
import CalendarioIcon from '../../images/home/icon calendario.svg';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView>
        <HomeHeader balanceVisible={balanceVisible} setBalanceVisible={setBalanceVisible} />
        <BalanceCard balanceVisible={balanceVisible} />
        <QuickActions />
        <KingPayJourneyCard balanceVisible={balanceVisible} />
      <View style={styles.salesSummaryHeader}>
        <Text style={styles.salesSummaryTitle}>Resumo de vendas</Text>
        <View style={styles.dateSelector}>
          <Text>30 dias</Text>
          <CalendarioIcon width={24} height={24} style={{ marginLeft: 8 }} />
        </View>
      </View>
      <SalesSummaryCard balanceVisible={balanceVisible} />
      <SalesMetricsCard balanceVisible={balanceVisible} />
      <ExploreCard />
      </ScrollView>
      <FloatingMenu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  salesSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  salesSummaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
  },
});
