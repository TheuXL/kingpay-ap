import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import AlertaConfirmacaoIcon from '@/images/solicitar saque/alerta confirmação.svg';
import BotaoConcluirIcon from '@/images/solicitar saque/botão concluir.svg';
import { useWithdrawProcess } from '@/hooks/useWithdrawProcess';
import { api } from '@/services/api';

export default function WithdrawConfirmationScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { 
    accountId, accountName, accountBank, accountType,
    pixKeyId, pixKeyValue, pixKeyType,
    beneficiaryName, beneficiaryDocument, beneficiaryBank,
    amount, amountFormatted 
  } = params;
  
  const { createWithdrawal, isLoading, error } = useWithdrawProcess();

  // Log dos parâmetros recebidos
  console.log('✅ === PARÂMETROS DE CONFIRMAÇÃO ===');
  console.log('🏦 Account ID:', accountId);
  console.log('🏦 Account Name:', accountName);
  console.log('🏦 Account Bank:', accountBank);
  console.log('🔑 PIX Key:', pixKeyValue);
  console.log('👤 Beneficiary Name:', beneficiaryName);
  console.log('👤 Beneficiary Document:', beneficiaryDocument);
  console.log('👤 Beneficiary Bank:', beneficiaryBank);
  console.log('💰 Amount:', amount);

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
    try {
      console.log('✅ === CONFIRMANDO SAQUE ===');
      console.log('👤 Beneficiário:', beneficiaryName);
      console.log('📄 Documento:', beneficiaryDocument);
      console.log('🏦 Banco:', beneficiaryBank);
      console.log('🔑 Chave PIX:', pixKeyValue);
      console.log('💰 Valor:', amount, 'centavos');
      console.log('📅 Data:', formatDate());

      // Criar saque usando a API real
      const amountInCents = parseInt(amount as string);
      const description = `Saque para ${beneficiaryName || accountName}`;
      
      // Usar a API diretamente para criar o saque
      const response = await api.createWithdrawal({
        pixkeyid: pixKeyId as string, // Usar o ID real da chave PIX
        requestedamount: amountInCents,
        description: description,
        isPix: true
      });

      if (response.success && response.data) {
        console.log('✅ === SAQUE CRIADO COM SUCESSO ===');
        console.log('🆔 ID:', response.data.id);
        console.log('📊 Status:', response.data.status);
        
        // Navegar para tela de sucesso
        router.push({
          pathname: '/(app)/withdraw-success',
          params: {
            accountName: beneficiaryName || accountName as string,
            amount: amount as string,
            amountFormatted: amountFormatted as string,
            date: formatDate(),
            withdrawalId: response.data.id
          }
        });
      } else {
        console.log('❌ === ERRO AO CRIAR SAQUE ===');
        console.log('Erro:', response.error);
        Alert.alert('Erro', response.error || 'Não foi possível criar o saque. Tente novamente.');
      }
      
    } catch (error) {
      console.log('❌ === ERRO AO CONFIRMAR SAQUE ===');
      Alert.alert('Erro', 'Não foi possível confirmar o saque. Tente novamente.');
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
        {/* Informações do destinatário */}
        <View style={styles.recipientSection}>
          <Text style={styles.recipientTitle}>
            Enviando para <Text style={styles.recipientName}>
              {beneficiaryName || accountName}
            </Text>
          </Text>
          {beneficiaryDocument ? (
            <Text style={styles.recipientDetails}>
              CPF: {beneficiaryDocument} - {beneficiaryBank}
            </Text>
          ) : (
            <Text style={styles.recipientDetails}>
              {accountBank}
            </Text>
          )}
          {pixKeyValue && (
            <Text style={styles.recipientDetails}>
              Chave: {pixKeyValue}
            </Text>
          )}
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
