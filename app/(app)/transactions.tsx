import { ThemedText } from '@/components/ThemedText';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator, RefreshControl, Text, FlatList } from 'react-native';
import { useState } from 'react';
import TransactionMetrics from '../../components/transactions/TransactionMetrics';
import FilterIcon from '../../images/transações/Filter Container.svg';
import BaraDePesquisa from '../../images/link de pagamento/bara de pesquisa.svg';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTransactionMetrics } from '../../hooks/useTransactionMetrics';
import { useTransactions } from '../../hooks/useTransactions';
import PeriodFilterModal from '../../components/home/PeriodFilterModal';
import TransactionIconPix from '../../components/ui/TransactionIconPix';
import TransactionIconCartaoAprovado from '../../components/ui/TransactionIconCartaoAprovado';
import TransactionIconCartaoFalhado from '../../components/ui/TransactionIconCartaoFalhado';

export default function TransactionsScreen() {
  const router = useRouter();
  const { transactionMetrics, isLoading: metricsLoading, error: metricsError, refreshData, updatePeriod, currentPeriod } = useTransactionMetrics();
  const { transactions, isLoading: transactionsLoading, error: transactionsError, hasMore, refreshTransactions, loadMore, updateFilter } = useTransactions();
  const [metricsFilterModalVisible, setMetricsFilterModalVisible] = useState(false);
  const [historyFilterModalVisible, setHistoryFilterModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // API retorna valores em centavos
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    }
  };

  if (metricsLoading || transactionsLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (metricsError || transactionsError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar dados</Text>
        <Text style={styles.errorSubtext}>{metricsError || transactionsError}</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <>
      <TransactionMetrics 
        transactionMetrics={transactionMetrics} 
        formatCurrency={formatCurrency}
        onFilterPress={() => setMetricsFilterModalVisible(true)}
      />
      <View style={styles.contentPadding}>
        <View style={styles.cardsRow}>
          <ThemedText style={styles.transactionsTitle}>Histórico</ThemedText>
          <TouchableOpacity style={styles.viewAllContainer}>
            <ThemedText style={styles.viewAll}>Ver tudo</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <BaraDePesquisa width="100%" height={58} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar transações"
              placeholderTextColor="#A0A0A0"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setHistoryFilterModalVisible(true)}
          >
            <FilterIcon width={58} height={58} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <ScreenHeader title="Transações" />
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
                renderItem={({ item }) => {
          console.log('📊 === RENDERIZANDO TRANSAÇÃO ===');
          console.log('🆔 ID:', item.id);
          console.log('💳 Método de pagamento:', item.paymentmethod);
          console.log('✅ Sucesso:', item.success);
          console.log('💰 Valor:', item.chargedamount);
          console.log('📧 Email:', item.client_email);
          console.log('📅 Data:', item.date);
          console.log('📝 Descrição:', item.description);
          console.log('📦 Items:', item.items);
          
          return (
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                {item.paymentmethod === 'PIX' ? (
                  <TransactionIconPix width={48} height={49} />
                ) : item.paymentmethod === 'CARD' && item.success ? (
                  <TransactionIconCartaoAprovado width={48} height={49} />
                ) : (
                  <TransactionIconCartaoFalhado width={48} height={49} />
                )}
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>
                  {item.items && item.items.length > 0 ? item.items[0].title : item.description || 'Transação'}
                </Text>
                <Text style={styles.transactionEmail}>
                  {item.client_email || 'Cliente'}
                </Text>
                <Text style={styles.transactionAmount}>
                  + {formatCurrency(item.chargedamount)}
                </Text>
              </View>
              <Text style={styles.transactionDate}>
                {formatDate(item.date)}
              </Text>
            </View>
          );
        }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        refreshControl={
          <RefreshControl refreshing={metricsLoading || transactionsLoading} onRefresh={refreshTransactions} />
        }
        ListFooterComponent={
          hasMore ? (
            <View style={styles.loadingMore}>
              <ActivityIndicator size="small" color={Colors.blue['01']} />
              <Text style={styles.loadingMoreText}>Carregando mais...</Text>
            </View>
          ) : null
        }
        contentContainerStyle={styles.flatListContent}
      />
      
      {/* Modal para filtro das métricas */}
      <PeriodFilterModal
        visible={metricsFilterModalVisible}
        onClose={() => setMetricsFilterModalVisible(false)}
        onSelectPeriod={updatePeriod}
        currentPeriod={currentPeriod}
      />
      
      {/* Modal para filtro do histórico */}
      <PeriodFilterModal
        visible={historyFilterModalVisible}
        onClose={() => setHistoryFilterModalVisible(false)}
        onSelectPeriod={(period) => {
          // Aqui você pode implementar a lógica para filtrar o histórico
          console.log('Filtrando histórico por período:', period);
          setHistoryFilterModalVisible(false);
        }}
        currentPeriod={currentPeriod}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['02'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['02'],
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
  scrollContainer: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  viewAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAll: {
    fontSize: 16,
    color: '#4A90E2',
    marginRight: 4,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchInputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  searchInput: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingLeft: 55,
    paddingRight: 20,
    fontSize: 16,
    color: '#000',
  },
  filterButton: {
    marginLeft: 16,
  },
  scrollContent: {
    // paddingHorizontal: 20, // Removido
  },
  contentPadding: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue['04'],
    marginBottom: 2,
  },
  transactionEmail: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 2,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.blue['04'],
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.blue['04'],
  },
  loadingMore: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingMoreText: {
    marginTop: 8,
    fontSize: 14,
    color: Colors.gray['01'],
  },
  flatListContent: {
    paddingBottom: 20,
  },
});
