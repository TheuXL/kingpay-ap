import { useState, useEffect } from 'react';
import { api, AffiliateCode, AffiliateReport } from '@/services/api';

export const useAffiliateData = () => {
  const [affiliateCode, setAffiliateCode] = useState<string>('');
  const [affiliateReport, setAffiliateReport] = useState<AffiliateReport | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAffiliateCode = async () => {
    try {
      console.log('🎯 Buscando código de afiliado...');
      const result = await api.getAffiliateCode();
      
      if (result.success && result.data) {
        console.log('✅ Código de afiliado obtido:', result.data.affiliate_code);
        setAffiliateCode(result.data.affiliate_code);
        return result.data.affiliate_code;
      } else {
        console.log('❌ Erro ao obter código de afiliado:', result.error);
        setError(result.error || 'Erro ao obter código de afiliado');
        return null;
      }
    } catch (error) {
      console.error('💥 Erro ao buscar código de afiliado:', error);
      setError('Erro de conexão');
      return null;
    }
  };

  const fetchAffiliateReport = async () => {
    try {
      console.log('📊 Buscando relatório de afiliado...');
      const result = await api.getAffiliateReport();
      
      if (result.success && result.data) {
        console.log('✅ Relatório de afiliado obtido:', result.data);
        setAffiliateReport(result.data);
        return result.data;
      } else {
        console.log('❌ Erro ao obter relatório de afiliado:', result.error);
        setError(result.error || 'Erro ao obter relatório de afiliado');
        return null;
      }
    } catch (error) {
      console.error('💥 Erro ao buscar relatório de afiliado:', error);
      setError('Erro de conexão');
      return null;
    }
  };

  const requestWithdraw = async (amountCents: number) => {
    try {
      console.log('💰 Solicitando saque de comissão...');
      const result = await api.requestAffiliateWithdraw(amountCents);
      
      if (result.success) {
        console.log('✅ Saque solicitado com sucesso');
        // Recarregar dados após o saque
        await fetchAffiliateReport();
        return true;
      } else {
        console.log('❌ Erro ao solicitar saque:', result.error);
        setError(result.error || 'Erro ao solicitar saque');
        return false;
      }
    } catch (error) {
      console.error('💥 Erro ao solicitar saque:', error);
      setError('Erro de conexão');
      return false;
    }
  };

  const loadAffiliateData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Buscar código e relatório em paralelo
      const [codeResult, reportResult] = await Promise.all([
        fetchAffiliateCode(),
        fetchAffiliateReport()
      ]);
      
      if (codeResult && reportResult) {
        console.log('✅ Dados de afiliado carregados com sucesso');
      }
    } catch (error) {
      console.error('💥 Erro ao carregar dados de afiliado:', error);
      setError('Erro ao carregar dados');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAffiliateData();
  }, []);

  return {
    affiliateCode,
    affiliateReport,
    isLoading,
    error,
    fetchAffiliateCode,
    fetchAffiliateReport,
    requestWithdraw,
    loadAffiliateData,
  };
};
