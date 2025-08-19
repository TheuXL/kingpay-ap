import { useState, useEffect } from 'react';
import { api, PaymentLink } from '../services/api';

export type PeriodFilter = '30 dias' | '15 dias' | 'Ontem' | 'Hoje';

export interface PaymentLinksHook {
  paymentLinks: PaymentLink[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  activeLinks: PaymentLink[];
  inactiveLinks: PaymentLink[];
  updatePeriod: (period: PeriodFilter) => void;
  currentPeriod: PeriodFilter;
}

export const usePaymentLinks = () => {
  const [paymentLinks, setPaymentLinks] = useState<PaymentLink[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const fetchPaymentLinks = async (period: PeriodFilter = currentPeriod) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔗 === CARREGANDO LINKS DE PAGAMENTO ===');
      const { startDate, endDate } = calculateDateRange(period);
      console.log('📅 Período calculado:', startDate, 'até', endDate, `(${period})`);
      
      const result = await api.getPaymentLinks(startDate, endDate);

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
  };

  const refreshData = async () => {
    setError(null);

    try {
      console.log('🔄 === ATUALIZANDO LINKS DE PAGAMENTO ===');
      const { startDate, endDate } = calculateDateRange(currentPeriod);
      console.log('📅 Período atual:', startDate, 'até', endDate, `(${currentPeriod})`);
      const result = await api.getPaymentLinks(startDate, endDate);

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
    }
  };

  const updateLinkInList = (linkId: string, updatedData: Partial<PaymentLink>) => {
    setPaymentLinks(prevLinks => 
      prevLinks.map(link => 
        link.id === linkId ? { ...link, ...updatedData } : link
      )
    );
  };

  const updatePeriod = (period: PeriodFilter) => {
    console.log('📅 === ATUALIZANDO PERÍODO ===');
    console.log('Período selecionado:', period);
    setCurrentPeriod(period);
    fetchPaymentLinks(period);
  };

  // Carregar dados apenas uma vez na inicialização
  useEffect(() => {
    fetchPaymentLinks();
  }, []); // Array vazio - executa apenas uma vez

  const activeLinks = paymentLinks.filter(link => link.ativo);
  const inactiveLinks = paymentLinks.filter(link => !link.ativo);

  return {
    paymentLinks,
    activeLinks,
    inactiveLinks,
    isLoading,
    error,
    refreshData,
    updateLinkInList,
    updatePeriod,
    currentPeriod,
  };
};
