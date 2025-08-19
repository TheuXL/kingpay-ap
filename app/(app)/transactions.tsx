import { ThemedText } from '@/components/ThemedText';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { TransactionList } from '@/components/wallet/TransactionList';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, ActivityIndicator, RefreshControl, Text } from 'react-native';
import TransactionMetrics from '../../components/transactions/TransactionMetrics';
import FilterIcon from '../../images/transações/Filter Container.svg';
import BaraDePesquisa from '../../images/link de pagamento/bara de pesquisa.svg';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useTransactionMetrics } from '../../hooks/useTransactionMetrics';

export default function TransactionsScreen() {
  const router = useRouter();
  const transactions: any[] = []; // Array vazio - sem dados mockados
  const { transactionMetrics, isLoading, error, refreshData } = useTransactionMetrics();

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
      <ScreenHeader title="Transações" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <TransactionMetrics transactionMetrics={transactionMetrics} formatCurrency={formatCurrency} />
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
                placeholder="" //voltar para o placeholder original
                placeholderTextColor="#A0A0A0"
              />
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <FilterIcon width={58} height={58} />
            </TouchableOpacity>
          </View>

          <TransactionList 
            transactions={transactions} 
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    marginTop: 30,
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
});
