import { ThemedText } from '@/components/ThemedText';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, ActivityIndicator, Image } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { useCreatePaymentLink } from '../../hooks/useCreatePaymentLink';
import { CreatePaymentLinkData } from '../../services/api';
import { useState } from 'react';
import RetornarIcon from '@/images/link de pagamento/retornar.svg';
import CriarLinkIcon from '@/images/link de pagamento/criar link.svg';
import CheckIcon from '@/images/link de pagamento/check.svg';
import HeaderIcon from '@/images/link de pagamento/Header.svg';
import UploadLogoIcon from '@/images/link de pagamento/upload logo.svg';

export default function CreatePaymentLinkPersonalizeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { createPaymentLink, isLoading, error } = useCreatePaymentLink();
  
  const [selectedColor, setSelectedColor] = useState('#FF5733');
  const [logoUrl, setLogoUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Receber dados do formulário anterior
  const linkData: CreatePaymentLinkData = params.linkData ? JSON.parse(params.linkData as string) : null;

  const colors = [
    Colors.red['01'],
    Colors.orange['01'],
    Colors.yellow['01'],
    '#4ADE80',
    '#2DD4BF',
    '#6366F1',
    '#EC4899',
    '#D946EF',
    '#8B5CF6',
    '#0EA5E9',
    Colors.green['02'],
    '#84CC16',
    Colors.blue['01'],
    '#F59E0B',
    '#EF4444',
    '#10B981',
    '#3B82F6',
    '#8B5A2B',
  ];

  const handleSelectImage = () => {
    // Simular seleção de imagem - em uma implementação real, usaríamos expo-image-picker
    Alert.alert(
      'Selecionar Imagem',
      'Funcionalidade de seleção de imagem será implementada com expo-image-picker',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Simular', 
          onPress: () => {
            // Simular uma imagem selecionada
            setSelectedImage('https://via.placeholder.com/150');
            setLogoUrl('https://via.placeholder.com/150');
          }
        }
      ]
    );
  };

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
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Estamos quase lá! Vamos </Text>
            <Text style={styles.titleBlue}>personalizar</Text>
            <Text style={styles.titleBlue}>seu link de pagamento.</Text>
          </View>
          <View style={styles.uploadContainer}>
            {selectedImage ? (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                <TouchableOpacity style={styles.changeImageButton} onPress={handleSelectImage}>
                  <Text style={styles.changeImageText}>Alterar imagem</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <UploadLogoIcon width={20} height={40} />
                <Text style={styles.uploadText}>Envie seu logotipo aqui</Text>
                <TouchableOpacity onPress={handleSelectImage}>
                  <Text style={styles.uploadButton}>Pesquisar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <Text style={styles.sectionTitle}>Escolha a cor do seu link</Text>
          <View style={styles.headerIconContainer}>
            <HeaderIcon width="100%" height={60} />
          </View>

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
                  <CheckIcon width={16} height={16} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => router.back()}>
            <RetornarIcon width={150} height={80} />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={handleCreateLink}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <CriarLinkIcon width={150} height={80} />
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
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#6200EE',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleBlue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.blue['01'],
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
  imagePreviewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  changeImageButton: {
    padding: 10,
  },
  changeImageText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  headerIconContainer: {
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
    borderRadius: 8,
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
