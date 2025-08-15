import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ApprovalRateChart from '../../components/management/ApprovalRateChart';
import Card from '../../components/management/Card';
import PaymentMethodsChart from '../../components/management/PaymentMethodsChart';
import RefundsChart from '../../components/management/RefundsChart';
import TotalSalesChart from '../../components/management/TotalSalesChart';
import MovimentacaoIcon from '../../images/gestão/movimentação do mês.svg';

const { width } = Dimensions.get('window');

export default function ManagementScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('30 dias');
  const [activeIndex, setActiveIndex] = useState(0);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const charts = [
    { title: 'Formas de pagamento', component: <PaymentMethodsChart /> },
    { title: 'Total de vendas', component: <TotalSalesChart /> },
    { title: 'Taxa de aprovação', component: <ApprovalRateChart /> },
    { title: 'Reembolsos', component: <RefundsChart /> },
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const index = Math.round(contentOffset.x / width);
    setActiveIndex(index);
  };

  const handlePeriodPress = () => {
    console.log('Period selector pressed!');
    setShowPeriodSelector(true);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestão</Text>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Visão geral de vendas</Text>
          <TouchableOpacity
            style={styles.periodSelector}
            onPress={handlePeriodPress}
          >
            <Text>{selectedPeriod}</Text>
            <Ionicons name="chevron-down" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
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
              <Text style={styles.actionNumber}>12</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionContent}>
              <Text style={styles.actionButtonText}>Vendas</Text>
              <Text style={styles.actionNumber}>789</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.movements}>
          <Text style={styles.movementsTitle}>Movimentações</Text>
          <TouchableOpacity style={styles.movementItem}>
            <MovimentacaoIcon width={52} height={52} />
            <Text style={styles.movementText}>Movimentações do mês</Text>
            <Ionicons name="arrow-forward" size={24} color="#64748B" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#F8FAFC',
    paddingTop: 50,
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
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
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
    fontWeight: '500',
    color: '#475569',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  carousel: {
    flexDirection: 'row',
  },
  chartSlide: {
    width: width,
    marginBottom: 30,
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  actionNumber: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  movements: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 120,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 10,
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
    color: '#1E293B',
    fontWeight: '600',
  },
});