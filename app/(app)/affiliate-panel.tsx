import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AffiliatePanelScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel de afiliados</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </View>
          <Text style={styles.balanceValue}>R$ 341,34</Text>
          <TouchableOpacity style={styles.transferButton}>
            <Text style={styles.transferButtonText}>Transferir para carteira</Text>
            <Ionicons name="swap-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="cash-outline" size={24} color="#1E293B" />
            <Text style={styles.statLabel}>Total ganho</Text>
            <Text style={styles.statValue}>R$ 3.133,45</Text>
            <Text style={styles.statSubLabel}>Total sacado: R$ 2.792,11</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="business-outline" size={24} color="#1E293B" />
            <Text style={styles.statLabel}>Empresas indicadas</Text>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statSubLabel}>Média por indicação: R$ 0,00</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="arrow-up-outline" size={24} color="#1E293B" />
            <Text style={styles.statLabel}>Último saque</Text>
            <Text style={styles.statValue}>R$ 703,09</Text>
            <Text style={styles.statSubLabel}>Realizado em: 03/08/2025</Text>
          </View>
        </ScrollView>
        <View style={styles.affiliateLinkCard}>
          <Text style={styles.affiliateLinkTitle}>Seu link de afiliado</Text>
          <Text style={styles.affiliateLinkDescription}>Compartilhe este link com outras empresas e ganhe comissão.</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>https://app.kingpaybr.com?ref=REN00000</Text>
            <TouchableOpacity style={styles.copyButton}>
              <Ionicons name="copy-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.historySection}>
          <Text style={styles.historyTitle}>Histórico</Text>
          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyType}>Recebido</Text>
              <Text style={styles.historyDescription}>Lumance Tecnologia e Pagamentos</Text>
            </View>
            <View style={styles.historyAmountContainer}>
              <Text style={styles.historyDate}>Hoje</Text>
              <Text style={styles.historyAmount}>+ R$ 308,12</Text>
            </View>
          </View>
          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyType}>Recebido</Text>
              <Text style={styles.historyDescription}>Outlast</Text>
            </View>
            <View style={styles.historyAmountContainer}>
              <Text style={styles.historyDate}>Ontem</Text>
              <Text style={styles.historyAmount}>+ R$ 708,99</Text>
            </View>
          </View>
          <View style={styles.historyItem}>
            <View style={styles.historyIconContainer}>
              <Ionicons name="arrow-down" size={24} color="#10B981" />
            </View>
            <View style={styles.historyDetails}>
              <Text style={styles.historyType}>Recebido</Text>
              <Text style={styles.historyDescription}>Meanwhile Tech</Text>
            </View>
            <View style={styles.historyAmountContainer}>
              <Text style={styles.historyDate}>08 de Ago</Text>
              <Text style={styles.historyAmount}>+ R$ 506,67</Text>
            </View>
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
  balanceCard: {
    backgroundColor: '#165aecff',
    borderRadius: 12,
    padding: 30,
    marginBottom: 40,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'white',
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
    marginBottom: 80,
  },
  transferButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transferButtonText: {
    fontSize: 16,
    color: 'white',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  statCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 20,
    width: 250,
    alignItems: 'center',
    marginRight: 20,
  },
  statLabel: {
    fontSize: 18,
    color: '#64748B',
    marginTop: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginVertical: 4,
  },
  statSubLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  affiliateLinkCard: {
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 20,
    marginBottom: 40,
    height: 300,
  },
  affiliateLinkTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 5,
  },
  affiliateLinkDescription: {
    fontSize: 17,
    color: '#64748B',
    marginVertical: 8,
    marginBottom: 28,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  },
  historySection: {
    marginTop: 20,
    marginBottom: 130,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  historyIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  historyDetails: {
    flex: 1,
  },
  historyType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  historyDescription: {
    fontSize: 14,
    color: '#64748B',
  },
  historyAmountContainer: {
    alignItems: 'flex-end',
  },
  historyDate: {
    fontSize: 14,
    color: '#64748B',
  },
  historyAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
});