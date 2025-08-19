import { useState, useEffect } from 'react';
import { api, PaymentLink } from '../services/api';

export const usePaymentLinkDetails = (linkId: string) => {
  const [linkDetails, setLinkDetails] = useState<PaymentLink | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchLinkDetails = async () => {
    if (!linkId) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('🎯 === INICIANDO BUSCA DE DETALHES ===');
      const result = await api.getPaymentLinkDetails(linkId);

      if (result.success && result.data) {
        console.log('✅ === DETALHES OBTIDOS COM SUCESSO ===');
        setLinkDetails(result.data);
      } else {
        console.log('❌ === ERRO AO BUSCAR DETALHES ===');
        setError(result.error || 'Erro ao buscar detalhes do link');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLink = async () => {
    if (!linkId) return;

    setIsUpdating(true);
    setError(null);

    try {
      console.log('🚫 === CANCELANDO LINK ===');
      const result = await api.updatePaymentLink(linkId, { ativo: false });

      if (result.success && result.data) {
        console.log('✅ === LINK CANCELADO COM SUCESSO ===');
        setLinkDetails(result.data);
        return { success: true, data: result.data };
      } else {
        console.log('❌ === ERRO AO CANCELAR LINK ===');
        setError(result.error || 'Erro ao cancelar link');
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO AO CANCELAR ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    fetchLinkDetails();
  }, [linkId]);

  return {
    linkDetails,
    isLoading,
    isUpdating,
    error,
    refreshData: fetchLinkDetails,
    cancelLink,
  };
};
