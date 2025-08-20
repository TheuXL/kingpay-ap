import { useState, useEffect } from 'react';
import { api, AlertNotification } from '../services/api';

// Interface específica para o frontend (mantém compatibilidade)
export interface Notification {
  id: string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  type?: string;
}

export interface NotificationsHook {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
  markAsRead: (notificationId: string) => void;
}

export const useNotifications = (): NotificationsHook => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      console.log('🔔 === BUSCANDO NOTIFICAÇÕES ===');
      setIsLoading(true);
      setError(null);

      const response = await api.getNotifications();
      
      if (response.success && response.data) {
        console.log('✅ Notificações carregadas com sucesso');
        console.log('📋 Total de notificações:', response.data.length);
        
        // Mapear dados para o formato do frontend
        const frontendNotifications: Notification[] = response.data.map((alert: AlertNotification) => ({
          id: alert.id,
          title: alert.title,
          description: alert.description,
          date: alert.date,
          isRead: alert.isRead,
          type: alert.type,
        }));
        
        setNotifications(frontendNotifications);
      } else {
        console.log('❌ Erro ao carregar notificações:', response.error);
        setError(response.error || 'Erro ao carregar notificações');
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao carregar notificações:', err);
      setError('Erro inesperado ao carregar notificações');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      console.log('✅ === MARCANDO NOTIFICAÇÃO COMO LIDA ===', notificationId);
      
      const response = await api.markNotificationAsRead(notificationId);
      
      if (response.success) {
        console.log('✅ Notificação marcada como lida');
        // Atualizar estado local
        setNotifications(prev => 
          prev.map(notification => 
            notification.id === notificationId 
              ? { ...notification, isRead: true }
              : notification
          )
        );
      } else {
        console.log('❌ Erro ao marcar notificação como lida:', response.error);
      }
    } catch (err) {
      console.log('💥 Erro inesperado ao marcar notificação como lida:', err);
    }
  };

  const refreshData = () => {
    console.log('🔄 === ATUALIZANDO NOTIFICAÇÕES ===');
    fetchNotifications();
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return {
    notifications,
    isLoading,
    error,
    refreshData,
    markAsRead,
  };
};
