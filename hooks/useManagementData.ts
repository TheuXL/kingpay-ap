import { useState, useEffect } from 'react';
import { api, ManagementData } from '../services/api';

export interface ManagementDataHook {
  managementData: ManagementData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useManagementData = (): ManagementDataHook => {
  const [managementData, setManagementData] = useState<ManagementData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchManagementData = async () => {
    try {
      console.log('📊 === CARREGANDO DADOS DE GESTÃO ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getManagementData();
      
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
    fetchManagementData();
  };

  useEffect(() => {
    fetchManagementData();
  }, []);

  return {
    managementData,
    isLoading,
    error,
    refreshData,
  };
};
