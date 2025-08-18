import Checkbox from '@/components/Checkbox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import BoletoIcon from '@/images/link de pagamento/Formas de pagamento boleto bancário.svg';
import CartaoIcon from '@/images/link de pagamento/Formas de pagamento cartão de credito.svg';
import PixIcon from '@/images/link de pagamento/Formas de pagamento pix.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function CreatePaymentLinkScreen() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Criar link de pagamento</ThemedText>
        <TouchableOpacity>
          <Ionicons name="help-circle-outline" size={24} color="#000" />
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Preencha os campos abaixo para criar seu link de pagamento</Text>
          <TextInput style={styles.input} placeholder="Nome do produto ou serviço" />
          <TextInput style={styles.input} placeholder="Valor" keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Descrição da cobrança" multiline />

          <Text style={styles.sectionTitle}>Selecione as formas de pagamento</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity style={styles.paymentMethod}>
              <CartaoIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod}>
              <PixIcon />
            </TouchableOpacity>
            <TouchableOpacity style={styles.paymentMethod}>
              <BoletoIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.addressSwitch}>
            <Text>Solicitar endereço no checkout</Text>
            <Checkbox value={isChecked} onValueChange={setChecked} />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={() => router.push('/create-payment-link-personalize')}>
            <Text style={styles.nextButtonText}>Avançar</Text>
            <Ionicons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  mainContainer: {
    margin: 15,
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#6200EE',
    alignSelf: 'flex-start',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: 20,
    gap: 10,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
  },
  addressSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A237E',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    marginRight: 10,
  },
});
