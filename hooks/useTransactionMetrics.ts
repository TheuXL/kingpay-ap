import { useState, useEffect } from 'react';
import { api, TransactionMetricsData } from '../services/api';

export type PeriodFilter = '30 dias' | '15 dias' | 'Ontem' | 'Hoje';

export interface TransactionMetricsHook {
  transactionMetrics: TransactionMetricsData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  updatePeriod: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

export const useTransactionMetrics = (): TransactionMetricsHook => {
  const [transactionMetrics, setTransactionMetrics] = useState<TransactionMetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  const fetchTransactionMetrics = async (period: PeriodFilter = currentPeriod) => {
    try {
      console.log('📊 === CARREGANDO MÉTRICAS DE TRANSAÇÕES ===');
      setIsLoading(true);
      setError(null);

      const { startDate, endDate } = calculateDateRange(period);
      console.log('📅 Período calculado:', startDate, 'até', endDate, `(${period})`);
      
      const response = await api.getTransactionMetricsData(startDate, endDate);
      
      if (response.success && response.data) {
        console.log('✅ Métricas de transações carregadas com sucesso');
        setTransactionMetrics(response.data);
      } else {
        console.log('❌ Erro ao carregar métricas de transações:', response.error);
        setError(response.error || 'Erro ao carregar dados');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar métricas de transações:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO MÉTRICAS DE TRANSAÇÕES ===');
    fetchTransactionMetrics();
  };

  const updatePeriod = (period: PeriodFilter) => {
    console.log('📅 === ATUALIZANDO PERÍODO ===');
    console.log('Período selecionado:', period);
    setCurrentPeriod(period);
    fetchTransactionMetrics(period);
  };

  useEffect(() => {
    fetchTransactionMetrics();
  }, []);

  return {
    transactionMetrics,
    isLoading,
    error,
    refreshData,
    updatePeriod,
    currentPeriod,
  };
};
