import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SetaSaqueIcon from '../../images/home/seta Solicita saque.svg';
import { Colors } from '../../constants/Colors';

export default function BalanceCard({ balanceVisible }: { balanceVisible: boolean }) {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Saldo disponível</Text>
      </View>
      <Text style={styles.balanceText}>{balanceVisible ? 'R$ 138.241,45' : '*******'}</Text>
      <TouchableOpacity style={styles.withdrawButton} onPress={() => router.push('/request-withdraw' as any)}>
        <Text style={styles.withdrawButtonText}>Solicitar Saque</Text>
        <SetaSaqueIcon />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.blue['01'],
    padding: 20,
    borderRadius: 20,
    // marginHorizontal: 20,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 16,
  },
  balanceText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 50,
  },
  withdrawButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  withdrawButtonText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
  },
});
