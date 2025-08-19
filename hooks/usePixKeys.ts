import { useState, useEffect } from 'react';
import { api, PixKey, CreatePixKeyData, UpdatePixKeyData } from '../services/api';

export interface PixKeysHook {
  pixKeys: PixKey[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  createPixKey: (data: CreatePixKeyData) => Promise<boolean>;
  updatePixKey: (id: string, data: UpdatePixKeyData) => Promise<boolean>;
  deletePixKey: (id: string) => Promise<boolean>;
}

export const usePixKeys = () => {
  const [pixKeys, setPixKeys] = useState<PixKey[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPixKeys = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log('🔑 === CARREGANDO CHAVES PIX ===');
      const result = await api.getPixKeys();

      if (result.success && result.data) {
        console.log('✅ === CHAVES PIX OBTIDAS ===');
        console.log('🔑 Total de chaves:', result.data.length);
        console.log('✅ Chaves válidas:', result.data.filter(key => key.v).length);
        setPixKeys(result.data);
        console.log('✅ Chaves PIX carregadas com sucesso');
      } else {
        console.log('❌ === ERRO AO CARREGAR CHAVES PIX ===');
        setError(result.error || 'Erro ao carregar chaves PIX');
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createPixKey = async (data: CreatePixKeyData): Promise<boolean> => {
    setError(null);

    try {
      console.log('🔑 === CRIANDO CHAVE PIX ===');
      const result = await api.createPixKey(data);

      if (result.success && result.data) {
        console.log('✅ === CHAVE PIX CRIADA ===');
        console.log('🔑 Nova chave:', result.data.key);
        console.log('✅ Chave PIX criada com sucesso');
        
        // Atualizar a lista local
        setPixKeys(prevKeys => [...prevKeys, result.data!]);
        return true;
      } else {
        console.log('❌ === ERRO AO CRIAR CHAVE PIX ===');
        setError(result.error || 'Erro ao criar chave PIX');
        return false;
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO AO CRIAR CHAVE PIX ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return false;
    }
  };

  const updatePixKey = async (id: string, data: UpdatePixKeyData): Promise<boolean> => {
    setError(null);

    try {
      console.log('🔑 === ATUALIZANDO CHAVE PIX ===');
      const result = await api.updatePixKey(id, data);

      if (result.success && result.data) {
        console.log('✅ === CHAVE PIX ATUALIZADA ===');
        console.log('🔑 Chave atualizada:', result.data.key);
        console.log('✅ Chave PIX atualizada com sucesso');
        
        // Atualizar a lista local
        setPixKeys(prevKeys => 
          prevKeys.map(key => key.id === id ? result.data! : key)
        );
        return true;
      } else {
        console.log('❌ === ERRO AO ATUALIZAR CHAVE PIX ===');
        setError(result.error || 'Erro ao atualizar chave PIX');
        return false;
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO AO ATUALIZAR CHAVE PIX ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return false;
    }
  };

  const deletePixKey = async (id: string): Promise<boolean> => {
    setError(null);

    try {
      console.log('🔑 === EXCLUINDO CHAVE PIX ===');
      const result = await api.deletePixKey(id);

      if (result.success) {
        console.log('✅ === CHAVE PIX EXCLUÍDA ===');
        console.log('🔑 Chave excluída com ID:', id);
        console.log('✅ Chave PIX excluída com sucesso');
        
        // Atualizar a lista local
        setPixKeys(prevKeys => prevKeys.filter(key => key.id !== id));
        return true;
      } else {
        console.log('❌ === ERRO AO EXCLUIR CHAVE PIX ===');
        setError(result.error || 'Erro ao excluir chave PIX');
        return false;
      }
    } catch (err) {
      console.log('💥 === ERRO INESPERADO AO EXCLUIR CHAVE PIX ===');
      const errorMessage = err instanceof Error ? err.message : 'Erro inesperado';
      setError(errorMessage);
      return false;
    }
  };

  useEffect(() => {
    fetchPixKeys();
  }, []);

  return {
    pixKeys,
    isLoading,
    error,
    refreshData: fetchPixKeys,
    createPixKey,
    updatePixKey,
    deletePixKey,
  };
};
