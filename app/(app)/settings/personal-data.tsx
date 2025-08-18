import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EditIcon from '@/images/configurações/edit.svg';
import { Ionicons } from '@expo/vector-icons';
import ProfileImage from '@/images/configurações/Profile Image Container.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function PersonalDataScreen() {
  const router = useRouter();

  const fields = [
    { label: 'Nome completo', value: 'Gabriel Sobral dos Santos' },
    { label: 'Email', value: 'gabrielsantos@gmail.com' },
    { label: 'Telefone', value: '+55 (11) 9 1234-5678' },
    { label: 'CPF', value: '012.123.456-70' },
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
            <ProfileImage />
          </View>
          <Text style={styles.profileName}>Gabriel Sobral dos Santos</Text>
          <Text style={styles.profileId}>69635d93-560a-4161-8a46-67e4eb58c</Text>
        </View>

        <View style={styles.formSection}>
          <Text style={styles.formSectionTitle}>Informações pessoais</Text>
          <Text style={styles.formSectionSubtitle}>Atualize seus dados pessoais</Text>
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
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  profileId: {
    fontSize: 14,
    color: 'gray',
  },
  formSection: {
    marginHorizontal: 20,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  formSectionSubtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
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
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
