import { useState, useEffect } from 'react';
import { api, Subconta } from '../services/api';

// Interface específica para o AccountSwitcher
export interface AccountSubconta {
  id: string;
  name: string;
  foto?: string;
  type: string;
  status?: string;
}

export interface SubcontasHook {
  subcontas: AccountSubconta[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export const useSubcontas = (): SubcontasHook => {
  const [subcontas, setSubcontas] = useState<AccountSubconta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSubcontas = async () => {
    try {
      console.log('🏢 === BUSCANDO SUBCONTAS ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getSubcontas(10, 0);
      
      if (response.success && response.data) {
        console.log('✅ Subcontas carregadas com sucesso');
        console.log('📋 Total de subcontas:', response.data.length);
        
        // Mapear dados para o formato do AccountSwitcher
        const accountSubcontas: AccountSubconta[] = response.data.map((subconta: Subconta) => ({
          id: subconta.id,
          name: subconta.nome,
          foto: '', // A API não retorna foto, usar ícone padrão
          type: 'Conta empresarial',
          status: subconta.status,
        }));
        
        setSubcontas(accountSubcontas);
      } else {
        console.log('❌ Erro ao carregar subcontas:', response.error);
        setError(response.error || 'Erro ao carregar subcontas');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar subcontas:', err);
      setError('Erro inesperado ao carregar subcontas');
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO SUBCONTAS ===');
    fetchSubcontas();
  };

  useEffect(() => {
    fetchSubcontas();
  }, []);

  return {
    subcontas,
    isLoading,
    error,
    refreshData,
  };
};
