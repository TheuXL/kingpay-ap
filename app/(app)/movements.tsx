import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, TextInput } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import IconEntradaMovimentacoes from '@/components/ui/IconEntradaMovimentacoes';
import IconSaidaMovimentacoes from '@/components/ui/IconSaidaMovimentacoes';
import IconSaldoTotalMovimentacoes from '@/components/ui/IconSaldoTotalMovimentacoes';
import FilterIcon from '@/components/ui/FilterIcon';

export default function MovementsScreen() {
  const router = useRouter();
  const [selectedMonth, setSelectedMonth] = useState('Janeiro');
  const [searchText, setSearchText] = useState('');

  console.log('📊 === TELA MOVIMENTAÇÕES CARREGADA ===');
  console.log('📅 Mês selecionado:', selectedMonth);
  console.log('🔍 Texto de busca:', searchText);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const handleMonthSelect = () => {
    console.log('📅 === SELETOR DE MÊS PRESSIONADO ===');
    // TODO: Implementar seletor de mês
  };

  const handleSearch = (text: string) => {
    console.log('🔍 === BUSCA ATUALIZADA ===');
    console.log('Texto:', text);
    setSearchText(text);
  };

  const handleFilter = () => {
    console.log('🔧 === FILTRO PRESSIONADO ===');
    // TODO: Implementar filtros
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Movimentações</Text>
            <View style={styles.headerSpacer} />
          </View>
          {/* Título e Seletor de Mês */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Movimentações</Text>
            <TouchableOpacity style={styles.monthSelector} onPress={handleMonthSelect}>
              <Text style={styles.monthText}>{selectedMonth}</Text>
              <Ionicons name="chevron-down" size={16} color={Colors.gray['02']} />
            </TouchableOpacity>
          </View>

          {/* Card de Resumo */}
          <View style={styles.summaryCard}>
            {/* Entradas */}
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <IconEntradaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Entradas</Text>
                <Text style={styles.summaryValue}>+ {formatCurrency(21124.56)}</Text>
              </View>
            </View>

            {/* Saídas */}
            <View style={styles.summaryItem}>
              <View style={styles.summaryIconContainer}>
                <IconSaidaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Saídas</Text>
                <Text style={styles.summaryValue}>{formatCurrency(16124.06)}</Text>
              </View>
            </View>

            {/* Saldo Total */}
            <View style={[styles.summaryItem, { marginBottom: 0 }]}>
              <View style={styles.summaryIconContainer}>
                <IconSaldoTotalMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.summaryTextContainer}>
                <Text style={styles.summaryLabel}>Saldo total</Text>
                <Text style={styles.summarySubtext}>Entradas menos saídas no período selecionado</Text>
                <Text style={styles.summaryValue}>{formatCurrency(5000.50)}</Text>
              </View>
            </View>
          </View>

          {/* Barra de Busca e Filtro */}
          <View style={styles.searchSection}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar transações"
                value={searchText}
                onChangeText={handleSearch}
                placeholderTextColor={Colors.gray['01']}
              />
              <Ionicons 
                name="search" 
                size={18} 
                color={Colors.gray['01']} 
                style={styles.searchIcon} 
              />
            </View>
            <TouchableOpacity style={styles.filterButton} onPress={handleFilter}>
              <FilterIcon width={54} height={55} />
            </TouchableOpacity>
          </View>

          {/* Lista de Transações */}
          <View style={styles.transactionsList}>
            {/* Transação 1 - Entrada */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconEntradaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>Entrada</Text>
                <Text style={styles.transactionDescription}>Reserva Financeira</Text>
                <Text style={styles.transactionAmount}>+ {formatCurrency(3243.56)}</Text>
              </View>
              <Text style={styles.transactionDate}>Hoje</Text>
            </View>

            {/* Transação 2 - Saída */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSaidaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>Saída</Text>
                <Text style={styles.transactionDescription}>Transação Gateway</Text>
                <Text style={styles.transactionAmount}>{formatCurrency(2664.45)}</Text>
              </View>
              <Text style={styles.transactionDate}>Ontem</Text>
            </View>

            {/* Transação 3 - Entrada */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconEntradaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>Entrada</Text>
                <Text style={styles.transactionDescription}>Venda PIX</Text>
                <Text style={styles.transactionAmount}>+ {formatCurrency(1500.00)}</Text>
              </View>
              <Text style={styles.transactionDate}>15/01</Text>
            </View>

            {/* Transação 4 - Saída */}
            <View style={styles.transactionItem}>
              <View style={styles.transactionIcon}>
                <IconSaidaMovimentacoes width={48} height={49} />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionType}>Saída</Text>
                <Text style={styles.transactionDescription}>Saque</Text>
                <Text style={styles.transactionAmount}>{formatCurrency(800.00)}</Text>
              </View>
              <Text style={styles.transactionDate}>14/01</Text>
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
    backgroundColor: Colors.white['01'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: Colors.white['01'],
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue['04'],
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.blue['04'],
  },
  monthSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.gray['03'],
  },
  monthText: {
    fontSize: 14,
    color: Colors.blue['04'],
    fontWeight: '500',
  },
  summaryCard: {
    backgroundColor: Colors.white['01'],
    padding: 20,
    marginBottom: 24,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryIconContainer: {
    marginRight: 12,
  },

  summaryTextContainer: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 2,
  },
  summarySubtext: {
    fontSize: 12,
    color: Colors.blue['04'],
    marginBottom: 2,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue['04'],
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white['02'],
    borderRadius: 35,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.blue['04'],
    backgroundColor: 'transparent',
    paddingRight: 10,
  },
  searchIcon: {
    marginLeft: 8,
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionsList: {
    gap: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    padding: 16,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 12,
    color: Colors.gray['01'],
    marginBottom: 2,
  },
  transactionDescription: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.blue['04'],
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
});