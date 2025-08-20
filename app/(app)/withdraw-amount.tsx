import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import AlertaIcon from '@/images/solicitar saque/alerta.svg';
import BotaoAvancarIcon from '@/images/solicitar saque/botão avançar.svg';

export default function WithdrawAmountScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { accountId, accountName, accountBank, accountType } = params;
  
  const [amount, setAmount] = useState('');
  const [availableBalance, setAvailableBalance] = useState(1010); // Será carregado do backend
  const [anticipationBalance, setAnticipationBalance] = useState(1010); // Será carregado do backend

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

  const handleSubmit = () => {
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

    if (amountInCents > anticipationBalance) {
      Alert.alert('Erro', 'O valor não pode ser maior que o saldo para antecipação');
      return;
    }

    console.log('💰 === VALOR SELECIONADO ===');
    console.log('💰 Valor:', amountInCents, 'centavos');
    console.log('🏦 Conta:', accountName);
    console.log('🏦 Banco:', accountBank);

    // Navegar para a tela de confirmação
    router.push({
      pathname: '/(app)/withdraw-confirmation',
      params: {
        accountId: accountId as string,
        accountName: accountName as string,
        accountBank: accountBank as string,
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
        
        {/* Saldos */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceText}>Saldo disponível: {formatCurrencyDisplay(availableBalance)}</Text>
          <Text style={styles.balanceText}>Saldo para antecipação: {formatCurrencyDisplay(anticipationBalance)}</Text>
        </View>

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
          <BotaoAvancarIcon width="100%" height={56} />
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
    backgroundColor: '#1E293B',
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
});
