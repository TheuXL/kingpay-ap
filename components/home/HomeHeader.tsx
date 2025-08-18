import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AccountSwitcher from './AccountSwitcher';
import HandshakeIcon from '../../images/home/icon handshake.svg';
import VisibilityIcon from '../../images/home/icon visibility.svg';
import { Colors } from '@/constants/Colors';

export default function HomeHeader({
  balanceVisible,
  setBalanceVisible,
}: {
  balanceVisible: boolean;
  setBalanceVisible: (visible: boolean) => void;
}) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.userButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.userName}>Olá, Gabriel!</Text>
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={() => setBalanceVisible(!balanceVisible)}>
          <VisibilityIcon width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(app)/affiliate-panel')}>
          <HandshakeIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <AccountSwitcher visible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray['03'],
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  iconsContainer: {
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: Colors.gray['03'],
  },
});
