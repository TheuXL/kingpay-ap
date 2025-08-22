import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
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
import { useUserData } from '../../hooks/useUserData';
import { getFirstName } from '../../services/api';
import PeriodFilterModal from '../../components/home/PeriodFilterModal';
import SetaFiltroIcon from '../../images/home/seta filtro.svg';

export default function HomeScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const { dashboardData, walletData, isLoading, error, refreshData, updatePeriod, currentPeriod } = useHomeData();
  const { user } = useAuth();
  const { userData } = useUserData();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // API retorna valores em centavos
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  // Extrair primeiro nome do usuário
  const getUserName = (): string => {
    if (userData?.fullname) {
      return getFirstName(userData.fullname);
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'Usuário';
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
            balance={(walletData?.saldoPix || 0) + (walletData?.saldoCartao || 0)}
            formatCurrency={formatCurrency}
          />
          <QuickActions />
          <KingPayJourneyCard balanceVisible={balanceVisible} />
          <View style={styles.salesSummaryHeader}>
            <Text style={styles.salesSummaryTitle}>Resumo de vendas</Text>
            <TouchableOpacity 
              style={styles.dateSelector}
              onPress={() => setFilterModalVisible(true)}
            >
              <Text style={styles.dateSelectorText}>{currentPeriod}</Text>
              <SetaFiltroIcon width={16} height={16} />
            </TouchableOpacity>
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
      
      <PeriodFilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onSelectPeriod={updatePeriod}
        currentPeriod={currentPeriod}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:  Colors.white['02'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  Colors.white['02'],
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
    backgroundColor: Colors.white['02'],
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
    gap: 4,
  },
  dateSelectorText: {
    fontSize: 14,
    color: Colors.black['01'],
  },
});
