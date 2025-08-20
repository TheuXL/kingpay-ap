import { useState, useEffect } from 'react';
import { api, UserData } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserData = async () => {
    if (!user?.id) {
      setError('Usuário não autenticado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getUserData(user.id);
      
      if (response.success && response.data) {
        // A resposta da API pode vir aninhada em um campo 'user'
        const userData = (response.data as any).user || response.data;
        setUserData(userData);
      } else {
        setError(response.error || 'Erro ao buscar dados do usuário');
      }
    } catch (err) {
      setError('Erro inesperado ao buscar dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [user?.id]);

  const updateUserData = async (updatedData: Partial<UserData>) => {
    if (!user?.id) {
      setError('Usuário não autenticado');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.updateUserData(user.id, updatedData);
      
      if (response.success && response.data) {
        const userData = (response.data as any).user || response.data;
        setUserData(userData);
        return { success: true };
      } else {
        setError(response.error || 'Erro ao atualizar dados do usuário');
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Erro inesperado ao atualizar dados do usuário');
      return { success: false, error: 'Erro inesperado ao atualizar dados do usuário' };
    } finally {
      setLoading(false);
    }
  };

  return {
    userData,
    loading,
    error,
    refetch: fetchUserData,
    updateUserData,
  };
};
