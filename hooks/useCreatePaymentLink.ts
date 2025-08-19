import { useState } from 'react';
import { api, CreatePaymentLinkData, PaymentLink } from '../services/api';

export const useCreatePaymentLink = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPaymentLink = async (data: CreatePaymentLinkData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 === INICIANDO CRIAÇÃO DE LINK ===');
      const result = await api.createPaymentLink(data);

      if (result.success && result.data) {
        console.log('✅ === LINK CRIADO COM SUCESSO ===');
        return { success: true, data: result.data };
      } else {
        console.log('❌ === ERRO AO CRIAR LINK ===');
        setError(result.error || 'Erro ao criar link de pagamento');
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createPaymentLink,
    isLoading,
    error,
  };
};
