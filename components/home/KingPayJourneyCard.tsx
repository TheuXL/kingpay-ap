import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BaraJornadaIcon from '../../images/home/bara jornada kingpay.svg';
import JourneyIcon from '../../images/home/icon jornada kingpay.svg';

export default function KingPayJourneyCard({ balanceVisible }: { balanceVisible: boolean }) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/kingpay-journey')}>
      <View style={styles.iconContainer}>
        <JourneyIcon width={50} height={50} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Jornada KingPay</Text>
        </View>
        <Text style={styles.progressText}>
          {balanceVisible ? (
            <>
              <Text style={styles.progressValue}>R$ 8.974,00</Text>
              <Text style={styles.progressTotal}> / 10.000,00</Text>
            </>
          ) : (
            '*******'
          )}
        </Text>
        <BaraJornadaIcon width={'100%'} style={{ marginTop: 10 }} />
      </View>
      <Ionicons name="chevron-forward" size={24} color="#4A90E2" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA', // Cor de fundo do card
    padding: 15,
    borderRadius: 20,
    marginTop: 30,
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  progressValue: {
    fontWeight: 'bold',
    color: '#000',
  },
  progressTotal: {
    color: '#666',
  },
  chevron: {
    marginLeft: 10,
  },
});
