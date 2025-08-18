import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import SimularTaxasIcon from '@/images/configurações/simular taxas.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import BoletoIcon from '@/images/configurações/selecionar forma de pagamento boleto.svg';
import CartaoIcon from '@/images/configurações/selecionar forma de pagamento cartão.svg';
import PixIcon from '@/images/configurações/selecionar forma de pagamento pix.svg';
import CalcularIcon from '@/images/configurações/botão calcular.svg';

export default function RatesScreen() {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Pix');

  const rates = [
    { name: 'Pix', value: 'R$ 0,50' },
    { name: 'Cartão', value: 'R$ 2,99 + 5.9%' },
    { name: 'Boleto', value: 'R$ 3,00 + 1.99%' },
    { name: 'Saque', value: 'R$ 1,00' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Taxas</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuração das taxas</Text>
          <Text style={styles.sectionSubtitle}>
            Gerencie suas taxas e faça simulações de transações em tempo real.
          </Text>
          <View style={styles.ratesGrid}>
            {rates.map((rate, index) => (
              <View key={index} style={styles.rateCard}>
                <TouchableOpacity style={styles.rateIcon}>
                  <Ionicons name="arrow-down" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.rateName}>{rate.name}</Text>
                <Text style={styles.rateValue}>{rate.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulador de Taxas</Text>
          <View style={styles.simulatorCard}>
            <View style={styles.simulatorIconContainer}>
              <SimularTaxasIcon width={550} height={150} />
            </View>
            <Text style={styles.label}>Digite o valor da transação</Text>
            <TextInput style={styles.input} placeholder="R$ 0,00" keyboardType="numeric" />
            <Text style={styles.label}>Selecione a forma de pagamento</Text>
            <View style={styles.paymentMethodSelector}>
              <TouchableOpacity onPress={() => setSelectedPaymentMethod('Pix')}>
                <PixIcon style={selectedPaymentMethod !== 'Pix' && styles.inactivePaymentMethod} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPaymentMethod('Cartao')}>
                <CartaoIcon style={selectedPaymentMethod !== 'Cartao' && styles.inactivePaymentMethod} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedPaymentMethod('Boleto')}>
                <BoletoIcon style={selectedPaymentMethod !== 'Boleto' && styles.inactivePaymentMethod} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.calculateButton}>
              <CalcularIcon />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  ratesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rateCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '48%',
    marginBottom: 15,
    alignItems: 'center',
  },
  rateIcon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    padding: 10,
    marginBottom: 10,
  },
  rateName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rateValue: {
    fontSize: 14,
    color: 'gray',
  },
  simulatorCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  paymentMethodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  inactivePaymentMethod: {
    opacity: 0.5,
  },
  calculateButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
  simulatorIconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
});
