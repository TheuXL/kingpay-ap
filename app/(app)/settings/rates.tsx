import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import SimularTaxasIcon from '@/images/configurações/simular taxas.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import BoletoIcon from '@/images/configurações/selecionar forma de pagamento boleto.svg';
import CartaoIcon from '@/images/configurações/selecionar forma de pagamento cartão.svg';
import PixIcon from '@/images/configurações/selecionar forma de pagamento pix.svg';
import CalcularIcon from '@/images/configurações/botão calcular.svg';
import { useCompanyRates } from '@/hooks/useCompanyRates';
import { useUserData } from '@/hooks/useUserData';
import { api } from '@/services/api';

interface LocalSimulationResult {
  taxaIntermediacao: string;
  totalTaxas: string;
  taxaMDR?: string;
  taxaAntecipacao?: string;
  valorLiquido: string;
}

export default function RatesScreen() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'PIX' | 'CARD' | 'BOLETO'>('PIX');
  const [transactionValue, setTransactionValue] = useState('');
  const [localSimulationResult, setLocalSimulationResult] = useState<LocalSimulationResult | null>(null);
  const { companyRates, loading: ratesLoading, error: ratesError } = useCompanyRates();
  const { userData } = useUserData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value); // Os valores já vêm em reais
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const getRatesDisplay = () => {
    if (!companyRates) return [];

    return [
      { 
        name: 'Pix', 
        value: `R$ ${companyRates.pix_fee_fixed.toFixed(2)} + ${formatPercentage(companyRates.pix_fee_percentage)}` 
      },
      { 
        name: 'Cartão', 
        value: `R$ ${companyRates.card_fee_fixed.toFixed(2)} + ${formatPercentage(companyRates.card_fee_percentage)}` 
      },
      { 
        name: 'Boleto', 
        value: `R$ ${companyRates.boleto_fee_fixed.toFixed(2)} + ${formatPercentage(companyRates.boleto_fee_percentage)}` 
      },
      { 
        name: 'Saque', 
        value: `R$ ${companyRates.withdrawal_fee_fixed.toFixed(2)} + ${formatPercentage(companyRates.withdrawal_fee_percentage)}` 
      },
    ];
  };

  const handleCalculate = async () => {
    if (!transactionValue || parseFloat(transactionValue) <= 0) {
      Alert.alert('Erro', 'Por favor, insira um valor válido para a transação.');
      return;
    }

    if (!companyRates) {
      Alert.alert('Erro', 'Taxas não carregadas. Tente novamente.');
      return;
    }

    const value = parseFloat(transactionValue);
    const valueInCents = Math.round(value * 100); // Converter para centavos
    
    console.log('🧮 === SIMULANDO TAXAS VIA API ===');
    console.log('💰 Valor da transação:', `R$ ${value.toFixed(2)} (${valueInCents} centavos)`);
    console.log('💳 Método de pagamento:', selectedPaymentMethod);
    
    try {
      const simulationData = {
        company_id: userData?.company || 'default', // Usar company_id do usuário
        valor: valueInCents,
        payment_method: selectedPaymentMethod,
        parcelas: 1 // Sempre 1 para simulação simples
      };

      console.log('📤 === ENVIANDO DADOS PARA API ===');
      console.log('Dados:', simulationData);

      const result = await api.simulateTaxes(simulationData);

      if (result.success && result.data) {
        console.log('✅ === SIMULAÇÃO REALIZADA COM SUCESSO ===');
        console.log('Resultado:', result.data);
        
        // Converter resultado para o formato local
        // A API retorna valores em centavos, precisamos converter para reais
        const taxaIntermediacao = parseFloat(result.data.taxaIntermediacao || '0') / 100;
        const totalTaxas = parseFloat(result.data.totalTaxas || '0') / 100;
        const taxaMDR = parseFloat((result.data as any).taxaMDR || '0') / 100;
        const taxaAntecipacao = parseFloat((result.data as any).taxaAntecipacao || '0') / 100;
        const valorLiquido = value - totalTaxas;
        
        const simulation: LocalSimulationResult = {
          taxaIntermediacao: taxaIntermediacao.toFixed(2),
          totalTaxas: totalTaxas.toFixed(2),
          valorLiquido: valorLiquido.toFixed(2),
          taxaMDR: taxaMDR.toFixed(2),
          taxaAntecipacao: taxaAntecipacao.toFixed(2)
        };

        console.log('📈 Resultado processado:', simulation);
        setLocalSimulationResult(simulation);
      } else {
        console.log('❌ === ERRO NA SIMULAÇÃO ===');
        console.log('Erro:', result.error);
        
        // Fallback para simulação local em caso de erro
        console.log('🔄 === USANDO SIMULAÇÃO LOCAL COMO FALLBACK ===');
        const localSimulation = calculateLocalTaxes(value, selectedPaymentMethod, companyRates);
        setLocalSimulationResult(localSimulation);
      }
    } catch (error) {
      console.log('💥 === ERRO INESPERADO ===');
      console.log('Erro:', error);
      
      // Fallback para simulação local
      console.log('🔄 === USANDO SIMULAÇÃO LOCAL COMO FALLBACK ===');
      const localSimulation = calculateLocalTaxes(value, selectedPaymentMethod, companyRates);
      setLocalSimulationResult(localSimulation);
    }
  };

  const calculateLocalTaxes = (valor: number, paymentMethod: 'PIX' | 'CARD' | 'BOLETO', rates: any): LocalSimulationResult => {
    let taxaFixa = 0;
    let taxaPercentual = 0;
    let taxaMDR = 0;
    let taxaAntecipacao = 0;

    console.log('📋 === DETALHAMENTO DOS CÁLCULOS ===');

    switch (paymentMethod) {
      case 'PIX':
        taxaFixa = rates.pix_fee_fixed;
        taxaPercentual = (valor * rates.pix_fee_percentage) / 100;
        console.log('💸 PIX:');
        console.log(`   Taxa fixa: R$ ${taxaFixa.toFixed(2)}`);
        console.log(`   Taxa percentual (${rates.pix_fee_percentage}%): R$ ${taxaPercentual.toFixed(2)}`);
        break;
      case 'CARD':
        taxaFixa = rates.card_fee_fixed;
        taxaPercentual = (valor * rates.card_fee_percentage) / 100;
        taxaMDR = (valor * rates.mdr_1x_adquirente) / 100;
        taxaAntecipacao = (valor * 0.8) / 100; // 0.8% por 30 dias
        console.log('💳 CARTÃO:');
        console.log(`   Taxa fixa: R$ ${taxaFixa.toFixed(2)}`);
        console.log(`   Taxa percentual (${rates.card_fee_percentage}%): R$ ${taxaPercentual.toFixed(2)}`);
        console.log(`   Taxa MDR (${rates.mdr_1x_adquirente}%): R$ ${taxaMDR.toFixed(2)}`);
        console.log(`   Taxa antecipação (0.8%): R$ ${taxaAntecipacao.toFixed(2)}`);
        break;
      case 'BOLETO':
        taxaFixa = rates.boleto_fee_fixed;
        taxaPercentual = (valor * rates.boleto_fee_percentage) / 100;
        console.log('📄 BOLETO:');
        console.log(`   Taxa fixa: R$ ${taxaFixa.toFixed(2)}`);
        console.log(`   Taxa percentual (${rates.boleto_fee_percentage}%): R$ ${taxaPercentual.toFixed(2)}`);
        break;
    }

    const taxaIntermediacao = taxaFixa + taxaPercentual;
    const totalTaxas = taxaIntermediacao + taxaMDR + taxaAntecipacao;
    const valorLiquido = valor - totalTaxas;

    console.log('📊 === RESUMO DOS CÁLCULOS ===');
    console.log(`   Taxa de intermediação: R$ ${taxaIntermediacao.toFixed(2)}`);
    if (taxaMDR > 0) console.log(`   Taxa MDR: R$ ${taxaMDR.toFixed(2)}`);
    if (taxaAntecipacao > 0) console.log(`   Taxa antecipação: R$ ${taxaAntecipacao.toFixed(2)}`);
    console.log(`   Total de taxas: R$ ${totalTaxas.toFixed(2)}`);
    console.log(`   Valor líquido: R$ ${valorLiquido.toFixed(2)}`);
    console.log('📋 === FIM DOS CÁLCULOS ===');

    return {
      taxaIntermediacao: taxaIntermediacao.toFixed(2),
      totalTaxas: totalTaxas.toFixed(2),
      taxaMDR: taxaMDR.toFixed(2),
      taxaAntecipacao: taxaAntecipacao.toFixed(2),
      valorLiquido: valorLiquido.toFixed(2)
    };
  };

  const handlePaymentMethodSelect = (method: 'PIX' | 'CARD' | 'BOLETO') => {
    setSelectedPaymentMethod(method);
    setLocalSimulationResult(null);
  };

  if (ratesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando taxas...</Text>
      </View>
    );
  }

  if (ratesError) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={Colors.red['01']} />
        <Text style={styles.errorText}>{ratesError}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const rates = getRatesDisplay();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Taxas</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuração das taxas</Text>
          <Text style={styles.sectionSubtitle}>
            Gerencie suas taxas e faça simulações de transações em tempo real.
          </Text>
          <View style={styles.ratesGrid}>
            {rates.map((rate, index) => (
              <View key={index} style={styles.rateCard}>
                <TouchableOpacity style={styles.rateIcon}>
                  <Ionicons name="arrow-down" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.rateName}>{rate.name}</Text>
                <Text style={styles.rateValue}>{rate.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulador de Taxas</Text>
          
          {/* Card com gradiente para cálculo */}
          <View style={styles.calculationCard}>
            <Text style={styles.calculationInstruction}>
              Preencha os campos abaixo para calcular o valor líquido
            </Text>
            <View style={styles.calculationDivider} />
            <Text style={styles.calculationPercentage}>
              {localSimulationResult ? `R$ ${localSimulationResult.valorLiquido}` : 'R$ 0,00'}
            </Text>
          </View>

          {/* Resultado da simulação */}
          {localSimulationResult && (
            <View style={styles.simulationResult}>
              <Text style={styles.simulationTitle}>Resultado da Simulação</Text>
              <View style={styles.simulationItem}>
                <Text style={styles.simulationLabel}>Taxa de Intermediação:</Text>
                <Text style={styles.simulationValue}>R$ {localSimulationResult.taxaIntermediacao}</Text>
              </View>
              {localSimulationResult.taxaMDR && parseFloat(localSimulationResult.taxaMDR) > 0 && (
                <View style={styles.simulationItem}>
                  <Text style={styles.simulationLabel}>Taxa MDR:</Text>
                  <Text style={styles.simulationValue}>R$ {localSimulationResult.taxaMDR}</Text>
                </View>
              )}
              {localSimulationResult.taxaAntecipacao && parseFloat(localSimulationResult.taxaAntecipacao) > 0 && (
                <View style={styles.simulationItem}>
                  <Text style={styles.simulationLabel}>Taxa Antecipação:</Text>
                  <Text style={styles.simulationValue}>R$ {localSimulationResult.taxaAntecipacao}</Text>
                </View>
              )}
              <View style={styles.simulationItem}>
                <Text style={styles.simulationLabel}>Total de Taxas:</Text>
                <Text style={styles.simulationValue}>R$ {localSimulationResult.totalTaxas}</Text>
              </View>
              <View style={styles.simulationItem}>
                <Text style={styles.simulationLabel}>Valor Líquido:</Text>
                <Text style={styles.simulationValue}>
                  R$ {localSimulationResult.valorLiquido}
                </Text>
              </View>
            </View>
          )}



          {/* Input do valor */}
          <Text style={styles.label}>Digite o valor da transação</Text>
          <TextInput 
            style={styles.input} 
            placeholder="R$ 0,00" 
            keyboardType="numeric"
            value={transactionValue}
            onChangeText={setTransactionValue}
          />

          {/* Seleção de método de pagamento */}
          <Text style={styles.label}>Selecione a forma de pagamento</Text>
          <View style={styles.paymentMethodSelector}>
            <TouchableOpacity 
              style={[styles.paymentMethodButton, selectedPaymentMethod === 'PIX' && styles.paymentMethodButtonActive]}
              onPress={() => handlePaymentMethodSelect('PIX')}
            >
              <Text style={[styles.paymentMethodText, selectedPaymentMethod === 'PIX' && styles.paymentMethodTextActive]}>
                Pix
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.paymentMethodButton, selectedPaymentMethod === 'CARD' && styles.paymentMethodButtonActive]}
              onPress={() => handlePaymentMethodSelect('CARD')}
            >
              <Text style={[styles.paymentMethodText, selectedPaymentMethod === 'CARD' && styles.paymentMethodTextActive]}>
                Cartão
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.paymentMethodButton, selectedPaymentMethod === 'BOLETO' && styles.paymentMethodButtonActive]}
              onPress={() => handlePaymentMethodSelect('BOLETO')}
            >
              <Text style={[styles.paymentMethodText, selectedPaymentMethod === 'BOLETO' && styles.paymentMethodTextActive]}>
                Boleto
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botão calcular */}
          <TouchableOpacity 
            style={styles.calculateButton} 
            onPress={handleCalculate}
          >
            <Text style={styles.calculateButtonText}>Calcular</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray['01'],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.red['01'],
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.blue['01'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  sectionSubtitle: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 20,
  },
  ratesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rateCard: {
    backgroundColor: Colors.white['02'],
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  rateIcon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  rateName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.gray['01'],
  },
  rateValue: {
    fontSize: 14,
    color: Colors.blue['04'],
  },
  simulatorCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  simulationResult: {
    backgroundColor: Colors.white['02'],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  simulationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.blue['04'],
    marginBottom: 12,
  },
  simulationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  simulationLabel: {
    fontSize: 14,
    color: Colors.blue['04'],
  },
  simulationValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.gray['01'],
  },
  simulationError: {
    backgroundColor: Colors.red['04'],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
    color: Colors.black['01'],
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  inactivePaymentMethod: {
    opacity: 0.5,
  },
  calculateButton: {
    marginTop: 10,
    marginBottom: 100,
    alignSelf: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.black['01'],
  },
  calculateButtonDisabled: {
    opacity: 0.6,
  },
  simulatorIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  calculationCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  calculationInstruction: {
    fontSize: 16,
    color: Colors.black['01'],
    textAlign: 'center',
    marginBottom: 15,
  },
  calculationDivider: {
    height: 1,
    backgroundColor: Colors.gray['03'],
    marginBottom: 15,
  },
  calculationPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.blue['01'],
    textAlign: 'center',
  },
  paymentMethodButton: {
    backgroundColor: Colors.white['01'],
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.gray['03'],
    minWidth: 80,
    alignItems: 'center',
  },
  paymentMethodButtonActive: {
    backgroundColor: Colors.gray['03'],
    borderColor: Colors.blue['01'],
  },
  paymentMethodText: {
    fontSize: 14,
    color: Colors.gray['01'],
    fontWeight: '500',
  },
  paymentMethodTextActive: {
    color: Colors.black['01'],
    fontWeight: '600',
  },
  calculateButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: '600',
  },
});
