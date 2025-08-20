import { useState, useEffect } from 'react';
import { api, TransferenciaItem } from '../services/api';

export interface TransferenciasHook {
  transferencias: TransferenciaItem[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  loadMore: () => void;
  hasMore: boolean;
}

export const useTransferencias = (limit: number = 10, status?: string) => {
  const [transferencias, setTransferencias] = useState<TransferenciaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchTransferencias = async (isLoadMore: boolean = false) => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔄 === CARREGANDO TRANSFERÊNCIAS ===');
      const currentOffset = isLoadMore ? offset : 0;
      
      const result = await api.getTransferencias(limit, currentOffset, status);

      if (result.success && result.data) {
        console.log('✅ === TRANSFERÊNCIAS OBTIDAS ===');
        console.log('🔄 Total de transferências:', result.data.length);
        
        if (isLoadMore) {
          setTransferencias(prev => [...prev, ...result.data]);
        } else {
          setTransferencias(result.data);
        }
        
        setOffset(currentOffset + limit);
        setHasMore(result.data.length === limit);
        
        console.log('✅ Transferências carregadas com sucesso');
      } else {
        console.log('❌ === ERRO AO CARREGAR TRANSFERÊNCIAS ===');
        setError(result.error || 'Erro ao carregar transferências');
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
      fetchTransferencias(true);
    }
  };

  const refreshData = () => {
    setOffset(0);
    setHasMore(true);
    fetchTransferencias(false);
  };

  useEffect(() => {
    fetchTransferencias(false);
  }, [status]);

  return {
    transferencias,
    isLoading,
    error,
    refreshData,
    loadMore,
    hasMore,
  };
};
