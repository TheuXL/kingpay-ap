import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BalanceCards from '../../components/wallet/BalanceCards';
import TransactionFilter from '../../components/wallet/TransactionFilter';
import { TransactionList } from '../../components/wallet/TransactionList';
import BackIcon from '@/images/icon_back.svg';
import React, { useState } from 'react';

export default function WalletScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Extrato');

  const transactions = [
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: 'Hoje',
      type: 'pix' as const,
    },
    {
      name: 'Capa Notebook Acer Nitro 5',
      email: 'gabrielsantos@gmail.com',
      amount: '+ R$ 245,50',
      date: 'Ontem',
      type: 'card_approved' as const,
    },
  ];

  const renderContent = () => {
    switch (activeFilter) {
      case 'Extrato':
        return <TransactionList transactions={transactions} />;
      case 'Antecipações':
        return (
          <View style={styles.emptyStateContainer}>
            <Image source={require('../../assets/images/obj3d.png')} style={styles.emptyStateImage} />
            <Text style={styles.emptyStateText}>Ainda não há nada por aqui...</Text>
          </View>
        );
      case 'Transferências':
        return <TransactionList transactions={transactions} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carteira</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView>
        <BalanceCards />
        <View style={styles.contentContainer}>
          <View style={styles.movementsHeader}>
            <Text style={styles.movementsTitle}>Movimentações</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>Ver tudo</Text>
              <Ionicons name="arrow-forward" size={16} color="#4A90E2" />
            </TouchableOpacity>
          </View>
          <TransactionFilter activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginTop: 30,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
  },
  movementsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  movementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#4A90E2',
    fontWeight: 'bold',
    marginRight: 5,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  emptyStateText: {
    color: 'gray',
    fontSize: 16,
  },
});
