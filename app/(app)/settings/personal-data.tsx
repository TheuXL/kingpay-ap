import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert, Image } from 'react-native';
import { useState } from 'react';
import EditIcon from '@/images/configurações/edit.svg';
import { Ionicons } from '@expo/vector-icons';
import ProfileImage from '@/images/configurações/Profile Image Container.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { useUserData } from '@/hooks/useUserData';
import { useAuth } from '@/contexts/AuthContext';

export default function PersonalDataScreen() {
  const router = useRouter();
  const { userData, loading, error, updateUserData } = useUserData();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    fullname: '',
    phone: '',
    document: '',
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const formatDocument = (document: string) => {
    if (!document) return '';
    // Formata CPF: 123.456.789-00
    if (document.length === 11) {
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    // Formata CNPJ: 12.345.678/0001-90
    if (document.length === 14) {
      return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return document;
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '';
    // Remove todos os caracteres não numéricos
    const numbers = phone.replace(/\D/g, '');
    
    // Formata telefone brasileiro
    if (numbers.length === 11) {
      return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    if (numbers.length === 10) {
      return `+55 (${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return phone;
  };

  // Verificar se o usuário tem foto
  const hasUserPhoto = !!userData?.foto;

  const handleEdit = () => {
    if (userData) {
      setEditData({
        fullname: userData.fullname || '',
        phone: userData.phone || '',
        document: userData.document || '',
      });
      setIsEditing(true);
    }
  };

  const handleSave = async () => {
    if (!editData.fullname.trim()) {
      Alert.alert('Erro', 'Nome completo é obrigatório.');
      return;
    }

    setUpdateLoading(true);
    try {
      const result = await updateUserData(editData);
      if (result?.success) {
        Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
        setIsEditing(false);
      } else {
        Alert.alert('Erro', result?.error || 'Erro ao atualizar dados');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro inesperado ao atualizar dados');
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      fullname: '',
      phone: '',
      document: '',
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando dados...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle" size={48} color={Colors.red['01']} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => window.location.reload()}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const fields = [
    { label: 'Nome completo', value: userData?.fullname || 'Não informado' },
    { label: 'Email', value: userData?.email || user?.email || 'Não informado' },
    { label: 'Telefone', value: formatPhone(userData?.phone || '') || 'Não informado' },
    { label: 'CPF', value: formatDocument(userData?.document || '') || 'Não informado' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.title}>Meus Dados</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {hasUserPhoto ? (
              <Image 
                source={{ uri: userData?.foto! }} 
                style={styles.userPhoto}
              />
            ) : (
              <ProfileImage />
            )}
          </View>
          <Text style={styles.profileName}>{userData?.fullname || user?.email || 'Usuário'}</Text>
          <Text style={styles.profileId}>{userData?.id || user?.id || 'ID não disponível'}</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Informações pessoais</Text>
          <Text style={styles.formSectionSubtitle}>Atualize seus dados pessoais</Text>
          
          {!isEditing ? (
            <>
              {fields.map((field, index) => (
                <View key={index} style={styles.inputContainer}>
                  <Text style={styles.label}>{field.label}</Text>
                  <View style={styles.inputWrapper}>
                    <TextInput 
                      style={styles.input} 
                      value={field.value}
                      editable={false}
                      placeholderTextColor={Colors.gray['02']}
                    />
                    {field.label !== 'Email' && (
                      <TouchableOpacity onPress={handleEdit}>
                        <EditIcon />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              ))}
            </>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Nome completo</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={editData.fullname}
                    onChangeText={(text) => setEditData({...editData, fullname: text})}
                    placeholder="Digite seu nome completo"
                    placeholderTextColor={Colors.gray['02']}
                  />
                </View>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Telefone</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={editData.phone}
                    onChangeText={(text) => setEditData({...editData, phone: text})}
                    placeholder="Digite seu telefone"
                    placeholderTextColor={Colors.gray['02']}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>
              
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CPF</Text>
                <View style={styles.inputWrapper}>
                  <TextInput 
                    style={styles.input} 
                    value={editData.document}
                    onChangeText={(text) => setEditData({...editData, document: text})}
                    placeholder="Digite seu CPF"
                    placeholderTextColor={Colors.gray['02']}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.editButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.editButton, styles.cancelButton]} 
                  onPress={handleCancel}
                  disabled={updateLoading}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.editButton, styles.saveButton]} 
                  onPress={handleSave}
                  disabled={updateLoading}
                >
                  {updateLoading ? (
                    <ActivityIndicator size="small" color={Colors.white['01']} />
                  ) : (
                    <Text style={styles.saveButtonText}>Salvar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.gray['01'],
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    paddingHorizontal: 32,
  },
  errorText: {
    marginTop: 16,
    fontSize: 16,
    color: Colors.red['01'],
    textAlign: 'center',
    marginBottom: 24,
  },
  retryButton: {
    backgroundColor: Colors.blue['01'],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  profileId: {
    fontSize: 14,
    color: Colors.gray['01'],
  },
  formSection: {
    marginHorizontal: 20,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.black['01'],
  },
  editButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: Colors.gray['03'],
  },
  saveButton: {
    backgroundColor: Colors.blue['01'],
  },
  cancelButtonText: {
    color: Colors.black['01'],
    fontSize: 16,
    fontWeight: '600',
  },
  saveButtonText: {
    color: Colors.white['01'],
    fontSize: 16,
    fontWeight: '600',
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
});
