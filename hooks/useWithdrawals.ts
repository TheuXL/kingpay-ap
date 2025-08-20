import { useState } from 'react';
import { api, CreateWithdrawalData, Withdrawal } from '../services/api';

export interface WithdrawalsHook {
  isLoading: boolean;
  error: string | null;
  createWithdrawal: (data: CreateWithdrawalData) => Promise<boolean>;
}

export const useWithdrawals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createWithdrawal = async (data: CreateWithdrawalData): Promise<boolean> => {
    setError(null);
    setIsLoading(true);

    try {
      console.log('💰 === CRIANDO SAQUE ===');
      const result = await api.createWithdrawal(data);

      if (result.success && result.data) {
        console.log('✅ === SAQUE CRIADO ===');
        console.log('💰 Saque criado com ID:', result.data.id);
        console.log('✅ Saque criado com sucesso');
        return true;
      } else {
        console.log('❌ === ERRO AO CRIAR SAQUE ===');
        setError(result.error || 'Erro ao criar saque');
        return false;
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO AO CRIAR SAQUE ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createWithdrawal,
  };
};
