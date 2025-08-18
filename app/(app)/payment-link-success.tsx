import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MessageContainer from '@/images/link de pagamento/Message Container.svg';

export default function PaymentLinkSuccessScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('@/images/link de pagamento/Link - Gerado com sucesso.png')}
      style={styles.container}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <MessageContainer />
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
    height: '45%',
    alignItems: 'center',
    justifyContent: 'space-around',
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
