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
      const token = await SecureStore.getItemAsync('access_token');
      const userId = await SecureStore.getItemAsync('user_id');
      
      if (token && userId) {
        // Token encontrado, considerar autenticado
        setIsAuthenticated(true);
        setUser({
          id: userId,
          email: 'user@example.com', // Placeholder
          user_metadata: {}
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Erro ao verificar status de autenticação:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await api.login(email, password);
      
      if (response.success && response.data) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  useEffect(() => {
    checkAuthStatus();
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
