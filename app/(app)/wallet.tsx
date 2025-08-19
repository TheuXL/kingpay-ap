import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import BalanceCards from '../../components/wallet/BalanceCards';
import TransactionFilter from '../../components/wallet/TransactionFilter';
import { TransactionList } from '../../components/wallet/TransactionList';
import BackIcon from '@/images/icon_back.svg';
import React, { useState } from 'react';
import { useWalletData } from '../../hooks/useWalletData';
import { Colors } from '../../constants/Colors';

export default function WalletScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Extrato');
  const { walletData, isLoading, error, refreshData } = useWalletData();

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
      return date.toLocaleDateString('pt-BR');
    }
  };

  // Função para verificar se há dados para uma seção específica
  const hasDataForSection = (section: string): boolean => {
    if (!walletData) return false;
    
    switch (section) {
      case 'Extrato':
        return walletData.movimentacoes && walletData.movimentacoes.length > 0;
      case 'Antecipações':
        // Quando tivermos endpoint específico, verificar dados de antecipações
        return false;
      case 'Transferências':
        // Quando tivermos endpoint específico, verificar dados de transferências
        return false;
      default:
        return false;
    }
  };

  // Componente para estado vazio dinâmico
  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image source={require('../../assets/images/obj3d.png')} style={styles.emptyStateImage} />
      <Text style={styles.emptyStateText}>Ainda não há nada por aqui...</Text>
    </View>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue['01']} />
          <Text style={styles.loadingText}>Carregando...</Text>
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

    // Verificar se há dados para a seção ativa
    if (!hasDataForSection(activeFilter)) {
      return <EmptyState />;
    }

    // Se há dados, renderizar o conteúdo específico
    switch (activeFilter) {
      case 'Extrato':
        return (
          <TransactionList 
            transactions={walletData?.movimentacoes || []} 
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        );
      case 'Antecipações':
        // Quando tivermos dados de antecipações, renderizar aqui
        return <EmptyState />;
      case 'Transferências':
        // Quando tivermos dados de transferências, renderizar aqui
        return <EmptyState />;
      default:
        return <EmptyState />;
    }
  };

  if (isLoading && !walletData) {
    return (
      <View style={styles.fullLoadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando carteira...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carteira</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <BalanceCards 
          walletData={walletData}
          formatCurrency={formatCurrency}
        />
        <View style={styles.contentContainer}>
          <View style={styles.movementsHeader}>
            <Text style={styles.movementsTitle}>Movimentações</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Ver tudo</Text>
              <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          <TransactionFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          {renderContent()}
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
  fullLoadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },
  movementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    marginRight: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.gray['03'],
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
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
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyStateText: {
    color: 'gray',
    fontSize: 16,
  },
});
