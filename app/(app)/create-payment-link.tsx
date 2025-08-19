import Checkbox from '@/components/Checkbox';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';

import BoletoIcon from '@/images/link de pagamento/Formas de pagamento boleto bancário.svg';
import CartaoIcon from '@/images/link de pagamento/Formas de pagamento cartão de credito.svg';
import PixIcon from '@/images/link de pagamento/Formas de pagamento pix.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function CreatePaymentLinkScreen() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [selectedMethods, setSelectedMethods] = useState({
    cartao: true,
    pix: true,
    boleto: false
  });
  const [formData, setFormData] = useState({
    nome: '',
    valor: '',
    descricao: ''
  });

  const togglePaymentMethod = (method: 'cartao' | 'pix' | 'boleto') => {
    setSelectedMethods(prev => ({
      ...prev,
      [method]: !prev[method]
    }));
  };

  const handleNext = async () => {
    console.log('🎯 === VALIDANDO FORMULÁRIO ===');
    
    // Validações básicas
    if (!formData.nome.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome do produto ou serviço');
      return;
    }

    if (!formData.valor.trim()) {
      Alert.alert('Erro', 'Por favor, informe o valor');
      return;
    }

    const valor = parseFloat(formData.valor.replace(',', '.'));
    if (isNaN(valor) || valor <= 0) {
      Alert.alert('Erro', 'Por favor, informe um valor válido');
      return;
    }

    // Verificar se pelo menos um método de pagamento foi selecionado
    const hasPaymentMethod = selectedMethods.cartao || selectedMethods.pix || selectedMethods.boleto;
    if (!hasPaymentMethod) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos uma forma de pagamento');
      return;
    }

    console.log('✅ === FORMULÁRIO VÁLIDO ===');
    console.log('Nome:', formData.nome);
    console.log('Valor:', valor);
    console.log('Descrição:', formData.descricao);
    console.log('Métodos de pagamento:', selectedMethods);
    console.log('Solicitar endereço:', isChecked);

    // Preparar dados para passar para a tela de personalização
    const linkData = {
      nome: formData.nome.trim(),
      valor: valor * 100, // Converter para centavos
      formas_de_pagamento: [] as string[],
      ativo: true,
      descricao_cobranca: formData.descricao.trim() || undefined,
      solicitar_endereco: isChecked,
      max_parcelamento: 12, // Valor padrão
    };

    // Adicionar métodos de pagamento selecionados
    if (selectedMethods.cartao) linkData.formas_de_pagamento.push('cartao');
    if (selectedMethods.pix) linkData.formas_de_pagamento.push('pix');
    if (selectedMethods.boleto) linkData.formas_de_pagamento.push('boleto');

    console.log('📤 === NAVEGANDO PARA PERSONALIZAÇÃO ===');
    console.log('Dados preparados:', JSON.stringify(linkData, null, 2));

    // Navegar para a tela de personalização com os dados do formulário
    router.push({
      pathname: '/create-payment-link-personalize',
      params: { 
        linkData: JSON.stringify(linkData)
      }
    });
  };

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
          
          <TextInput 
            style={styles.input} 
            placeholder="Nome do produto ou serviço" 
            value={formData.nome}
            onChangeText={(text) => setFormData(prev => ({ ...prev, nome: text }))}
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Valor" 
            keyboardType="numeric"
            value={formData.valor}
            onChangeText={(text) => setFormData(prev => ({ ...prev, valor: text }))}
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Descrição da cobrança" 
            multiline
            value={formData.descricao}
            onChangeText={(text) => setFormData(prev => ({ ...prev, descricao: text }))}
          />

          <Text style={styles.sectionTitle}>Selecione as formas de pagamento</Text>
          <View style={styles.paymentMethods}>
            <TouchableOpacity 
              style={[styles.paymentMethod, selectedMethods.cartao && styles.paymentMethodSelected]}
              onPress={() => togglePaymentMethod('cartao')}
            >
              <CartaoIcon />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.paymentMethod, selectedMethods.pix && styles.paymentMethodSelected]}
              onPress={() => togglePaymentMethod('pix')}
            >
              <PixIcon />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.paymentMethod, selectedMethods.boleto && styles.paymentMethodSelected]}
              onPress={() => togglePaymentMethod('boleto')}
            >
              <BoletoIcon />
            </TouchableOpacity>
          </View>

          <View style={styles.addressSwitch}>
            <Text>Solicitar endereço no checkout</Text>
            <Checkbox value={isChecked} onValueChange={setChecked} />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="black" />
            <Text>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
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
    margin: 0,
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.white['01'],
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
  paymentMethodSelected: {
    backgroundColor: '#E0E0E0',
    borderColor: '#6200EE',
    borderWidth: 2,
  },
  addressSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 30,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#6200EE',
    borderRadius: 30,
  },
  nextButtonText: {
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
  },
});
