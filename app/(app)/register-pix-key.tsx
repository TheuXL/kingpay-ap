import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RegisterPixKey() {
  const router = useRouter();

  const keyTypes = [
    { name: 'Chave aleatória', icon: <FontAwesome5 name="key" size={24} color="#333" />, screen: '' },
    { name: 'CNPJ', icon: <MaterialCommunityIcons name="office-building" size={24} color="#333" />, screen: '' },
    { name: 'Celular', icon: <MaterialCommunityIcons name="cellphone" size={24} color="#333" />, screen: '/(app)/register-phone' },
    { name: 'Email', icon: <MaterialCommunityIcons name="email" size={24} color="#333" />, screen: '' },
    { name: 'CPF', icon: <MaterialCommunityIcons name="account-box" size={24} color="#333" />, screen: '' },
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
            <View style={styles.keyTypeIconContainer}>{keyType.icon}</View>
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
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 30,
    marginRight: 15,
  },
  keyTypeName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});