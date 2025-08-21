import { Feather, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Checkbox from '../../components/Checkbox';
import BackIcon from '@/images/icon_back.svg';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    console.log('👆 === USUÁRIO CLICOU NO BOTÃO LOGIN ===');
    console.log('📧 Email digitado:', email);
    console.log('🔒 Senha digitada:', password ? '***' : 'vazia');
    console.log('💾 Lembrar acesso:', rememberMe);
    
    // Validação básica
    if (!email.trim()) {
      console.log('❌ Validação falhou: Email vazio');
      Alert.alert('Erro', 'Por favor, insira seu email');
      return;
    }

    if (!password.trim()) {
      console.log('❌ Validação falhou: Senha vazia');
      Alert.alert('Erro', 'Por favor, insira sua senha');
      return;
    }

    console.log('✅ Validação passou, iniciando login...');
    setIsLoading(true);

    try {
      const success = await login(email.trim(), password);
      
      if (success) {
        console.log('🎉 === LOGIN REALIZADO COM SUCESSO ===');
        console.log('🔄 Redirecionando usuário para /home...');
        
        // Navegar para a tela principal
        router.push('/home' as any);
      } else {
        console.log('❌ === LOGIN FALHOU ===');
        console.log('🔄 Usuário permanecerá na tela de login');
        
        // Erro no login
        Alert.alert(
          'Erro no Login',
          'Credenciais inválidas. Tente novamente.'
        );
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO ===');
      console.log('🔄 Usuário permanecerá na tela de login');
      
      Alert.alert(
        'Erro de Conexão',
        'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackPress = () => {
    console.log('👆 === USUÁRIO CLICOU NO BOTÃO VOLTAR ===');
    console.log('🔄 Redirecionando para tela anterior...');
    router.back();
  };

  const handleShowPasswordToggle = () => {
    console.log('👆 === USUÁRIO ALTEROU VISIBILIDADE DA SENHA ===');
    console.log('👁️ Nova visibilidade:', !showPassword ? 'visível' : 'oculta');
    setShowPassword(!showPassword);
  };

  const handleRememberMeToggle = (value: boolean) => {
    console.log('👆 === USUÁRIO ALTEROU "LEMBRAR ACESSO" ===');
    console.log('💾 Novo valor:', value);
    setRememberMe(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
      </View>
      <Image source={require('../../assets/images/obj3d.png')} style={styles.logo} />
      <View style={styles.form}>
        <Text style={styles.label}>Seu email</Text>
        <TextInput
          style={styles.input}
          placeholder="joaodasilva@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          editable={!isLoading}
        />
        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.inputPassword}
            placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            editable={!isLoading}
          />
          <TouchableOpacity 
            onPress={handleShowPasswordToggle}
            disabled={isLoading}
          >
            <Feather 
              name={showPassword ? "eye" : "eye-off"} 
              size={24} 
              color="black" 
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rememberContainer}>
          <Text style={styles.rememberText}>Lembrar acesso</Text>
          <Checkbox
            value={rememberMe}
            onValueChange={handleRememberMeToggle}
            disabled={isLoading}
          />
        </View>
      </View>
      <TouchableOpacity 
        style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.loginButtonText}>Fazer login</Text>
        )}
      </TouchableOpacity>
    </View>
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
    width: 400,
    height: 450,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 5, // Reduzido de 40 para 20 para mover elementos para cima
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    color: '#000000ff',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4ff',
    borderRadius: 10,
    marginBottom: 20,
  },
  inputPassword: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    fontFamily: 'Inter',
  },
  eyeIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberText: {
    fontSize: 16,
    fontFamily: 'Inter',
  },
  loginButton: {
    backgroundColor: '#2A2AFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginTop: 5, // Alterado de 'auto' para 40 para mover para cima
    marginBottom: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter',
  },
  loginButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
});
