import { useState, useEffect, useCallback } from 'react';
import { api, PaymentLink } from '../services/api';

export interface PaymentLinksHook {
  paymentLinks: PaymentLink[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  activeLinks: PaymentLink[];
  inactiveLinks: PaymentLink[];
}

export const usePaymentLinks = () => {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchPaymentLinks = useCallback(async () => {
    // Evitar múltiplas chamadas simultâneas
    if (isLoading || isRefreshing) {
      console.log('🔄 === PULANDO CHAMADA - JÁ EM ANDAMENTO ===');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔗 === CARREGANDO LINKS DE PAGAMENTO ===');
      const result = await api.getPaymentLinks();

      if (result.success && result.data) {
        console.log('✅ === LINKS OBTIDOS ===');
        console.log('🔗 Total de links:', result.data.length);
        console.log('✅ Links ativos:', result.data.filter(link => link.ativo).length);
        setPaymentLinks(result.data);
        console.log('✅ Links de pagamento carregados com sucesso');
      } else {
        console.log('❌ === ERRO AO CARREGAR LINKS ===');
        setError(result.error || 'Erro ao carregar links de pagamento');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, isRefreshing]);

  const refreshData = useCallback(async () => {
    // Evitar múltiplas chamadas simultâneas
    if (isLoading || isRefreshing) {
      console.log('🔄 === PULANDO REFRESH - JÁ EM ANDAMENTO ===');
      return;
    }

    setIsRefreshing(true);
    setError(null);

    try {
      console.log('🔄 === ATUALIZANDO LINKS DE PAGAMENTO ===');
      const result = await api.getPaymentLinks();

      if (result.success && result.data) {
        console.log('✅ === LINKS ATUALIZADOS ===');
        console.log('🔗 Total de links:', result.data.length);
        console.log('✅ Links ativos:', result.data.filter(link => link.ativo).length);
        setPaymentLinks(result.data);
        console.log('✅ Links de pagamento atualizados com sucesso');
      } else {
        console.log('❌ === ERRO AO ATUALIZAR LINKS ===');
        setError(result.error || 'Erro ao atualizar links de pagamento');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO NO REFRESH ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsRefreshing(false);
    }
  }, [isLoading, isRefreshing]);

  const updateLinkInList = (linkId: string, updatedData: Partial<PaymentLink>) => {
    setPaymentLinks(prevLinks => 
      prevLinks.map(link => 
        link.id === linkId ? { ...link, ...updatedData } : link
      )
    );
  };

  useEffect(() => {
    fetchPaymentLinks();
  }, [fetchPaymentLinks]);

  const activeLinks = paymentLinks.filter(link => link.ativo);
  const inactiveLinks = paymentLinks.filter(link => !link.ativo);

  return {
    paymentLinks,
    activeLinks,
    inactiveLinks,
    isLoading: isLoading || isRefreshing,
    error,
    refreshData,
    updateLinkInList,
  };
};
