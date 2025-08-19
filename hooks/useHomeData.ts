import { useState, useEffect } from 'react';
import { api, DashboardData } from '../services/api';

export type PeriodFilter = '30 dias' | '15 dias' | 'Ontem' | 'Hoje';

export interface HomeData {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  updatePeriod: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

export const useHomeData = (): HomeData => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
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

  const fetchDashboardData = async (period: PeriodFilter = currentPeriod) => {
    try {
      console.log('🏠 === CARREGANDO DADOS DA HOME ===');
      setIsLoading(true);
      setError(null);

      const { startDate: startDateStr, endDate: endDateStr } = calculateDateRange(period);

      console.log('📅 Período calculado:', `${startDateStr} até ${endDateStr} (${period})`);

      const response = await api.getDashboardData(startDateStr, endDateStr);
      
      if (response.success && response.data) {
        console.log('✅ Dados da home carregados com sucesso');
        setDashboardData(response.data);
      } else {
        console.log('❌ Erro ao carregar dados da home:', response.error);
        setError(response.error || 'Erro ao carregar dados');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar dados da home:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO DADOS DA HOME ===');
    fetchDashboardData();
  };

  const updatePeriod = (period: PeriodFilter) => {
    console.log('📅 === ATUALIZANDO PERÍODO ===', period);
    setCurrentPeriod(period);
    fetchDashboardData(period);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    isLoading,
    error,
    refreshData,
    updatePeriod,
    currentPeriod,
  };
};
