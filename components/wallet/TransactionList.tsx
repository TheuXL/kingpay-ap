import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconCartaoAprovado from '../../images/transações/TransactionIconCartaoAprovado.svg';
import IconCartaoFalhado from '../../images/transações/TransactionIconCartaoFalhado.svg';
import IconPix from '../../images/transações/TransactionIconPix.svg';
import { WalletTransaction } from '../../services/api';

export type Transaction = WalletTransaction;

type TransactionListProps = {
  transactions: Transaction[];
  formatCurrency: (value: number) => string;
  formatDate: (date: string) => string;
};

const transactionIcons = {
  pix: IconPix,
  card_approved: IconCartaoAprovado,
  card_failed: IconCartaoFalhado,
};

export function TransactionList({ transactions, formatCurrency, formatDate }: TransactionListProps) {
  const router = useRouter();

  if (transactions.length === 0) {
    return (
      <View style={styles.emptyStateContainer}>
        <ThemedText style={styles.emptyStateText}>Nenhuma movimentação encontrada</ThemedText>
      </View>
    );
  }

  return (
    <View>
      {transactions.map((transaction, index) => {
        const Icon = transactionIcons[transaction.type];
        return (
          <TouchableOpacity key={transaction.id || index} style={styles.transactionItem} onPress={() => router.push('/(app)/transaction-details')}>
            <View style={styles.transactionIcon}>
              <Icon width={60} height={60} />
            </View>
            <View style={styles.transactionDetails}>
              <ThemedText style={styles.transactionName}>{transaction.name}</ThemedText>
              <ThemedText style={styles.transactionEmail}>{transaction.email}</ThemedText>
              <ThemedText style={styles.transactionAmount}>{formatCurrency(transaction.amount)}</ThemedText>
            </View>
            <ThemedText style={styles.transactionDate}>{formatDate(transaction.date)}</ThemedText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 16,
  },
  transactionIcon: {
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  transactionEmail: {
    fontSize: 14,
    color: '#666',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateText: {
    color: 'gray',
    fontSize: 16,
  },
});
