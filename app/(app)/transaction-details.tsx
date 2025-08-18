import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import GerarComprovanteIcon from '../../images/transações/Icon Gerar Comporvante.svg';
import EstornarIcon from '../../images/transações/Icon Estornar.svg';
import AguardandoIcon from '../../images/transações/icon aguardando.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function TransactionDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes da transação</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonIconContainer}>
              <GerarComprovanteIcon width={70} height={70} />
            </View>
            <Text style={styles.buttonText}>Gerar comprovante</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonIconContainer}>
              <EstornarIcon width={70} height={70} />
            </View>
            <Text style={styles.buttonText}>Estornar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Detalhes do Pagamento</Text>
          </View>
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentAmount}>R$ 48,00</Text>
            <View style={styles.paidBadge}>
              <Text style={styles.paidBadgeText}>Pago</Text>
            </View>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentInfoLabel}>Método</Text>
            <Text style={styles.paymentInfoValue}>Pix</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentInfoLabel}>Parcelas</Text>
            <Text style={styles.paymentInfoValue}>1x</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentInfoLabel}>Taxa</Text>
            <Text style={styles.paymentInfoValue}>R$ 3,00</Text>
          </View>
          <View style={styles.paymentInfo}>
            <Text style={styles.paymentInfoLabel}>Valor Líquido</Text>
            <Text style={styles.paymentInfoValue}>R$ 45,00</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Status da entrega</Text>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.statusIconContainer}>
              <AguardandoIcon width={50} height={50} />
            </View>
            <View>
              <Text style={styles.statusText}>Aguardando</Text>
              <Text style={styles.statusDate}>Atualizado em 8 de junho.</Text>
            </View>
          </View>
        </View>
        <View style={styles.cardinfo}>
          <Text style={styles.cardTitle}>Cliente</Text>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoLabel}>Nome</Text>
            <Text style={styles.clientInfoValue}>José da Silva Figueiredo Júnior</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoLabel}>Email</Text>
            <Text style={styles.clientInfoValue}>josefigueiredo@gmail.com</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoLabel}>Telefone</Text>
            <Text style={styles.clientInfoValue}>+55 (31) 9 5475-8902</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text style={styles.clientInfoLabel}>Endereço</Text>
            <Text style={styles.clientInfoValue}>Rua dos Limoeiros, 189, Centro, Santos - SP 35500-212</Text>
          </View>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
  },
  buttonIconContainer: {
    marginBottom: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  paymentDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  paymentAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginRight: 8,
  },
  paidBadge: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  paidBadgeText: {
    color: '#0acf35ff',
    fontSize: 12,
  },
  paymentInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentInfoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  paymentInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIconContainer: {
    marginRight: 16,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  statusDate: {
    fontSize: 14,
    color: '#64748B',
  },
  cardinfo: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 20,
    marginBottom: 100,
  },
  clientInfo: {
    marginBottom: 16,
  },
  clientInfoLabel: {
    fontSize: 14,
    color: '#64748B',
  },
  clientInfoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});