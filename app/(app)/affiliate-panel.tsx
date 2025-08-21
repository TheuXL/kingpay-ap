import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import TotalGanhoIcon from '@/images/painel de afiliados/icon total de ganho.svg';
import EmpresasIcon from '@/images/painel de afiliados/icon empresas indicadas.svg';
import UltimoSaqueIcon from '@/images/painel de afiliados/utimo saque.svg';
import CopyIcon from '@/images/painel de afiliados/Copy Icon Container.svg';
import BackIcon from '@/images/icon_back.svg';
import { useAffiliateData } from '@/hooks/useAffiliateData';

export default function AffiliatePanelScreen() {
  const router = useRouter();
  const { 
    affiliateCode, 
    affiliateReport, 
    isLoading, 
    error, 
    requestWithdraw 
  } = useAffiliateData();

  // Função para formatar valores em reais
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // Converter de centavos para reais
  };

  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Função para copiar link de afiliado
  const copyAffiliateLink = () => {
    if (affiliateCode) {
      const link = `https://app.kingpaybr.com?ref=${affiliateCode}`;
      // Aqui você pode implementar a funcionalidade de copiar para clipboard
      Alert.alert('Link copiado!', 'O link de afiliado foi copiado para a área de transferência.');
    }
  };

  // Função para solicitar transferência para carteira
  const handleTransferToWallet = async () => {
    if (!affiliateReport?.summary.current_balance_cents || affiliateReport.summary.current_balance_cents <= 0) {
      Alert.alert('Saldo insuficiente', 'Você não possui saldo disponível para transferir.');
      return;
    }

    Alert.alert(
      'Confirmar transferência',
      `Deseja transferir ${formatCurrency(affiliateReport.summary.current_balance_cents)} para sua carteira?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            const success = await requestWithdraw(affiliateReport.summary.current_balance_cents);
            if (success) {
              Alert.alert('Sucesso!', 'Transferência realizada com sucesso.');
            } else {
              Alert.alert('Erro', 'Erro ao realizar transferência. Tente novamente.');
            }
          },
        },
      ]
    );
  };

  // Mostrar loading se estiver carregando
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Painel de afiliados</Text>
        </View>
        <View style={[styles.scrollView, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color={Colors.blue['01']} />
          <Text style={{ marginTop: 16, color: Colors.gray['01'] }}>Carregando dados...</Text>
        </View>
      </View>
    );
  }

  // Mostrar erro se houver
  if (error) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Painel de afiliados</Text>
        </View>
        <View style={[styles.scrollView, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: 'red', textAlign: 'center' }}>Erro: {error}</Text>
          <TouchableOpacity 
            style={{ marginTop: 16, padding: 12, backgroundColor: Colors.blue['01'], borderRadius: 8 }}
            onPress={() => router.back()}
          >
            <Text style={{ color: 'white' }}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel de afiliados</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.balanceCard}>
          <View style={styles.balanceHeader}>
            <Text style={styles.balanceLabel}>Saldo disponível</Text>
            <Ionicons name="ellipsis-horizontal" size={24} color="white" />
          </View>
          <Text style={styles.balanceValue}>
            {affiliateReport ? formatCurrency(affiliateReport.summary.current_balance_cents) : 'R$ 0,00'}
          </Text>
          <TouchableOpacity style={styles.transferButton} onPress={handleTransferToWallet}>
            <Text style={styles.transferButtonText}>Transferir para carteira</Text>
            <Ionicons name="swap-horizontal" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
          <View style={styles.statCard}>
            <TotalGanhoIcon />
            <Text style={styles.statLabel}>Total ganho</Text>
            <Text style={styles.statValue}>
              {affiliateReport ? formatCurrency(affiliateReport.summary.total_commission_cents) : 'R$ 0,00'}
            </Text>
            <Text style={styles.statSubLabel}>
              Total sacado: {affiliateReport ? formatCurrency(affiliateReport.summary.total_withdrawn_cents) : 'R$ 0,00'}
            </Text>
          </View>
          <View style={styles.statCard}>
            <EmpresasIcon />
            <Text style={styles.statLabel}>Empresas indicadas</Text>
            <Text style={styles.statValue}>
              {affiliateReport ? affiliateReport.summary.total_referred_companies.toString() : '0'}
            </Text>
            <Text style={styles.statSubLabel}>
              Média por indicação: {affiliateReport && affiliateReport.summary.total_referred_companies > 0 
                ? formatCurrency(Math.round(affiliateReport.summary.total_commission_cents / affiliateReport.summary.total_referred_companies))
                : 'R$ 0,00'}
            </Text>
          </View>
          <View style={styles.statCard}>
            <UltimoSaqueIcon />
            <Text style={styles.statLabel}>Último saque</Text>
            <Text style={styles.statValue}>
              {affiliateReport?.withdrawals?.list && affiliateReport.withdrawals.list.length > 0 
                ? formatCurrency(affiliateReport.withdrawals.list[0].amount_cents) 
                : 'R$ 0,00'}
            </Text>
            <Text style={styles.statSubLabel}>
              {affiliateReport?.withdrawals?.list && affiliateReport.withdrawals.list.length > 0 
                ? `Realizado em: ${formatDate(affiliateReport.withdrawals.list[0].created_at)}`
                : 'Nenhum saque realizado'
              }
            </Text>
          </View>
        </ScrollView>
        <View style={styles.affiliateLinkCard}>
          <Text style={styles.affiliateLinkTitle}>Seu link de afiliado</Text>
          <Text style={styles.affiliateLinkDescription}>Compartilhe este link com outras empresas e ganhe comissão.</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>
              {affiliateCode ? `https://app.kingpaybr.com?ref=${affiliateCode}` : 'Carregando...'}
            </Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyAffiliateLink}>
              <CopyIcon />
            </TouchableOpacity>
          </View>
        </View>
        {/* Seção de histórico removida - não disponível na API de afiliados */}
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
  balanceCard: {
    backgroundColor: Colors.blue['01'],
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
    marginBottom: 130,
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
    // backgroundColor: '#2563EB',
    // borderRadius: 8,
    // padding: 8,
  },

});