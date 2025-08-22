import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { Transaction, TransactionsFilter } from '../services/api';

export type PeriodFilter = '30 dias' | '15 dias' | 'Ontem' | 'Hoje';

export function useTransactions(initialFilter: TransactionsFilter = {}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState(0);
  const [filter, setFilter] = useState<TransactionsFilter>(initialFilter);
  const [currentPeriod, setCurrentPeriod] = useState<PeriodFilter>('30 dias');

  const calculateDateRange = (period: PeriodFilter): { startDate: string; endDate: string } => {
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case '30 dias':
        startDate.setDate(startDate.getDate() - 30);
        break;
      case '15 dias':
        startDate.setDate(startDate.getDate() - 15);
        break;
      case 'Ontem':
        startDate.setDate(startDate.getDate() - 1);
        endDate.setDate(endDate.getDate() - 1);
        break;
      case 'Hoje':
        // startDate e endDate já são hoje
        break;
    }

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    };
  };

  const fetchTransactions = useCallback(async (reset: boolean = false) => {
    try {
      setIsLoading(true);
      setError(null);

      const currentOffset = reset ? 0 : offset;
      const { startDate, endDate } = calculateDateRange(currentPeriod);
      const currentFilter = {
        ...filter,
        limit: 20,
        offset: currentOffset,
        // Usar período calculado
        startDate: startDate,
        endDate: endDate,
        status: filter.status || 'waiting_payment,paid,chargedback,refunded,refused,canceled,expired',
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

  const updatePeriod = useCallback((period: PeriodFilter) => {
    console.log('📅 === ATUALIZANDO PERÍODO DO HISTÓRICO ===');
    console.log('Período selecionado:', period);
    setCurrentPeriod(period);
    setOffset(0);
    setHasMore(true);
  }, []);

  useEffect(() => {
    fetchTransactions(true);
  }, [filter, currentPeriod]);

  return {
    transactions,
    isLoading,
    error,
    hasMore,
    refreshTransactions,
    loadMore,
    updateFilter,
    updatePeriod,
    currentPeriod,
    filter,
  };
}
