import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import * as LucideIcons from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentLinkDetailsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Link de Pagamento</Text>
      </View>
      <ScrollView style={styles.scrollView}>
       
        <View style={styles.card}>

 <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="link-outline" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <LucideIcons.Link2Off color="red" size={24} />
          </TouchableOpacity>
        </View>

          <View style={styles.productHeader}>
            <Text style={styles.productValue}>R$ 34,90</Text>
            <View style={styles.activeBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#10B981" />
              <Text style={styles.activeBadgeText}>Ativo</Text>
            </View>
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
              <Ionicons name="copy-outline" size={24} color="white" />
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    padding: 16,
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
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 8,
    marginLeft: 8,
  },
});