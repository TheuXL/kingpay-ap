import { useState, useEffect } from 'react';
import { api, ManagementData } from '../services/api';

export type PeriodFilter = '30 dias' | '15 dias' | 'Ontem' | 'Hoje';

export interface ManagementDataHook {
  managementData: ManagementData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  updatePeriod: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

export const useManagementData = (): ManagementDataHook => {
  const [managementData, setManagementData] = useState<ManagementData | null>(null);
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

  const fetchManagementData = async (period: PeriodFilter = currentPeriod) => {
    try {
      console.log('📊 === CARREGANDO DADOS DE GESTÃO ===');
      setIsLoading(true);
      setError(null);

      const { startDate, endDate } = calculateDateRange(period);
      console.log('📅 Período calculado:', startDate, 'até', endDate, `(${period})`);
      
      const response = await api.getManagementData(startDate, endDate);
      
      if (response.success && response.data) {
        console.log('✅ Dados de gestão carregados com sucesso');
        setManagementData(response.data);
      } else {
        console.log('❌ Erro ao carregar dados de gestão:', response.error);
        setError(response.error || 'Erro ao carregar dados');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar dados de gestão:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO DADOS DE GESTÃO ===');
    const { startDate, endDate } = calculateDateRange(currentPeriod);
    console.log('📅 Período atual:', startDate, 'até', endDate, `(${currentPeriod})`);
    fetchManagementData();
  };

  const updatePeriod = (period: PeriodFilter) => {
    console.log('📅 === ATUALIZANDO PERÍODO ===');
    console.log('Período selecionado:', period);
    setCurrentPeriod(period);
    fetchManagementData(period);
  };

  useEffect(() => {
    fetchManagementData();
  }, []);

  return {
    managementData,
    isLoading,
    error,
    refreshData,
    updatePeriod,
    currentPeriod,
  };
};
