import { useState } from 'react';
import { api } from '../services/api';

export interface BeneficiaryData {
  name: string;
  document: string;
  bank: string;
  accountType: string;
  isValid: boolean;
  pixKey: string;
  pixKeyType: string;
  pixKeyId?: string; // ID real da chave PIX no sistema
}

export interface WithdrawProcessData {
  beneficiaryData: BeneficiaryData | null;
  amount: number;
  description: string;
}

export interface WithdrawProcessHook {
  beneficiaryData: BeneficiaryData | null;
  isLoading: boolean;
  error: string | null;
  validatePixKey: (pixKey: string) => Promise<boolean>;
  createWithdrawal: (amount: number, description: string) => Promise<boolean>;
  resetProcess: () => void;
}

export const useWithdrawProcess = (): WithdrawProcessHook => {
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePixKey = async (pixKey: string): Promise<boolean> => {
    try {
      console.log('🔍 === VALIDANDO CHAVE PIX ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getPixKeyData(pixKey);
      
      if (response.success && response.data) {
        console.log('✅ Chave PIX validada com sucesso');
        console.log('🆔 PIX Key ID:', response.data.pixKeyId);
        setBeneficiaryData(response.data);
        return true;
      } else {
        console.log('❌ Erro ao validar chave PIX:', response.error);
        setError(response.error || 'Erro ao validar chave PIX');
        return false;
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao validar chave PIX:', err);
      setError('Erro inesperado ao validar chave PIX');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const createWithdrawal = async (amount: number, description: string): Promise<boolean> => {
    try {
      console.log('💰 === CRIANDO SAQUE ===');
      setIsLoading(true);
      setError(null);

      if (!beneficiaryData) {
        setError('Dados do beneficiário não encontrados');
        return false;
      }

      // Usar o método real da API para criar o saque
      const response = await api.createWithdrawal({
        pixkeyid: beneficiaryData.pixKey,
        requestedamount: amount,
        description: description,
        isPix: true
      });

      if (response.success && response.data) {
        console.log('✅ === SAQUE CRIADO COM SUCESSO ===');
        console.log('🆔 ID:', response.data.id);
        console.log('📊 Status:', response.data.status);
        return true;
      } else {
        console.log('❌ === ERRO AO CRIAR SAQUE ===');
        console.log('Erro:', response.error);
        setError(response.error || 'Erro ao criar saque');
        return false;
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao criar saque:', err);
      setError('Erro inesperado ao criar saque');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const resetProcess = () => {
    console.log('🔄 === RESETANDO PROCESSO DE SAQUE ===');
    setBeneficiaryData(null);
    setError(null);
    setIsLoading(false);
  };

  return {
    beneficiaryData,
    isLoading,
    error,
    validatePixKey,
    createWithdrawal,
    resetProcess,
  };
};
