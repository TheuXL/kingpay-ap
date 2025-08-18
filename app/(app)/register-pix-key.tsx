import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CelularIcon from '../../images/Area Pix/celular.svg';
import ChaveAleatoriaIcon from '../../images/Area Pix/chave aleatoria.svg';
import CnpjIcon from '../../images/Area Pix/cnpj.svg';
import CpfIcon from '../../images/Area Pix/cpf.svg';
import EmailIcon from '../../images/Area Pix/email.svg';

const keyIcons = {
  'Chave aleatória': <ChaveAleatoriaIcon width={40} height={40} />,
  'CNPJ': <CnpjIcon width={40} height={40} />,
  'Celular': <CelularIcon width={40} height={40} />,
  'Email': <EmailIcon width={40} height={40} />,
  'CPF': <CpfIcon width={40} height={40} />,
};

export default function RegisterPixKey() {
  const router = useRouter();

  const keyTypes = [
    { name: 'Chave aleatória' as const, screen: '' },
    { name: 'CNPJ' as const, screen: '' },
    { name: 'Celular' as const, screen: '/(app)/register-phone' },
    { name: 'Email' as const, screen: '' },
    { name: 'CPF' as const, screen: '' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Área Pix',
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerTintColor: '#000',
        }}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Registrar nova chave</Text>
        <Text style={styles.subtitle}>Cadastre uma nova chave PIX para receber transferências</Text>

        {keyTypes.map((keyType, index) => (
          <TouchableOpacity
            key={index}
            style={styles.keyTypeButton}
            onPress={() => keyType.screen && router.push(keyType.screen as any)}
          >
            <View style={styles.keyTypeIconContainer}>{keyIcons[keyType.name]}</View>
            <Text style={styles.keyTypeName}>{keyType.name}</Text>
            <FontAwesome5 name="plus" size={16} color="#2F05E0" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 24,
  },
  keyTypeButton: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  keyTypeIconContainer: {
    marginRight: 15,
  },
  keyTypeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});