import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import ChavesCadastradasIcon from '@/images/solicitar saque/icon chaves cadastradas.svg';
import SetaChavesCadastradasIcon from '@/images/solicitar saque/seta chaves cadastradas.svg';
import BotaoAvancarIcon from '@/images/solicitar saque/botão avançar.svg';
import { useSubcontas } from '@/hooks/useSubcontas';
import { usePixKeys } from '@/hooks/usePixKeys';
import { useWithdrawProcess } from '@/hooks/useWithdrawProcess';

export default function RequestWithdrawScreen() {
  const router = useRouter();
  const [selectedPixKey, setSelectedPixKey] = useState<string>('');
  const { subcontas, isLoading: subcontasLoading, error: subcontasError } = useSubcontas();
  const { pixKeys, isLoading: pixKeysLoading } = usePixKeys();
  const { validatePixKey, isLoading: validatingPix, error: pixError } = useWithdrawProcess();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleAccountSelect = (subconta: any) => {
    console.log('🏦 === CONTA SELECIONADA ===');
    console.log('ID:', subconta.id);
    console.log('Nome:', subconta.name);
    console.log('Tipo:', subconta.type);
    
    router.push({
      pathname: '/(app)/withdraw-amount',
      params: {
        accountId: subconta.id,
        accountName: subconta.name,
        accountBank: subconta.type,
        accountType: 'subconta'
      }
    });
  };

  const handleManualPixKey = async () => {
    if (!selectedPixKey.trim()) {
      Alert.alert('Erro', 'Por favor, digite uma chave PIX válida');
      return;
    }

    // Validar formato da chave PIX
    const pixKey = selectedPixKey.trim();
    
    // Validações básicas de chave PIX
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(pixKey);
    const isValidCPF = /^\d{11}$/.test(pixKey);
    const isValidCNPJ = /^\d{14}$/.test(pixKey);
    const isValidPhone = /^\d{10,11}$/.test(pixKey);
    const isValidRandomKey = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(pixKey);

    if (!isValidEmail && !isValidCPF && !isValidCNPJ && !isValidPhone && !isValidRandomKey) {
      Alert.alert('Erro', 'Por favor, digite uma chave PIX válida (CPF, CNPJ, email, telefone ou chave aleatória)');
      return;
    }

    console.log('🔑 === INICIANDO VALIDAÇÃO PIX ===');
    console.log('Chave:', pixKey);
    console.log('Tipo:', isValidEmail ? 'EMAIL' : isValidCPF ? 'CPF' : isValidCNPJ ? 'CNPJ' : isValidPhone ? 'PHONE' : 'RANDOM');
    
    // Validar chave PIX no backend e buscar dados do beneficiário
    const isValid = await validatePixKey(pixKey);
    
    if (isValid) {
      console.log('✅ === CHAVE PIX VALIDADA COM SUCESSO ===');
      console.log('👤 Dados do beneficiário obtidos');
      
      // Navegar para a próxima tela com dados do beneficiário
      router.push({
        pathname: '/(app)/withdraw-amount',
        params: {
          pixKeyId: 'manual', // Será substituído pelo ID real da chave
          pixKeyValue: pixKey,
          pixKeyType: isValidEmail ? 'EMAIL' : isValidCPF ? 'CPF' : isValidCNPJ ? 'CNPJ' : isValidPhone ? 'PHONE' : 'RANDOM'
        }
      });
    } else {
      console.log('❌ === ERRO NA VALIDAÇÃO PIX ===');
      Alert.alert('Erro', 'Não foi possível validar a chave PIX. Verifique se a chave está cadastrada.');
    }
  };

  if (subcontasLoading || pixKeysLoading || validatingPix) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1E293B" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Solicitar Saque</Text>
      </View>
      <Text style={styles.title}>Pra quem você deseja enviar?</Text>
      <Text style={styles.subtitle}>Selecione uma das suas contas cadastradas ou digite uma nova chave</Text>
      
      {/* Campo de entrada manual */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome, CPF/CNPJ ou chave aleatória"
          value={selectedPixKey}
          onChangeText={setSelectedPixKey}
        />
      </View>
      
      {/* Subcontas */}
      <Text style={styles.sectionTitle}>Suas contas</Text>
      {subcontas.length > 0 ? (
        subcontas.map((subconta) => (
          <TouchableOpacity 
            key={subconta.id} 
            style={styles.accountItem}
            onPress={() => handleAccountSelect(subconta)}
          >
            <View style={styles.accountIcon}>
              <Text style={styles.accountIconText}>
                {getInitials(subconta.name)}
              </Text>
            </View>
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{subconta.name}</Text>
              <Text style={styles.accountBank}>
                {subconta.type}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={100} color="#64748B" />
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noAccountsText}>Nenhuma conta cadastrada</Text>
      )}
      
      <Text style={styles.sectionTitle}>Gerenciar</Text>
              <TouchableOpacity 
          style={styles.manageItem}
          onPress={() => router.push('/(app)/pix-area')}
        >
          <View style={styles.manageIcon}>
            <ChavesCadastradasIcon width={70} height={70} />
          </View>
          <Text style={styles.manageText}>Chaves cadastradas</Text>
          <SetaChavesCadastradasIcon width={24} height={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleManualPixKey}
          disabled={!selectedPixKey.trim() || validatingPix}
        >
          <BotaoAvancarIcon width="100%" height={56} />
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748B',
  },
  noAccountsText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
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
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  accountItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  accountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  accountIconText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  accountBank: {
    fontSize: 14,
    color: '#64748B',
  },
  manageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  manageIcon: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  manageText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
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
  buttonDisabled: {
    backgroundColor: '#94A3B8',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});