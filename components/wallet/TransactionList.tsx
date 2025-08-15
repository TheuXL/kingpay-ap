import { ThemedText } from '@/components/ThemedText';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import IconCartaoAprovado from '../../images/transações/TransactionIconCartaoAprovado.svg';
import IconCartaoFalhado from '../../images/transações/TransactionIconCartaoFalhado.svg';
import IconPix from '../../images/transações/TransactionIconPix.svg';

type Transaction = {
  name: string;
  email: string;
  amount: string;
  date: string;
  type: 'pix' | 'card_approved' | 'card_failed';
};

type TransactionListProps = {
  transactions: Transaction[];
};

const transactionIcons = {
  pix: IconPix,
  card_approved: IconCartaoAprovado,
  card_failed: IconCartaoFalhado,
};

export function TransactionList({ transactions }: TransactionListProps) {
  const router = useRouter();

  return (
    <View>
      {transactions.map((transaction, index) => {
        const Icon = transactionIcons[transaction.type];
        return (
          <TouchableOpacity key={index} style={styles.transactionItem} onPress={() => router.push('/(app)/transaction-details')}>
            <View style={styles.transactionIcon}>
              <Icon width={60} height={60} />
            </View>
            <View style={styles.transactionDetails}>
              <ThemedText style={styles.transactionName}>{transaction.name}</ThemedText>
              <ThemedText style={styles.transactionEmail}>{transaction.email}</ThemedText>
              <ThemedText style={styles.transactionAmount}>{transaction.amount}</ThemedText>
            </View>
            <ThemedText style={styles.transactionDate}>{transaction.date}</ThemedText>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
});
