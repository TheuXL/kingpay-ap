import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { ExtratoItem } from '../../services/api';
import { Colors } from '../../constants/Colors';
import { IconEntrada } from './IconEntrada';
import { IconSaida } from './IconSaida';
import { Ionicons } from '@expo/vector-icons';

interface ExtratoListProps {
  extrato: ExtratoItem[];
  isLoading: boolean;
  error: string | null;
  onLoadMore: () => void;
  hasMore: boolean;
  formatCurrency: (value: number) => string;
  formatDate: (dateString: string) => string;
}

export const ExtratoList: React.FC<ExtratoListProps> = ({
  extrato,
  isLoading,
  error,
  onLoadMore,
  hasMore,
  formatCurrency,
  formatDate,
}) => {
  const renderExtratoItem = ({ item }: { item: ExtratoItem }) => {
    const isEntrada = item.entrada;
    
    return (
      <View style={styles.transactionItem}>
        <View style={styles.transactionLeft}>
          <View style={styles.iconContainer}>
            {isEntrada ? (
              <IconEntrada width={50} height={50} />
            ) : (
              <IconSaida width={50} height={50} />
            )}
          </View>
          <View style={styles.transactionInfo}>
            <Text style={styles.entryExitText}>
              {isEntrada ? 'Entrada' : 'Saída'}
            </Text>
            <Text style={styles.transactionTitle} numberOfLines={1}>
              {item.tipo}
            </Text>
            <Text style={styles.transactionValue}>
              {isEntrada ? '+' : '-'}{formatCurrency(item.value)}
            </Text>
          </View>
        </View>
        <View style={styles.transactionRight}>
          <Text style={styles.transactionDate}>
            {formatDate(item.created_at)}
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
            <Text style={styles.emptyTitle}>Erro ao carregar extrato</Text>
            <Text style={styles.emptySubtitle}>{error}</Text>
          </View>
        );
    }

    if (!isLoading && extrato.length === 0) {
              return (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={48} color={Colors.gray['03']} />
            <Text style={styles.emptyTitle}>Nenhuma movimentação encontrada</Text>
            <Text style={styles.emptySubtitle}>Seus movimentos aparecerão aqui</Text>
          </View>
        );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {extrato.length > 0 ? (
        <>
          {extrato.map((item) => (
            <View key={item.id}>
              {renderExtratoItem({ item })}
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
    marginRight: 16,
    width: 40,
    height: 40,
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
    color: Colors.gray['03'],
    marginBottom: 4,
  },
  transactionValue: {
    fontSize: 16,
    fontWeight: '700',
  },
});
