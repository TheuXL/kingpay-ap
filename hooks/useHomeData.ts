import { useState, useEffect } from 'react';
import { api, DashboardData } from '../services/api';

export interface HomeData {
  dashboardData: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useHomeData = (): HomeData => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      console.log('🏠 === CARREGANDO DADOS DA HOME ===');
      setIsLoading(true);
      setError(null);

      // Calcular período dos últimos 30 dias
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30);

      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = endDate.toISOString().split('T')[0];

      console.log('📅 Período calculado:', `${startDateStr} até ${endDateStr}`);

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

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return {
    dashboardData,
    isLoading,
    error,
    refreshData,
  };
};
