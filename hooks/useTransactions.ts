import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Transaction, TransactionsFilter } from '../services/api';

export function useTransactions(initialFilter: TransactionsFilter = {}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState<TransactionsFilter>(initialFilter);

  const fetchTransactions = useCallback(async (reset: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentOffset = reset ? 0 : offset;
      const currentFilter = {
        ...filter,
        limit: 20,
        offset: currentOffset,
        // Adicionar parâmetros padrão baseados na documentação
        status: filter.status || 'waiting_payment,paid,chargedback,refunded,refused,canceled,expired',
        startDate: filter.startDate || '2023-12-31',
        endDate: filter.endDate || '2026-12-31',
        paymentMethod: filter.paymentMethod || 'BOLETO,PIX,CARD',
      };

      console.log('🔄 === BUSCANDO TRANSAÇÕES ===');
      console.log('📊 Filtro atual:', currentFilter);

      const response = await api.getTransactions(currentFilter);

      if (response.success && response.data) {
        const newTransactions = response.data;
        
        if (reset) {
          setTransactions(newTransactions);
          setOffset(20);
        } else {
          setTransactions(prev => [...prev, ...newTransactions]);
          setOffset(prev => prev + 20);
        }

        setHasMore(newTransactions.length === 20);
        
        console.log('✅ === TRANSAÇÕES CARREGADAS ===');
        console.log('📊 Total de transações:', newTransactions.length);
        console.log('🔄 Tem mais dados:', newTransactions.length === 20);
      } else {
        setError(response.error || 'Erro ao buscar transações');
        console.log('❌ === ERRO AO BUSCAR TRANSAÇÕES ===');
        console.log('Erro:', response.error);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro de conexão');
      console.log('💥 === ERRO DE CONEXÃO ===');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  }, [filter, offset]);

  const refreshTransactions = useCallback(() => {
    setOffset(0);
    fetchTransactions(true);
  }, [fetchTransactions]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchTransactions(false);
    }
  }, [isLoading, hasMore, fetchTransactions]);

  const updateFilter = useCallback((newFilter: Partial<TransactionsFilter>) => {
    setFilter(prev => ({ ...prev, ...newFilter }));
    setOffset(0);
    setHasMore(true);
  }, []);

  useEffect(() => {
    fetchTransactions(true);
  }, [filter]);

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    refreshTransactions,
    loadMore,
    updateFilter,
    filter,
  };
}
