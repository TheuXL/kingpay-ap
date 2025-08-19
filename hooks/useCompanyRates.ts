import { useState, useEffect } from 'react';
import { api, CompanyRates } from '../services/api';
import { useUserData } from './useUserData';

export const useCompanyRates = () => {
  const [companyRates, setCompanyRates] = useState<CompanyRates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUserData();

  const fetchCompanyRates = async () => {
    if (!userData?.company) {
      setError('ID da empresa não encontrado');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Usando o ID da empresa correto obtido dos dados do usuário
      const response = await api.getCompanyRates(userData.company);
      
      if (response.success && response.data) {
        setCompanyRates(response.data);
      } else {
        setError(response.error || 'Erro ao buscar taxas da empresa');
      }
    } catch (err) {
      setError('Erro inesperado ao buscar taxas da empresa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.company) {
      fetchCompanyRates();
    }
  }, [userData?.company]);

  return {
    companyRates,
    loading,
    error,
    refetch: fetchCompanyRates,
  };
};
