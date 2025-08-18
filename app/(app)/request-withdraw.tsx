import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BackIcon from '@/images/icon_back.svg';

export default function RequestWithdrawScreen() {
  const router = useRouter();

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
      <TextInput
        style={styles.input}
        placeholder="Nome, CPF/CNPJ ou chave aleatória"
      />
      <Text style={styles.sectionTitle}>Suas contas</Text>
      <View style={styles.accountItem}>
        <View style={styles.accountIcon}>
          <Text style={styles.accountIconText}>LG</Text>
        </View>
        <View>
          <Text style={styles.accountName}>Lucas Gurgel</Text>
          <Text style={styles.accountBank}>Conta do Santander</Text>
        </View>
      </View>
      <View style={styles.accountItem}>
        <View style={styles.accountIcon}>
          <Text style={styles.accountIconText}>VT</Text>
        </View>
        <View>
          <Text style={styles.accountName}>Vernell Tecnologia</Text>
          <Text style={styles.accountBank}>Conta do PicPay</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Gerenciar</Text>
      <TouchableOpacity style={styles.manageItem}>
        <View style={styles.manageIcon}>
          <Ionicons name="key-outline" size={24} color="#1E293B" />
        </View>
        <Text style={styles.manageText}>Chaves cadastradas</Text>
        <Ionicons name="chevron-forward" size={24} color="#64748B" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Avançar</Text>
        <Ionicons name="arrow-forward" size={24} color="white" />
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
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
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
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});