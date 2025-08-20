import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import NotificationsIcon from '../../images/home/Notifications Icon.svg';
import ContaAtualIcon from '../../images/home/icon conta atual perfil.svg';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../hooks/useUserData';
import { useSubcontas } from '../../hooks/useSubcontas';
import { getFirstName } from '../../services/api';

interface AccountSwitcherProps {
  visible: boolean;
  onClose: () => void;
}

export default function AccountSwitcher({ visible, onClose }: AccountSwitcherProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { userData } = useUserData();
  const { subcontas, isLoading: subcontasLoading } = useSubcontas();

  // Extrair primeiro nome do usuário
  const getUserName = (): string => {
    if (userData?.fullname) {
      return getFirstName(userData.fullname);
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'Usuário';
  };

  const currentAccount = {
    name: getUserName(),
    type: 'Conta empresarial',
    hasPhoto: !!userData?.foto,
    photoUrl: userData?.foto,
  };

  // Usar dados reais das subcontas
  const otherAccounts = subcontas.map((subconta) => ({
    name: subconta.name,
    type: subconta.type,
    icon: <ContaAtualIcon width={50} height={50} />, // Usar ícone padrão para todas as subcontas
  }));

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(app)/notifications')}>
              <NotificationsIcon width={40} height={40} />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Conta atual</Text>
          <TouchableOpacity style={styles.currentAccount}>
            {currentAccount.hasPhoto ? (
              <Image 
                source={{ uri: currentAccount.photoUrl! }} 
                style={styles.userPhoto}
              />
            ) : (
              <ContaAtualIcon width={50} height={50} />
            )}
            <View>
              <Text style={styles.accountName}>{currentAccount.name}</Text>
              <Text style={styles.accountType}>{currentAccount.type}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Outras contas</Text>
          {subcontasLoading ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Carregando contas...</Text>
            </View>
          ) : otherAccounts.length > 0 ? (
            otherAccounts.map((account, index) => (
              <TouchableOpacity key={index} style={styles.otherAccount}>
                {account.icon}
                <View>
                  <Text style={styles.otherAccountName}>{account.name}</Text>
                  <Text style={styles.otherAccountType}>{account.type}</Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="blue" />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Nenhuma conta vinculada encontrada</Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  notificationButton: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  currentAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  accountName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  accountType: {
    color: 'white',
    fontSize: 14,
  },
  otherAccount: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    justifyContent: 'space-between',
  },
  otherAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  otherAccountName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  otherAccountType: {
    fontSize: 14,
    color: 'gray',
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    fontSize: 14,
    color: 'gray',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: 'gray',
  },
});
