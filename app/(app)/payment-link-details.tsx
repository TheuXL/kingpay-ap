import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CancelarLinkIcon from '@/images/link de pagamento/Icon cancelar link.svg';
import LinksIcon from '@/images/link de pagamento/Icon links.svg';
import CopiarLinkIcon from '@/images/link de pagamento/Copy Icon Container.svg';
import LinkAtivoIcon from '@/images/link de pagamento/link ativo.svg';
import SendIcon from '@/images/link de pagamento/Send Icon.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';

export default function PaymentLinkDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do link</Text>
      </View>
      <ScrollView style={styles.scrollView}>
       
        <View style={styles.card}>

 <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <LinksIcon width={56} height={56} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <SendIcon width={56} height={56} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <CancelarLinkIcon width={56} height={56} />
          </TouchableOpacity>
        </View>

          <View style={styles.productHeader}>
            <Text style={styles.productValue}>R$ 34,90</Text>
            <LinkAtivoIcon />
          </View>
          <Text style={styles.productName}>Capa Notebook Acer Nitro 5</Text>
          <Text style={styles.productDate}>Criado em 22 de julho de 2025 às 11:33h.</Text>
          <View style={styles.paymentMethods}>
            <Text style={styles.paymentMethod}>Pix</Text>
            <Text style={styles.paymentMethod}>Cartão</Text>
            <Text style={styles.paymentMethod}>Boleto</Text>
          </View>
          <Text style={styles.description}>
            A Capa Survivor para Notebook da Gshield oferece mais do que apenas proteção para o seu dispositivo - é um escudo que...
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>Ver mais</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.card}>
          <Text style={styles.paymentLinkTitle}>Link de pagamento</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>https://app.kingpaybr.com/pay/27a8d0f5-8967-42c5-8f45-c51d4b377748</Text>
            <TouchableOpacity style={styles.copyButton}>
              <CopiarLinkIcon />
            </TouchableOpacity>
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
    backgroundColor: 'white',
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
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
  },
  card: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  activeBadgeText: {
    color: '#10B981',
    fontSize: 12,
    marginLeft: 4,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
  },
  productDate: {
    fontSize: 14,
    color: '#64748B',
    marginVertical: 8,
  },
  paymentMethods: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  paymentMethod: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    fontSize: 12,
    color: '#64748B',
  },
  description: {
    fontSize: 14,
    color: '#64748B',
    marginVertical: 8,
  },
  seeMore: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  paymentLinkTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 16,
  },
  linkText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
});