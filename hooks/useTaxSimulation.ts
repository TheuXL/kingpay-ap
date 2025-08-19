import { useState } from 'react';
import { api, TaxSimulationRequest, TaxSimulationResponse } from '../services/api';
import { useUserData } from './useUserData';

export const useTaxSimulation = () => {
  const [simulationResult, setSimulationResult] = useState<TaxSimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { userData } = useUserData();

  const simulateTaxes = async (valor: number, paymentMethod: 'PIX' | 'CARD' | 'BOLETO', parcelas: number = 1) => {
    if (!userData?.company) {
      setError('ID da empresa não encontrado');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const simulationData: TaxSimulationRequest = {
        company_id: userData.company, // Usando o ID da empresa correto
        valor,
        payment_method: paymentMethod,
        parcelas,
      };
      
      const response = await api.simulateTaxes(simulationData);
      
      if (response.success && response.data) {
        setSimulationResult(response.data);
      } else {
        setError(response.error || 'Erro ao simular taxas');
      }
    } catch (err) {
      setError('Erro inesperado ao simular taxas');
    } finally {
      setLoading(false);
    }
  };

  const clearSimulation = () => {
    setSimulationResult(null);
    setError(null);
  };

  return {
    simulationResult,
    loading,
    error,
    simulateTaxes,
    clearSimulation,
  };
};
