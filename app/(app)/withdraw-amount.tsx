import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import AlertaIcon from '@/images/solicitar saque/alerta.svg';
import AvancarButton from '@/components/ui/AvancarButton';
import { useWithdrawData } from '@/hooks/useWithdrawData';
import { useWithdrawProcess } from '@/hooks/useWithdrawProcess';

export default function WithdrawAmountScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { 
    accountId, accountName, accountBank, accountType, 
    pixKeyId, pixKeyValue, pixKeyType,
    beneficiaryName, beneficiaryDocument, beneficiaryBank 
  } = params;
  
  const [amount, setAmount] = useState('');
  const { withdrawData, isLoading, error } = useWithdrawData();
  const { beneficiaryData, createWithdrawal, isLoading: creatingWithdrawal, error: withdrawalError } = useWithdrawProcess();

  // Log dos dados do beneficiário
  console.log('👤 === DADOS DO BENEFICIÁRIO NA TELA DE VALOR ===');
  console.log('Beneficiary Data:', beneficiaryData);

  // Log dos parâmetros recebidos
  console.log('💰 === PARÂMETROS RECEBIDOS ===');
  console.log('🏦 Account ID:', accountId);
  console.log('🏦 Account Name:', accountName);
  console.log('🏦 Account Bank:', accountBank);
  console.log('🏦 Account Type:', accountType);
  console.log('🔑 PIX Key ID:', pixKeyId);
  console.log('🔑 PIX Key Value:', pixKeyValue);
  console.log('🔑 PIX Key Type:', pixKeyType);
  console.log('👤 Beneficiary Name:', beneficiaryName);
  console.log('👤 Beneficiary Document:', beneficiaryDocument);
  console.log('👤 Beneficiary Bank:', beneficiaryBank);

  const formatCurrency = (value: string) => {
    // Remove tudo exceto números
    const numericValue = value.replace(/\D/g, '');
    
    // Converte para centavos
    const cents = parseInt(numericValue) || 0;
    
    // Formata para exibição
    const reais = (cents / 100).toFixed(2);
    return reais.replace('.', ',');
  };

  const handleAmountChange = (text: string) => {
    const formatted = formatCurrency(text);
    setAmount(formatted);
  };

  const handleSubmit = async () => {
    // Validar se há dados de destino (conta ou chave PIX)
    if (!accountId && !pixKeyValue) {
      Alert.alert('Erro', 'Por favor, selecione uma conta ou digite uma chave PIX');
      return;
    }

    if (!amount) {
      Alert.alert('Erro', 'Por favor, digite um valor');
      return;
    }

    // Converter valor para centavos
    const amountInCents = Math.round(parseFloat(amount.replace(',', '.')) * 100);
    
    if (amountInCents <= 0) {
      Alert.alert('Erro', 'O valor deve ser maior que zero');
      return;
    }

    if (withdrawData && amountInCents > withdrawData.anticipationBalance) {
      Alert.alert('Erro', 'O valor não pode ser maior que o saldo para antecipação');
      return;
    }

    console.log('💰 === INICIANDO PROCESSO DE SAQUE ===');
    console.log('💰 Valor:', amountInCents, 'centavos');
    console.log('🏦 Conta:', accountName);
    console.log('🏦 Banco:', accountBank);
    console.log('🔑 PIX Key:', pixKeyValue);
    console.log('🔑 PIX Type:', pixKeyType);

    // Navegar para a tela de confirmação com dados do beneficiário
    router.push({
      pathname: '/(app)/withdraw-confirmation',
      params: {
        accountId: accountId as string,
        accountName: accountName as string,
        accountBank: accountBank as string,
        accountType: accountType as string,
        pixKeyId: beneficiaryData?.pixKeyId || pixKeyId as string, // Usar ID real da chave PIX
        pixKeyValue: pixKeyValue as string,
        pixKeyType: pixKeyType as string,
        beneficiaryName: beneficiaryData?.name || beneficiaryName as string,
        beneficiaryDocument: beneficiaryData?.document || beneficiaryDocument as string,
        beneficiaryBank: beneficiaryData?.bank || beneficiaryBank as string,
        amount: amountInCents.toString(),
        amountFormatted: amount
      }
    });
  };

  const formatCurrencyDisplay = (cents: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(cents / 100);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Valor do Saque</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Digite o valor que você gostaria de realizar o saque</Text>
        
        {/* Informações do destinatário */}
        {(accountName || pixKeyValue) && (
          <View style={styles.recipientContainer}>
            <Text style={styles.recipientLabel}>
              {accountName ? 'Enviando para conta:' : 'Enviando para chave PIX:'}
            </Text>
            <Text style={styles.recipientValue}>
              {accountName || pixKeyValue}
            </Text>
            {accountBank && (
              <Text style={styles.recipientBank}>{accountBank}</Text>
            )}
          </View>
        )}
        
        {/* Saldos */}
        {isLoading ? (
          <View style={styles.balanceContainer}>
            <ActivityIndicator size="small" color="#1E293B" />
            <Text style={styles.balanceText}>Carregando saldos...</Text>
          </View>
        ) : error ? (
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Erro ao carregar saldos</Text>
          </View>
        ) : withdrawData ? (
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Saldo disponível: {formatCurrencyDisplay(withdrawData.availableBalance)}</Text>
            <Text style={styles.balanceText}>Saldo para antecipação: {formatCurrencyDisplay(withdrawData.anticipationBalance)}</Text>
          </View>
        ) : null}

        {/* Campo de valor */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.amountInput}
            placeholder="R$ 0,00"
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            maxLength={20}
          />
        </View>

        {/* Alerta */}
        <View style={styles.alertContainer}>
          <AlertaIcon width={400} height={100} />
        </View>

        {/* Botão de continuar */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <AvancarButton />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  balanceContainer: {
    marginBottom: 24,
  },
  balanceText: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 24,
  },
  amountInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    textAlign: 'center',
  },
  alertContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00051B',
    borderRadius: 30,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  recipientContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  recipientLabel: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  recipientValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 2,
  },
  recipientBank: {
    fontSize: 14,
    color: '#64748B',
  },
});
