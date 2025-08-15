import { ThemedText } from '@/components/ThemedText';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { TransactionList } from '@/components/wallet/TransactionList';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import TransactionMetrics from '../../components/transactions/TransactionMetrics';
import FilterIcon from '../../images/transações/Filter Container.svg';
import SearchBarIcon from '../../images/transações/Transações buscas.svg';

export default function TransactionsScreen() {
  const transactions = [
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: 'Hoje',
      type: 'card_approved' as const,
    },
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: 'Ontem',
      type: 'pix' as const,
    },
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: '13 de jul',
      type: 'card_failed' as const,
    },
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: '12 de jul',
      type: 'pix' as const,
    },
  ];

  return (
    <View style={styles.container}>
      <ScreenHeader title="Histórico" />
      <ScrollView style={styles.scrollContainer}>
        <TransactionMetrics />
        <View style={styles.content}>

          <View style={styles.transactionsHeader}>
            <ThemedText style={styles.transactionsTitle}>Histórico</ThemedText>
          <TouchableOpacity style={styles.viewAllContainer}>
            <ThemedText style={styles.viewAll}>Ver tudo</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <SearchBarIcon width="100%" height={58} />
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

        <TransactionList transactions={transactions} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
});
