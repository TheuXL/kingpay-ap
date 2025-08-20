import { useState, useEffect } from 'react';
import { api, ExtratoItem } from '../services/api';

export interface ExtratoHook {
  extrato: ExtratoItem[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

export const useExtrato = (limit: number = 10) => {
  const [extrato, setExtrato] = useState<ExtratoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchExtrato = async (isLoadMore: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('📋 === CARREGANDO EXTRATO ===');
      const currentOffset = isLoadMore ? offset : 0;
      
      const result = await api.getExtrato(limit, currentOffset);

      if (result.success && result.data) {
        console.log('✅ === EXTRATO OBTIDO ===');
        console.log('📋 Total de itens:', result.data.length);
        
        if (isLoadMore) {
          setExtrato(prev => [...prev, ...result.data]);
        } else {
          setExtrato(result.data);
        }
        
        setOffset(currentOffset + limit);
        setHasMore(result.data.length === limit);
        
        console.log('✅ Extrato carregado com sucesso');
      } else {
        console.log('❌ === ERRO AO CARREGAR EXTRATO ===');
        setError(result.error || 'Erro ao carregar extrato');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !isLoading) {
      fetchExtrato(true);
    }
  };

  const refreshData = () => {
    setOffset(0);
    setHasMore(true);
    fetchExtrato(false);
  };

  useEffect(() => {
    fetchExtrato(false);
  }, []);

  return {
    extrato,
    isLoading,
    error,
    refreshData,
    loadMore,
    hasMore,
  };
};
