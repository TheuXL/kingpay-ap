import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MonthSelector from '../../components/movements/MonthSelector';

export default function MovementsScreen() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('Janeiro');

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Movimentações</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderTitle}>Movimentações</Text>
          <MonthSelector
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
          />
        </View>
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Entradas</Text>
              <Text style={styles.summaryValue}>+ R$ 21.124,56</Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="arrow-up" size={24} color="#DC2626" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Saídas</Text>
              <Text style={styles.summaryValue}>R$ 16.124,06</Text>
            </View>
          </View>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIconContainer}>
              <Ionicons name="wallet-outline" size={24} color="#64748B" />
            </View>
            <View>
              <Text style={styles.summaryLabel}>Saldo total</Text>
              <Text style={styles.summaryDescription}>Entradas menos saídas no período selecionado</Text>
              <Text style={styles.summaryValue}>R$ 5.124,50</Text>
            </View>
          </View>
        </View>
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={24} color="#64748B" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar transações"
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={24} color="#1E293B" />
          </TouchableOpacity>
        </View>
        <View style={styles.transactionList}>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Entrada</Text>
              <Text style={styles.transactionDescription}>Reserva Financeira</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>Hoje</Text>
              <Text style={styles.transactionAmount}>+ R$ 3.243,56</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-up" size={24} color="#DC2626" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Saída</Text>
              <Text style={styles.transactionDescription}>Transação Gateway</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>Ontem</Text>
              <Text style={styles.transactionAmount}>R$ 2.664,45</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Entrada</Text>
              <Text style={styles.transactionDescription}>Reserva Financeira</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>11 de Jul</Text>
              <Text style={styles.transactionAmount}>+ R$ 1.164,37</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Entrada</Text>
              <Text style={styles.transactionDescription}>Reserva Financeira</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>11 de Jul</Text>
              <Text style={styles.transactionAmount}>+ R$ 5.063,06</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-up" size={24} color="#DC2626" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Saída</Text>
              <Text style={styles.transactionDescription}>Transação Gateway</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>9 de Jul</Text>
              <Text style={styles.transactionAmount}>R$ 560,27</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-up" size={24} color="#DC2626" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Saída</Text>
              <Text style={styles.transactionDescription}>Transação Gateway</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>7 de Jul</Text>
              <Text style={styles.transactionAmount}>R$ 3.667,85</Text>
            </View>
          </View>
          <View style={styles.transactionItem}>
            <View style={styles.transactionIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionType}>Entrada</Text>
              <Text style={styles.transactionDescription}>Reserva Financeira</Text>
            </View>
            <View style={styles.transactionAmountContainer}>
              <Text style={styles.transactionDate}>6 de Jul</Text>
              <Text style={styles.transactionAmount}>+ R$ 8.874,12</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 16,
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
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  summaryCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  summaryDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  searchFilterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    marginLeft: 8,
  },
  filterButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginLeft: 16,
  },
  transactionList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  transactionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  transactionDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
  },
  transactionDate: {
    fontSize: 14,
    color: '#64748B',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});