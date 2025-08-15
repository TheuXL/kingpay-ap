import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PixArea() {
  const router = useRouter();

  const registeredKeys = [
    {
      type: 'Chave aleatória',
      key: 'v9KpW7m3zLUYqXrj2FbCn8sTMAZ1hdEOXlgkB5JiIPuRQcf0ts',
      icon: <FontAwesome5 name="key" size={24} color="#333" />,
    },
    {
      type: 'Celular',
      key: '(31) 99877-4567',
      icon: <MaterialCommunityIcons name="cellphone" size={24} color="#333" />,
    },
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
        <Text style={styles.title}>Minhas Chaves</Text>
        <Text style={styles.subtitle}>Gerencie suas chaves PIX cadastradas</Text>

        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/(app)/register-pix-key')}>
          <Text style={styles.registerButtonText}>Registrar nova chave</Text>
          <FontAwesome5 name="plus" size={16} color="white" />
        </TouchableOpacity>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information-outline" size={24} color="#333" style={styles.infoIcon} />
          <Text style={styles.infoText}>
            Cadastre suas chaves PIX para receber transferências instantâneas. Cada tipo de chave pode ser cadastrado apenas uma vez.
          </Text>
        </View>

        <Text style={styles.registeredKeysCount}>2 de 2 chaves registradas</Text>

        {registeredKeys.map((item, index) => (
          <View key={index} style={styles.keyItem}>
            <View style={styles.keyIconContainer}>{item.icon}</View>
            <View style={styles.keyDetails}>
              <Text style={styles.keyType}>{item.type}</Text>
              <Text style={styles.keyValue}>{item.key}</Text>
            </View>
            <TouchableOpacity style={styles.moreOptions}>
              <MaterialCommunityIcons name="dots-vertical" size={24} color="#6c757d" />
            </TouchableOpacity>
          </View>
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
  registerButton: {
    backgroundColor: '#2F05E0',
    paddingVertical: 18,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoBox: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  registeredKeysCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  keyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  keyIconContainer: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 30,
    marginRight: 15,
  },
  keyDetails: {
    flex: 1,
  },
  keyType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  keyValue: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 3,
    flexShrink: 1,
  },
  moreOptions: {
    padding: 5,
  },
});