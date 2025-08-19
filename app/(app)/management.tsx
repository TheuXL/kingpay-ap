import { Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import ApprovalRateChart from '../../components/management/ApprovalRateChart';
import Card from '../../components/management/Card';
import PaymentMethodsChart from '../../components/management/PaymentMethodsChart';
import RefundsChart from '../../components/management/RefundsChart';
import TotalSalesChart from '../../components/management/TotalSalesChart';
import MovimentacaoIcon from '../../images/gestão/movimentação do mês.svg';
import { Colors } from '../../constants/Colors';
import BackIcon from '../../images/icon_back.svg';
import { useManagementData } from '../../hooks/useManagementData';
import PeriodFilterModal from '../../components/home/PeriodFilterModal';

const { width } = Dimensions.get('window');
const cardWidth = width - 40; // 20 padding on each side

export default function ManagementScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 dias');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { managementData, isLoading, error, refreshData, updatePeriod, currentPeriod } = useManagementData();

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // API retorna valores em centavos
  };

  const formatPercentage = (value: number): string => {
    return `${value.toFixed(2)}%`;
  };

  const charts = [
    { 
      title: 'Formas de pagamento', 
      component: <PaymentMethodsChart managementData={managementData} formatCurrency={formatCurrency} /> 
    },
    { 
      title: 'Total de vendas', 
      component: <TotalSalesChart managementData={managementData} formatCurrency={formatCurrency} /> 
    },
    { 
      title: 'Taxa de aprovação', 
      component: <ApprovalRateChart managementData={managementData} formatPercentage={formatPercentage} /> 
    },
    { 
      title: 'Reembolsos', 
      component: <RefundsChart managementData={managementData} formatCurrency={formatCurrency} formatPercentage={formatPercentage} /> 
    },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setActiveIndex(index);
  };

  const handlePeriodPress = () => {
    console.log('Period selector pressed!');
    setFilterModalVisible(true);
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
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestão</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <View style={styles.contentContainer}>
          <View style={styles.subHeader}>
            <Text style={styles.subHeaderTitle}>Visão geral de vendas</Text>
            <TouchableOpacity
              style={styles.periodSelector}
              onPress={handlePeriodPress}
            >
              <Text style={styles.periodText}>{currentPeriod}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            // onScroll={handleScroll}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={cardWidth + 8}
            snapToAlignment="center"
            contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
            style={styles.carousel}
          >
            {charts.map((chart, index) => (
              <View key={index} style={styles.chartSlide}>
                <Card>
                  {chart.component}
                </Card>
              </View>
            ))}
          </ScrollView>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionContent}>
                <Text style={styles.actionButtonText}>Links ativos</Text>
                <Text style={styles.actionNumber}>{managementData?.activeLinks || 0}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionContent}>
                <Text style={styles.actionButtonText}>Vendas</Text>
                <Text style={styles.actionNumber}>{managementData?.linkSales || 0}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.movements}>
            <Text style={styles.movementsTitle}>Movimentações</Text>
            <TouchableOpacity style={styles.movementItem}>
              <MovimentacaoIcon width={52} height={52} />
              <Text style={styles.movementText}>Movimentações do mês</Text>
              <View style={{ width: 52 }} />
            </TouchableOpacity>
          </View>
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
    backgroundColor: Colors.white['04'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['04'],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray['03'],
    fontFamily: 'Inter',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['04'],
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.red['01'],
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  errorSubtext: {
    fontSize: 14,
    color: Colors.gray['03'],
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  header: {
    backgroundColor: Colors.white['04'],
    // borderBottomWidth: 1,
    // borderBottomColor: Colors.gray['04'],
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Inter',
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    // paddingHorizontal: 20,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  subHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue['04'],
    fontFamily: 'Inter',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  periodText: {
    fontSize: 14,
    color: Colors.blue['04'],
    fontFamily: 'Inter',
  },
  carousel: {
    flexDirection: 'row',
  },
  chartSlide: {
    width: cardWidth,
    marginBottom: 30,
    // paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E2E8F0',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#64748B',
  },
  actions: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    gap: 8,
    // paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  actionButton: {
    backgroundColor: Colors.blue['01'],
    borderRadius: 12,
    padding: 20,
    width: '48%',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  actionButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Inter',
  },
  actionNumber: {
    color: Colors.white['01'],
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  movements: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 120,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.blue['04'],
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  movementItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  movementText: {
    fontSize: 16,
    color: Colors.blue['04'],
    fontWeight: '600',
    fontFamily: 'Inter',
  },
});