import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import AlertaConfirmacaoIcon from '@/images/solicitar saque/alerta confirmação.svg';
import BotaoConcluirIcon from '@/images/solicitar saque/botão concluir.svg';

export default function WithdrawConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { accountId, accountName, accountBank, amount, amountFormatted } = params;
  
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (cents: string) => {
    const amountInCents = parseInt(cents);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amountInCents / 100);
  };

  const formatDate = () => {
    const today = new Date();
    return today.toLocaleDateString('pt-BR');
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    
    try {
      console.log('✅ === CONFIRMANDO SAQUE ===');
      console.log('🏦 Conta:', accountName);
      console.log('🏦 Banco:', accountBank);
      console.log('💰 Valor:', amount, 'centavos');
      console.log('📅 Data:', formatDate());

      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('✅ === SAQUE CONFIRMADO ===');
      
      // Navegar para tela de sucesso
      router.push({
        pathname: '/(app)/withdraw-success',
        params: {
          accountName: accountName as string,
          amount: amount as string,
          amountFormatted: amountFormatted as string,
          date: formatDate()
        }
      });
      
    } catch (error) {
      console.log('❌ === ERRO AO CONFIRMAR SAQUE ===');
      Alert.alert('Erro', 'Não foi possível confirmar o saque. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Área Pix</Text>
      </View>

      <View style={styles.content}>
        {/* Informações do destinatário - Dados virão do backend */}
        <View style={styles.recipientSection}>
          <Text style={styles.recipientTitle}>
            Enviando para <Text style={styles.recipientName}>{accountName}</Text>
          </Text>
          <Text style={styles.recipientDetails}>
            CPF: ***.234.134-** - {accountBank}
          </Text>
          <Text style={styles.recipientDetails}>
            Chave: +55 (**) *****-3465
          </Text>
        </View>

        {/* Valor */}
        <View style={styles.valueSection}>
          <Text style={styles.valueLabel}>Valor</Text>
          <Text style={styles.valueAmount}>{formatCurrency(amount as string)}</Text>
        </View>

        {/* Detalhes da transação - Data e forma de pagamento virão do backend */}
        <View style={styles.transactionDetails}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Data de envio</Text>
            <Text style={styles.detailValue}>{formatDate()}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Forma de pagamento</Text>
            <Text style={styles.detailValue}>Pix</Text>
          </View>
        </View>

        {/* Alerta */}
        <View style={styles.alertContainer}>
          <AlertaConfirmacaoIcon width={400} height={100} />
        </View>

        {/* Botão concluir */}
        <TouchableOpacity 
          style={styles.button}
          onPress={handleConfirm}
          disabled={isLoading}
        >
          <BotaoConcluirIcon width="100%" height={56} />
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
  recipientSection: {
    marginBottom: 32,
  },
  recipientTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  recipientName: {
    fontWeight: 'bold',
  },
  recipientDetails: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  valueSection: {
    marginBottom: 32,
  },
  valueLabel: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 8,
  },
  valueAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  transactionDetails: {
    marginBottom: 32,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
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
    marginTop: 'auto',
  },
});
