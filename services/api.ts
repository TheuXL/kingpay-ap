import * as SecureStore from 'expo-secure-store';

// Configurações do Supabase
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// Log das configurações
console.log('🔧 === CONFIGURAÇÕES DA API ===');
console.log('🌐 Supabase URL:', supabaseUrl);
console.log('🔑 Supabase Anon Key:', supabaseAnonKey ? supabaseAnonKey.substring(0, 20) + '...' : 'NÃO DEFINIDA');

// Verificar se as variáveis estão definidas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ === ERRO DE CONFIGURAÇÃO ===');
  console.error('Variáveis de ambiente não definidas:');
  console.error('EXPO_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('EXPO_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'DEFINIDA' : 'NÃO DEFINIDA');
}

// Tipos para a API
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  user: {
    id: string;
    email: string;
    user_metadata?: any;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Classe principal da API
class KingPayAPI {
  private accessToken: string | null = null;

  // Método para fazer login
  async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
    try {
      console.log('🔐 === INICIANDO LOGIN ===');
      console.log('📧 Email:', email);
      console.log('🌐 URL:', `${supabaseUrl}/auth/v1/token?grant_type=password`);
      console.log('🔑 API Key:', supabaseAnonKey.substring(0, 20) + '...');
      
      const requestBody = {
        email,
        password,
      };
      
      console.log('📤 === REQUISIÇÃO ===');
      console.log('Método: POST');
      console.log('URL:', `${supabaseUrl}/auth/v1/token?grant_type=password`);
      console.log('Headers:', {
        'Content-Type': 'application/json',
        'apikey': supabaseAnonKey.substring(0, 20) + '...'
      });
      console.log('Body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      
      console.log('📥 === RESPOSTA ===');
      console.log('Status:', response.status);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));
      console.log('Data:', JSON.stringify(data, null, 2));

      if (response.ok) {
        console.log('✅ === LOGIN BEM-SUCEDIDO ===');
        console.log('👤 User ID:', data.user.id);
        console.log('📧 User Email:', data.user.email);
        console.log('🔑 Access Token:', data.access_token.substring(0, 20) + '...');
        
        // Salvar token no SecureStore
        await SecureStore.setItemAsync('access_token', data.access_token);
        await SecureStore.setItemAsync('refresh_token', data.refresh_token);
        await SecureStore.setItemAsync('user_id', data.user.id);
        
        this.accessToken = data.access_token;
        
        console.log('💾 Tokens salvos no SecureStore');
        console.log('🔄 Redirecionando para /home...');
        
        return {
          success: true,
          data,
        };
      } else {
        console.log('❌ === ERRO NO LOGIN ===');
        console.log('Erro:', data.error_description || data.error || 'Erro desconhecido');
        
        return {
          success: false,
          error: data.error_description || data.error || 'Erro no login',
        };
      }
    } catch (error) {
      console.log('💥 === ERRO DE CONEXÃO ===');
      console.error('Erro:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro de conexão',
      };
    }
  }

  // Método para fazer logout
  async logout(): Promise<void> {
    try {
      console.log('🚪 === INICIANDO LOGOUT ===');
      
      // Remover tokens do SecureStore
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('refresh_token');
      await SecureStore.deleteItemAsync('user_id');
      
      this.accessToken = null;
      
      console.log('🗑️ Tokens removidos do SecureStore');
      console.log('🔄 Redirecionando para /login...');
    } catch (error) {
      console.error('❌ Erro ao fazer logout:', error);
    }
  }

  // Método para obter token armazenado
  async getStoredToken(): Promise<string | null> {
    if (this.accessToken) {
      return this.accessToken;
    }

    try {
      const token = await SecureStore.getItemAsync('access_token');
      this.accessToken = token;
      return token;
    } catch (error) {
      console.error('❌ Erro ao obter token:', error);
      return null;
    }
  }

  // Método para verificar se o usuário está autenticado
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getStoredToken();
    return !!token;
  }
}

// Instância única da API
export const api = new KingPayAPI();

export default api;
