import { FontAwesome5 } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert, TextInput, Modal } from 'react-native';
import CelularIcon from '../../images/Area Pix/celular.svg';
import ChaveAleatoriaIcon from '../../images/Area Pix/chave aleatoria.svg';
import CnpjIcon from '../../images/Area Pix/cnpj.svg';
import CpfIcon from '../../images/Area Pix/cpf.svg';
import EmailIcon from '../../images/Area Pix/email.svg';
import { usePixKeys } from '../../hooks/usePixKeys';

const keyIcons = {
  'RANDOM': <ChaveAleatoriaIcon width={40} height={40} />,
  'CNPJ': <CnpjIcon width={40} height={40} />,
  'PHONE': <CelularIcon width={40} height={40} />,
  'EMAIL': <EmailIcon width={40} height={40} />,
  'CPF': <CpfIcon width={40} height={40} />,
};

const keyTypeLabels = {
  'RANDOM': 'Chave aleatória',
  'CNPJ': 'CNPJ',
  'PHONE': 'Celular',
  'EMAIL': 'Email',
  'CPF': 'CPF',
};

const keyTypePlaceholders = {
  'RANDOM': 'Digite a chave aleatória',
  'CNPJ': 'Digite o CNPJ (ex: 12.345.678/0001-90)',
  'PHONE': 'Digite o celular (ex: (11) 99999-9999)',
  'EMAIL': 'Digite o email (ex: seu@email.com)',
  'CPF': 'Digite o CPF (ex: 123.456.789-00)',
};

export default function RegisterPixKey() {
  const router = useRouter();
  const { createPixKey, pixKeys } = usePixKeys();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [keyValue, setKeyValue] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const keyTypes = [
    { type: 'RANDOM' as const, name: 'Chave aleatória' },
    { type: 'CNPJ' as const, name: 'CNPJ' },
    { type: 'PHONE' as const, name: 'Celular' },
    { type: 'EMAIL' as const, name: 'Email' },
    { type: 'CPF' as const, name: 'CPF' },
  ];

  const isKeyTypeRegistered = (type: string) => {
    return pixKeys.some(key => key.type === type);
  };

  const handleKeyTypePress = (type: string) => {
    if (isKeyTypeRegistered(type)) {
      Alert.alert(
        'Chave já registrada',
        `Você já possui uma chave ${keyTypeLabels[type as keyof typeof keyTypeLabels]} registrada.`,
        [{ text: 'OK' }]
      );
      return;
    }

    setSelectedType(type);
    setKeyValue('');
    setDescription('');
    setModalVisible(true);
  };

  const handleCreateKey = async () => {
    if (!keyValue.trim()) {
      Alert.alert('Erro', 'Por favor, digite a chave PIX.');
      return;
    }

    setIsLoading(true);

    try {
      const success = await createPixKey({
        key: keyValue.trim(),
        type: selectedType as any,
        description: description.trim() || undefined,
      });

      if (success) {
        Alert.alert(
          'Sucesso',
          'Chave PIX registrada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                setModalVisible(false);
                router.back();
              },
            },
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível registrar a chave PIX. Tente novamente.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

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
            style={[
              styles.keyTypeButton,
              isKeyTypeRegistered(keyType.type) && styles.keyTypeButtonDisabled
            ]}
            onPress={() => handleKeyTypePress(keyType.type)}
            disabled={isKeyTypeRegistered(keyType.type)}
          >
            <View style={styles.keyTypeIconContainer}>
              {keyIcons[keyType.type]}
            </View>
            <View style={styles.keyTypeInfo}>
              <Text style={[
                styles.keyTypeName,
                isKeyTypeRegistered(keyType.type) && styles.keyTypeNameDisabled
              ]}>
                {keyType.name}
              </Text>
              {isKeyTypeRegistered(keyType.type) && (
                <Text style={styles.keyTypeRegistered}>Já registrada</Text>
              )}
            </View>
            {!isKeyTypeRegistered(keyType.type) && (
              <FontAwesome5 name="plus" size={16} color="#2F05E0" />
            )}
            {isKeyTypeRegistered(keyType.type) && (
              <FontAwesome5 name="check" size={16} color="#28a745" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Registrar {keyTypeLabels[selectedType as keyof typeof keyTypeLabels]}
            </Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Chave PIX</Text>
              <TextInput
                style={styles.input}
                placeholder={keyTypePlaceholders[selectedType as keyof typeof keyTypePlaceholders]}
                value={keyValue}
                onChangeText={setKeyValue}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Descrição (opcional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Digite uma descrição para a chave"
                value={description}
                onChangeText={setDescription}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.createButton, isLoading && styles.createButtonDisabled]}
                onPress={handleCreateKey}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Text style={styles.createButtonText}>Registrando...</Text>
                ) : (
                  <Text style={styles.createButtonText}>Registrar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  keyTypeButtonDisabled: {
    opacity: 0.7,
  },
  keyTypeIconContainer: {
    marginRight: 15,
  },
  keyTypeInfo: {
    flex: 1,
  },
  keyTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  keyTypeNameDisabled: {
    color: '#6c757d',
  },
  keyTypeRegistered: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#6c757d',
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});