import { useState, useEffect } from 'react';
import { api, WalletData } from '../services/api';

export interface WalletDataHook {
  walletData: WalletData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useWalletData = (): WalletDataHook => {
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWalletData = async () => {
    try {
      console.log('💳 === CARREGANDO DADOS DA CARTEIRA ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getWalletData();
      
      if (response.success && response.data) {
        console.log('✅ Dados da carteira carregados com sucesso');
        setWalletData(response.data);
      } else {
        console.log('❌ Erro ao carregar dados da carteira:', response.error);
        setError(response.error || 'Erro ao carregar dados');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar dados da carteira:', err);
      setError('Erro inesperado ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO DADOS DA CARTEIRA ===');
    fetchWalletData();
  };

  useEffect(() => {
    fetchWalletData();
  }, []);

  return {
    walletData,
    isLoading,
    error,
    refreshData,
  };
};
