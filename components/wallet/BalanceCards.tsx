import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import SaldoPixIcon from '../../images/carteira/Icon Saldo disponível (Pix).svg';
import SaldoCartaoIcon from '../../images/carteira/icon Saldo disponível (Cartão).svg';
import AReceberIcon from '../../images/carteira/icon A receber.svg';
import ReservaFinanceiraIcon from '../../images/carteira/icon Reserva Financeira.svg';
import SetaSolicitaIcon from '../../images/carteira/seta solicita....svg';
import { Colors } from '@/constants/Colors';
import { WalletData } from '../../services/api';

interface BalanceCardsProps {
  walletData: WalletData | null;
  formatCurrency: (value: number) => string;
}

const balanceIcons = {
  'Saldo disponível (Pix)': <SaldoPixIcon width={24} height={24} />,
  'Saldo disponível (Cartão)': <SaldoCartaoIcon width={24} height={24} />,
  'A receber': <AReceberIcon width={24} height={24} />,
  'Reserva Financeira': <ReservaFinanceiraIcon width={24} height={24} />,
};

export default function BalanceCards({ walletData, formatCurrency }: BalanceCardsProps) {
  const router = useRouter();

  const handleSolicitarSaque = () => {
    router.push('/request-withdraw');
  };
  const balanceData = [
    {
      type: 'Saldo disponível (Pix)' as const,
      amount: formatCurrency(walletData?.saldoPix || 0),
      color: Colors.blue['01'],
      action: 'Solicitar saque',
    },
    {
      type: 'Saldo disponível (Cartão)' as const,
      amount: formatCurrency(walletData?.saldoCartao || 0),
      color: Colors.blue['03'],
      action: 'Solicitar saque',
    },
    {
      type: 'A receber' as const,
      amount: formatCurrency(walletData?.valorReceber || 0),
      color: Colors.green['02'],
      action: 'Solicitar saque',
    },
    {
      type: 'Reserva Financeira' as const,
      amount: formatCurrency(walletData?.reservaFinanceira || 0),
      color: Colors.white['01'],
      textColor: '#000000',
      description: 'Valor retido para garantir a segurança de suas transações.',
    },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {balanceData.map((card, index) => (
        <View key={index} style={[styles.card, { backgroundColor: card.color }]}>
          <View style={styles.cardHeader}>
            {balanceIcons[card.type]}
            <Text style={[styles.cardType, { color: card.textColor || 'white' }]}>{card.type}</Text>
          </View>
          <Text style={[styles.amount, { color: card.textColor || 'white' }]}>{card.amount}</Text>
          {card.action ? (
            <TouchableOpacity onPress={handleSolicitarSaque}>
              <View style={styles.actionContainer}>
                <Text style={[styles.actionText, { color: card.textColor || 'white' }]}>{card.action}</Text>
                <SetaSolicitaIcon style={{ marginLeft: 10, marginRight: 130 }} />
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={[styles.description, { color: card.textColor }]}>{card.description}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingLeft: 20,
  },
  card: {
    width: 300,
    height: 200,
    borderRadius: 20,
    padding: 20,
    marginRight: 15,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardType: {
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 14,
  },
  amount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
});
