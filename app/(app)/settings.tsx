import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import { getFirstName } from '@/services/api';

import ProfileImage from '@/images/configurações/Profile Image Container.svg';
import EditIcon from '@/images/configurações/edit.svg';
import MeusDadosIcon from '@/images/configurações/Icon meus dados.svg';
import DadosEmpresaIcon from '@/images/configurações/Icon dados da empresa.svg';
import TaxasIcon from '@/images/configurações/Icon taxas.svg';
import SairContaIcon from '@/images/configurações/Icon sair da conta.svg';
import BackIcon from '@/images/icon_back.svg';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout, user } = useAuth();
  const { userData } = useUserData();

  const handleLogout = () => {
    Alert.alert(
      'Sair da Conta',
      'Tem certeza que deseja sair da sua conta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const infoItems = [
    {
      icon: <MeusDadosIcon />,
      label: 'Meus dados',
      screen: '/settings/personal-data',
    },
    {
      icon: <DadosEmpresaIcon />,
      label: 'Dados da empresa',
      screen: '/settings/company-data',
    },
    {
      icon: <TaxasIcon />,
      label: 'Taxas',
      screen: '/settings/rates',
    },
    {
      icon: <SairContaIcon />,
      label: 'Sair da conta',
      onPress: handleLogout,
      textColor: Colors.red['01'],
    },
  ];

  const getUserDisplayName = () => {
    if (userData?.fullname) {
      return getFirstName(userData.fullname);
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email;
    }
    return 'Usuário';
  };

  // Verificar se o usuário tem foto
  const hasUserPhoto = !!userData?.foto;

  const getUserDisplayId = () => {
    if (userData?.id) {
      return userData.id;
    }
    if (user?.id) {
      return user.id;
    }
    return 'ID não disponível';
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <ThemedView style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Configurações</ThemedText>
          <View style={{ width: 24 }} />
        </ThemedView>

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
          <Text style={styles.profileName}>
            {getUserDisplayName()}
          </Text>
          <Text style={styles.profileId}>ID: {getUserDisplayId()}</Text>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informações</Text>
          {infoItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.infoItem}
              onPress={item.onPress || (() => item.screen && router.push(item.screen as any))}
            >
              <View style={styles.infoItemContent}>
                {item.icon}
                <Text style={[styles.infoItemText, { color: item.textColor || Colors.black['02'] }]}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color={item.textColor || Colors.blue['01']} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['03'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: Colors.white['03'],
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black['01'],
  },
  profileCard: {
    backgroundColor: Colors.white['02'],
    borderRadius: 15,
    padding: 20,
    margin: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  userPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black['01'],
  },
  profileId: {
    fontSize: 14,
    color: Colors.gray['01'],
    marginTop: 4,
  },
  infoSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.gray['01'],
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    marginBottom: 12,
  },
  infoItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoItemText: {
    fontSize: 16,
    marginLeft: 16,
  },
  iconContainer: {
    backgroundColor: Colors.white['02'],
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});
