import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, LoginResponse } from '../services/api';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  isAuthenticated: boolean;
  user: LoginResponse['user'] | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<LoginResponse['user'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      console.log('🔍 === VERIFICANDO STATUS DE AUTENTICAÇÃO ===');
      
      // Verificar se está autenticado usando a API (que já verifica expiração)
      const isAuth = await api.isAuthenticated();
      
      if (isAuth) {
        // Buscar dados do usuário atual
        const userId = await SecureStore.getItemAsync('user_id');
        
        if (userId) {
          console.log('✅ Usuário autenticado encontrado');
          console.log('👤 User ID:', userId);
          
          setIsAuthenticated(true);
          setUser({
            id: userId,
            email: 'user@example.com', // Será atualizado quando necessário
            user_metadata: {}
          });
        } else {
          console.log('❌ User ID não encontrado');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log('❌ Usuário não autenticado');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('❌ Erro ao verificar status de autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 === INICIANDO LOGIN NO CONTEXT ===');
      console.log('📧 Email:', email);
      
      const response = await api.login(email, password);
      
      if (response.success && response.data) {
        console.log('✅ === LOGIN BEM-SUCEDIDO NO CONTEXT ===');
        console.log('👤 User ID:', response.data.user.id);
        console.log('📧 User Email:', response.data.user.email);
        
        setIsAuthenticated(true);
        setUser(response.data.user);
        return true;
      } else {
        console.log('❌ === LOGIN FALHOU NO CONTEXT ===');
        console.log('Erro:', response.error);
        return false;
      }
    } catch (error) {
      console.error('❌ Erro no login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 === INICIANDO LOGOUT NO CONTEXT ===');
      
      await api.logout();
      
      console.log('✅ === LOGOUT CONCLUÍDO NO CONTEXT ===');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('❌ Erro no logout:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('🚀 === INICIALIZANDO AUTENTICAÇÃO ===');
        
        // Forçar limpeza de tokens órfãos no início
        await api.clearTokenCache();
        
        // Verificar status de autenticação
        await checkAuthStatus();
      } catch (error) {
        console.error('❌ Erro na inicialização da autenticação:', error);
        setIsLoading(false);
      }
    };
    
    initializeAuth();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
