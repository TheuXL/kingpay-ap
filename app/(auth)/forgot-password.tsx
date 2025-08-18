import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BackIcon from '@/images/icon_back.svg';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Esqueci a senha</ThemedText>
      </View>
      <Image source={require('../../assets/images/obj3d2.png')} style={styles.logo} />
      <Text style={styles.title}>Recuperação de senha</Text>
      <Text style={styles.subtitle}>
        Informe seu e-mail cadastrado para receber as instruções de recuperação.
      </Text>
      <View style={styles.form}>
        <Text style={styles.label}>Seu email</Text>
        <TextInput
          style={styles.input}
          placeholder="joaodasilva@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Enviar</Text>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    width: 24,
    height: 24,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    transform: [{ translateX: -12 }],
    fontFamily: 'Inter',
  },
  logo: {
    width: 430,
    height: 530,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'left',
    marginBottom: 30,
    fontFamily: 'Inter',
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  input: {
    backgroundColor: '#f0f4ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    fontFamily: 'Inter',
  },
  sendButton: {
    backgroundColor: '#2A2AFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 'auto',
    marginBottom: 40,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
});
