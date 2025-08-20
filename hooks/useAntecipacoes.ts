import { useState, useEffect } from 'react';
import { api, AntecipacaoItem } from '../services/api';

export interface AntecipacoesHook {
  antecipacoes: AntecipacaoItem[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

export const useAntecipacoes = (limit: number = 10, status?: string) => {
  const [antecipacoes, setAntecipacoes] = useState<AntecipacaoItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchAntecipacoes = async (isLoadMore: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('💰 === CARREGANDO ANTECIPAÇÕES ===');
      const currentOffset = isLoadMore ? offset : 0;
      
      const result = await api.getAntecipacoes(limit, currentOffset, status);

      if (result.success && result.data) {
        console.log('✅ === ANTECIPAÇÕES OBTIDAS ===');
        console.log('💰 Total de antecipações:', result.data.length);
        
        if (isLoadMore) {
          setAntecipacoes(prev => [...prev, ...result.data]);
        } else {
          setAntecipacoes(result.data);
        }
        
        setOffset(currentOffset + limit);
        setHasMore(result.data.length === limit);
        
        console.log('✅ Antecipações carregadas com sucesso');
      } else {
        console.log('❌ === ERRO AO CARREGAR ANTECIPAÇÕES ===');
        setError(result.error || 'Erro ao carregar antecipações');
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
      fetchAntecipacoes(true);
    }
  };

  const refreshData = () => {
    setOffset(0);
    setHasMore(true);
    fetchAntecipacoes(false);
  };

  useEffect(() => {
    fetchAntecipacoes(false);
  }, [status]);

  return {
    antecipacoes,
    isLoading,
    error,
    refreshData,
    loadMore,
    hasMore,
  };
};
