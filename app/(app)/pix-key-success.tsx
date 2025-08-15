import { Stack, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PixKeySuccess() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={require('../../assets/images/background-success.png')} style={styles.backgroundImage} />
      <View style={styles.content}>
        <Text style={styles.title}>Sua chave foi registrada com sucesso.</Text>
        <Text style={styles.subtitle}>Copie a chave abaixo e comece a receber pagamentos.</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/(app)/home')}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#FFF',
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});