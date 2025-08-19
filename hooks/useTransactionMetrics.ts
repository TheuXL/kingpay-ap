import { useState, useEffect } from 'react';
import { api, TransactionMetricsData } from '../services/api';

export interface TransactionMetricsHook {
  transactionMetrics: TransactionMetricsData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useTransactionMetrics = (): TransactionMetricsHook => {
  const [transactionMetrics, setTransactionMetrics] = useState<TransactionMetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactionMetrics = async () => {
    try {
      console.log('📊 === CARREGANDO MÉTRICAS DE TRANSAÇÕES ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getTransactionMetricsData();
      
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

  useEffect(() => {
    fetchTransactionMetrics();
  }, []);

  return {
    transactionMetrics,
    isLoading,
    error,
    refreshData,
  };
};
