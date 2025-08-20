import { useState, useEffect } from 'react';
import { api } from '../services/api';

export interface WithdrawData {
  availableBalance: number;
  anticipationBalance: number;
  totalBalance: number;
}

export interface WithdrawDataHook {
  withdrawData: WithdrawData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useWithdrawData = (): WithdrawDataHook => {
  const [withdrawData, setWithdrawData] = useState<WithdrawData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWithdrawData = async () => {
    try {
      console.log('💰 === BUSCANDO DADOS PARA SAQUE ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getWalletData();
      
      if (response.success && response.data) {
        console.log('✅ Dados para saque carregados com sucesso');
        console.log('💰 Saldo PIX:', response.data.saldoPix);
        console.log('💰 Saldo Cartão:', response.data.saldoCartao);
        console.log('💰 Valor a Receber:', response.data.valorReceber);
        console.log('💰 Reserva Financeira:', response.data.reservaFinanceira);
        
        // Calcular saldos para saque
        const availableBalance = (response.data.saldoPix || 0) + (response.data.saldoCartao || 0);
        const anticipationBalance = response.data.valorReceber || 0;
        const totalBalance = availableBalance + anticipationBalance;
        
        const withdrawData: WithdrawData = {
          availableBalance,
          anticipationBalance,
          totalBalance,
        };
        
        setWithdrawData(withdrawData);
      } else {
        console.log('❌ Erro ao carregar dados para saque:', response.error);
        setError(response.error || 'Erro ao carregar dados para saque');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar dados para saque:', err);
      setError('Erro inesperado ao carregar dados para saque');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO DADOS PARA SAQUE ===');
    fetchWithdrawData();
  };

  useEffect(() => {
    fetchWithdrawData();
  }, []);

  return {
    withdrawData,
    isLoading,
    error,
    refreshData,
  };
};
