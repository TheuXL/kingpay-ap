import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import MessageContainer from '@/images/link de pagamento/Message Container.svg';
import SuccessMessageIcon from '@/images/link de pagamento/Success Message.svg';
import CopyIconContainer from '@/images/link de pagamento/Copy Icon Container.svg';
import * as Clipboard from 'expo-clipboard';

export default function PaymentLinkSuccessScreen() {
  const router = useRouter();
  
  // Simular link gerado (em uma implementação real, viria dos parâmetros da rota)
  const generatedLink = 'https://app.kingpaybr.com/pay/27a8d0f5-8967-42c5-8f45-c51d4b377748';

  const handleCopyLink = async () => {
    try {
      await Clipboard.setStringAsync(generatedLink);
      Alert.alert('Sucesso', 'Link copiado para a área de transferência!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível copiar o link');
    }
  };

  return (
    <ImageBackground
      source={require('@/images/link de pagamento/Link - Gerado com sucesso.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <SuccessMessageIcon width={300} height={300} />
        
        <View style={styles.linkCard}>
          <Text style={styles.linkText}>{generatedLink}</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
            <CopyIconContainer width={45} height={45} />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.continueButton} onPress={() => router.push('/home')}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backgroundImage: {
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingTop: 40,
    width: '100%',
    height: '65%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  linkCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  linkText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginRight: 12,
  },
  copyButton: {
    padding: 8,
  },
  continueButton: {
    backgroundColor: '#111827',
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
