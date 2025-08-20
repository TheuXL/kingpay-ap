import { useState, useEffect } from 'react';
import { api, Subconta } from '../services/api';

export interface SubcontasHook {
  subcontas: Subconta[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useSubcontas = () => {
  const [subcontas, setSubcontas] = useState<Subconta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcontas = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🏦 === CARREGANDO SUBCONTAS ===');
      const result = await api.getSubcontas();

      if (result.success && result.data) {
        console.log('✅ === SUBCONTAS OBTIDAS ===');
        console.log('🏦 Total de subcontas:', result.data.length);
        console.log('✅ Subcontas carregadas com sucesso');
        setSubcontas(result.data);
      } else {
        console.log('❌ === ERRO AO CARREGAR SUBCONTAS ===');
        setError(result.error || 'Erro ao carregar subcontas');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubcontas();
  }, []);

  return {
    subcontas,
    isLoading,
    error,
    refreshData: fetchSubcontas,
  };
};
