import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EditIcon from '@/images/configurações/edit.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function CompanyDataScreen() {
  const router = useRouter();

  const fields = [
    { label: 'Razão Social', value: 'Soutech LTDA' },
    { label: 'Nome Fantasia', value: '' },
    { label: 'CNPJ', value: '12.345.678/0001-01' },
    { label: 'Website', value: '' },
    { label: 'Endereço', value: 'Rua dos Palmares' },
    { label: 'Número', value: '81' },
    { label: 'Bairro', value: 'Laranjeiras' },
    { label: 'Cidade', value: 'São Paulo' },
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
                <TextInput style={styles.input} value={field.value} />
                <TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: '#fff',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  formSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 8,
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: 'gray',
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
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
