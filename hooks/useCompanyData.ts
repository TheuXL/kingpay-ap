import { useState, useEffect } from 'react';
import { api, CompanyData } from '../services/api';

export const useCompanyData = () => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCompanyData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.getCompanyData();
      
      if (response.success && response.data) {
        setCompanyData(response.data);
      } else {
        setError(response.error || 'Erro ao buscar dados da empresa');
      }
    } catch (err) {
      setError('Erro inesperado ao buscar dados da empresa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return {
    companyData,
    loading,
    error,
    refetch: fetchCompanyData,
  };
};
