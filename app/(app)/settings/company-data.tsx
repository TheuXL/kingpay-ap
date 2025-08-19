import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import EditIcon from '@/images/configurações/edit.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { useCompanyData } from '@/hooks/useCompanyData';

export default function CompanyDataScreen() {
  const router = useRouter();
  const { companyData, loading, error } = useCompanyData();

  const formatDocument = (document: string) => {
    if (!document) return '';
    // Formata CNPJ: 12.345.678/0001-90
    if (document.length === 14) {
      return document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    // Formata CPF: 123.456.789-00
    if (document.length === 11) {
      return document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return document;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando dados da empresa...</Text>
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
    { label: 'Razão Social', value: companyData?.name || 'Não informado' },
    { label: 'Nome Fantasia', value: companyData?.fantasy_name || 'Não informado' },
    { label: 'CNPJ', value: formatDocument(companyData?.taxid || '') || 'Não informado' },
    { label: 'Website', value: companyData?.website || 'Não informado' },
    { label: 'Endereço', value: companyData?.address?.street || 'Não informado' },
    { label: 'Número', value: companyData?.address?.number || 'Não informado' },
    { label: 'Bairro', value: companyData?.address?.neighborhood || 'Não informado' },
    { label: 'Cidade', value: companyData?.address?.city || 'Não informado' },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Dados da empresa</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Dados da empresa</Text>
          <Text style={styles.formSectionSubtitle}>Atualize as informações da sua empresa.</Text>
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
                <TouchableOpacity onPress={() => Alert.alert('Editar', 'Funcionalidade de edição será implementada em breve.')}>
                  <EditIcon />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
    color: Colors.black['01'],
  },
  formSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  formSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.black['01'],
    marginBottom: 8,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginBottom: 25,
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
});
