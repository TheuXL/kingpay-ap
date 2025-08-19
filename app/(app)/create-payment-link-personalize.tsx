import { ThemedText } from '@/components/ThemedText';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { useCreatePaymentLink } from '../../hooks/useCreatePaymentLink';
import { CreatePaymentLinkData } from '../../services/api';
import { useState } from 'react';

export default function CreatePaymentLinkPersonalizeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { createPaymentLink, isLoading, error } = useCreatePaymentLink();
  
  const [selectedColor, setSelectedColor] = useState('#FF5733');
  const [logoUrl, setLogoUrl] = useState('');

  // Receber dados do formulário anterior
  const linkData: CreatePaymentLinkData = params.linkData ? JSON.parse(params.linkData as string) : null;

  const colors = [
    '#ff4d4d',
    '#ff7a4d',
    '#ffc54d',
    '#4dff7a',
    '#4dffff',
    '#4d7aff',
    '#7a4dff',
    '#ff4dff',
    '#ff4d7a',
    '#7aff4d',
    '#4dffc5',
    '#4dc5ff',
    '#7a4dff',
    '#c54dff',
    '#ff4dc5',
  ];

  const handleCreateLink = async () => {
    if (!linkData) {
      Alert.alert('Erro', 'Dados do link não encontrados');
      return;
    }

    console.log('🎯 === CRIANDO LINK COM PERSONALIZAÇÃO ===');
    console.log('Cor selecionada:', selectedColor);
    console.log('Logo URL:', logoUrl);

    // Adicionar dados de personalização
    const finalLinkData = {
      ...linkData,
      cor: selectedColor,
      image_logo: logoUrl || undefined,
    };

    console.log('📤 === ENVIANDO DADOS FINAIS PARA API ===');
    console.log('Dados completos:', JSON.stringify(finalLinkData, null, 2));

    const result = await createPaymentLink(finalLinkData);

    if (result.success && result.data) {
      console.log('✅ === LINK CRIADO COM SUCESSO ===');
      // Navegar para a tela de sucesso
      router.push('/payment-link-success');
    } else {
      console.log('❌ === ERRO AO CRIAR LINK ===');
      Alert.alert('Erro', result.error || 'Erro ao criar link de pagamento');
    }
  };

  if (!linkData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Dados do link não encontrados</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Criar link de pagamento</ThemedText>
        <TouchableOpacity>
          {/* Removed Ionicons for help icon as per edit hint */}
        </TouchableOpacity>
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.content}>
          <Text style={styles.title}>Estamos quase lá! Vamos personalizar seu link de pagamento.</Text>
          <View style={styles.uploadContainer}>
            {/* Removed Ionicons for cloud-upload-outline as per edit hint */}
            <Text style={styles.uploadText}>Envie seu logotipo aqui</Text>
            <TouchableOpacity>
              <Text style={styles.uploadButton}>Pesquisar</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Escolha a cor do seu link</Text>
          <TouchableOpacity style={styles.colorSelector}>
            <Text>Selecione a cor</Text>
            {/* Removed Ionicons for color-palette-outline as per edit hint */}
          </TouchableOpacity>

          <View style={styles.colorGrid}>
            {colors.map((color, index) => (
              <TouchableOpacity 
                key={index} 
                style={[
                  styles.colorSwatch, 
                  { backgroundColor: color },
                  selectedColor === color && styles.selectedColorSwatch
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text>Anterior</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.nextButton, isLoading && styles.nextButtonDisabled]} 
            onPress={handleCreateLink}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <Text style={styles.nextButtonText}>Criar link</Text>
                <Text style={styles.checkmark}>✓</Text>
              </>
            )}
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
  uploadContainer: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadText: {
    marginVertical: 10,
  },
  uploadButton: {
    color: 'blue',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorSwatch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColorSwatch: {
    borderWidth: 3,
    borderColor: '#6200EE',
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
  nextButtonDisabled: {
    opacity: 0.7,
  },
  nextButtonText: {
    color: 'white',
    marginRight: 10,
    fontWeight: 'bold',
  },
  checkmark: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  errorText: {
    fontSize: 18,
    color: Colors.red['01'],
    textAlign: 'center',
  },
});
