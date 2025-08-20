import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native';
import BalanceCards from '../../components/wallet/BalanceCards';
import TransactionFilter from '../../components/wallet/TransactionFilter';

import { ExtratoList } from '../../components/wallet/ExtratoList';
import { AntecipacoesList } from '../../components/wallet/AntecipacoesList';
import { TransferenciasList } from '../../components/wallet/TransferenciasList';
import BackIcon from '@/images/icon_back.svg';
import { useWalletData } from '../../hooks/useWalletData';
import { useExtrato } from '../../hooks/useExtrato';
import { useAntecipacoes } from '../../hooks/useAntecipacoes';
import { useTransferencias } from '../../hooks/useTransferencias';
import { Colors } from '../../constants/Colors';

export default function WalletScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Extrato');
  const { walletData, isLoading: walletLoading, error: walletError, refreshData: refreshWallet } = useWalletData();
  
  // Hooks para cada tipo de movimentação
  const { 
    extrato, 
    isLoading: extratoLoading, 
    error: extratoError, 
    refreshData: refreshExtrato, 
    loadMore: loadMoreExtrato, 
    hasMore: hasMoreExtrato 
  } = useExtrato(10);
  
  const { 
    antecipacoes, 
    isLoading: antecipacoesLoading, 
    error: antecipacoesError, 
    refreshData: refreshAntecipacoes, 
    loadMore: loadMoreAntecipacoes, 
    hasMore: hasMoreAntecipacoes 
  } = useAntecipacoes(10);
  
  const { 
    transferencias, 
    isLoading: transferenciasLoading, 
    error: transferenciasError, 
    refreshData: refreshTransferencias, 
    loadMore: loadMoreTransferencias, 
    hasMore: hasMoreTransferencias 
  } = useTransferencias(10);

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
    switch (section) {
      case 'Extrato':
        return extrato.length > 0;
      case 'Antecipações':
        return antecipacoes.length > 0;
      case 'Transferências':
        return transferencias.length > 0;
      default:
        return false;
    }
  };

  // Função para obter loading state da seção ativa
  const getActiveLoadingState = (): boolean => {
    switch (activeFilter) {
      case 'Extrato':
        return extratoLoading;
      case 'Antecipações':
        return antecipacoesLoading;
      case 'Transferências':
        return transferenciasLoading;
      default:
        return false;
    }
  };

  // Função para obter error state da seção ativa
  const getActiveErrorState = (): string | null => {
    switch (activeFilter) {
      case 'Extrato':
        return extratoError;
      case 'Antecipações':
        return antecipacoesError;
      case 'Transferências':
        return transferenciasError;
      default:
        return null;
    }
  };



  // Componente para estado vazio dinâmico
  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateText}>Nenhuma movimentação encontrada</Text>
    </View>
  );

  const renderContent = () => {
    const isLoading = getActiveLoadingState();
    const error = getActiveErrorState();

    if (isLoading && !hasDataForSection(activeFilter)) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.blue['01']} />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      );
    }

    if (error && !hasDataForSection(activeFilter)) {
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
          <ExtratoList 
            extrato={extrato}
            isLoading={extratoLoading}
            error={extratoError}
            onLoadMore={loadMoreExtrato}
            hasMore={hasMoreExtrato}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        );
      case 'Antecipações':
        return (
          <AntecipacoesList 
            antecipacoes={antecipacoes}
            isLoading={antecipacoesLoading}
            error={antecipacoesError}
            onLoadMore={loadMoreAntecipacoes}
            hasMore={hasMoreAntecipacoes}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        );
      case 'Transferências':
        return (
          <TransferenciasList 
            transferencias={transferencias}
            isLoading={transferenciasLoading}
            error={transferenciasError}
            onLoadMore={loadMoreTransferencias}
            hasMore={hasMoreTransferencias}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        );
      default:
        return <EmptyState />;
    }
  };

  if (walletLoading && !walletData) {
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
          <RefreshControl refreshing={walletLoading} onRefresh={refreshWallet} />
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
  emptyStateText: {
    color: 'gray',
    fontSize: 16,
  },
});
