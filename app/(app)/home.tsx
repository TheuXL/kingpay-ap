import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl } from 'react-native';
import BalanceCard from '../../components/home/BalanceCard';
import ExploreCard from '../../components/home/ExploreCard';
import HomeHeader from '../../components/home/HomeHeader';
import KingPayJourneyCard from '../../components/home/KingPayJourneyCard';
import QuickActions from '../../components/home/QuickActions';
import SalesMetricsCard from '../../components/home/SalesMetricsCard';
import SalesSummaryCard from '../../components/home/SalesSummaryCard';
import { Colors } from '../../constants/Colors';
import { useHomeData } from '../../hooks/useHomeData';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { dashboardData, isLoading, error, refreshData } = useHomeData();
  const { user } = useAuth();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // API retorna valores em centavos
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  // Extrair nome do usuário do email
  const getUserName = (): string => {
    if (!user?.email) return 'Usuário';
    const emailName = user.email.split('@')[0];
    // Capitalizar primeira letra
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <HomeHeader 
          balanceVisible={balanceVisible} 
          setBalanceVisible={setBalanceVisible}
          userName={getUserName()}
        />
        <View style={styles.contentContainer}>
          <BalanceCard 
            balanceVisible={balanceVisible} 
            balance={dashboardData?.sumValorLiquido || 0}
            formatCurrency={formatCurrency}
          />
          <QuickActions />
          <KingPayJourneyCard balanceVisible={balanceVisible} />
          <View style={styles.salesSummaryHeader}>
            <Text style={styles.salesSummaryTitle}>Resumo de vendas</Text>
            <View style={styles.dateSelector}>
              <Text>30 dias</Text>
            </View>
          </View>
          <SalesSummaryCard 
            balanceVisible={balanceVisible} 
            dashboardData={dashboardData}
            formatCurrency={formatCurrency}
          />
          <SalesMetricsCard 
            balanceVisible={balanceVisible} 
            dashboardData={dashboardData}
            formatPercentage={formatPercentage}
          />
          <ExploreCard />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray['03'],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red['01'],
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.gray['03'],
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  salesSummaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.gray['03'],
  },
});
