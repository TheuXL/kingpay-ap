import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { TransferenciaItem } from '../../services/api';
import { Colors } from '../../constants/Colors';
import { IconEntrada } from './IconEntrada';
import { IconSaida } from './IconSaida';
import { Ionicons } from '@expo/vector-icons';

interface TransferenciasListProps {
  transferencias: TransferenciaItem[];
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
}

export const TransferenciasList: React.FC<TransferenciasListProps> = ({
  transferencias,
  isLoading,
  error,
  onLoadMore,
  hasMore,
  formatCurrency,
  formatDate,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return Colors.orange['01'];
      case 'approved':
        return Colors.green['01'];
      case 'paid':
        return Colors.blue['01'];
      case 'cancelled':
        return Colors.red['01'];
      default:
        return Colors.gray['03'];
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'approved':
        return 'Aprovada';
      case 'paid':
        return 'Paga';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return 'time-outline';
      case 'approved':
        return 'checkmark-circle-outline';
      case 'paid':
        return 'card-outline';
      case 'cancelled':
        return 'close-circle-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const renderTransferenciaItem = ({ item }: { item: TransferenciaItem }) => {
    const statusColor = getStatusColor(item.status);
    const statusText = getStatusText(item.status);
    const statusIcon = getStatusIcon(item.status);
    
    // Para saques, todos são saídas (dinheiro saindo da conta)
    const isEntrada = false; // Saques sempre são saídas
    
    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View style={styles.iconContainer}>
            {isEntrada ? (
              <IconEntrada width={24} height={24} />
            ) : (
              <IconSaida width={24} height={24} />
            )}
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.entryExitText}>
              {isEntrada ? 'Entrada' : 'Saída'}
            </Text>
            <Text style={styles.transactionTitle} numberOfLines={1}>
              Transferência/Saque
            </Text>
            <Text style={styles.transactionValue}>
              {isEntrada ? '+' : '-'}{formatCurrency(item.amounttotransfer)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
                      <Text style={styles.transactionDate}>
              {formatDate(item.createdat)}
            </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    if (!hasMore) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Não há mais itens para carregar</Text>
        </View>
      );
    }

    if (isLoading) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator size="small" color={Colors.blue['01']} />
          <Text style={styles.footerText}>Carregando...</Text>
        </View>
      );
    }

    return null;
  };

  const renderEmpty = () => {
    if (error) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={48} color={Colors.red['01']} />
          <Text style={styles.emptyTitle}>Erro ao carregar transferências</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
        </View>
      );
    }

    if (!isLoading && transferencias.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Ionicons name="swap-horizontal-outline" size={48} color={Colors.gray['03']} />
          <Text style={styles.emptyTitle}>Nenhuma transferência encontrada</Text>
          <Text style={styles.emptySubtitle}>Suas transferências aparecerão aqui</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {transferencias.length > 0 ? (
        <>
          {transferencias.map((item) => (
            <View key={item.id}>
              {renderTransferenciaItem({ item })}
            </View>
          ))}
          {renderFooter()}
        </>
      ) : (
        renderEmpty()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 12,
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  transactionDate: {
    fontSize: 14,
    color: Colors.gray['03'],
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  footer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: Colors.gray['03'],
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.gray['03'],
    textAlign: 'center',
  },
  entryExitText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray['03'],
    marginBottom: 4,
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
  },
});
