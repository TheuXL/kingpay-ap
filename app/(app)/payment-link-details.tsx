import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';

import CancelarLinkIcon from '@/images/link de pagamento/Icon cancelar link.svg';
import LinksIcon from '@/images/link de pagamento/Icon links.svg';
import CopiarLinkIcon from '@/images/link de pagamento/Copy Icon Container.svg';
import LinkAtivoIcon from '@/images/link de pagamento/link ativo.svg';
import InativoIcon from '@/images/link de pagamento/inativo.svg';
import SendIcon from '@/images/link de pagamento/Send Icon.svg';
import BackIcon from '@/images/icon_back.svg';
import { Colors } from '@/constants/Colors';
import { usePaymentLinkDetails } from '../../hooks/usePaymentLinkDetails';

export default function PaymentLinkDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const linkId = params.linkId as string;
  
  const { linkDetails, isLoading, error, isUpdating, cancelLink } = usePaymentLinkDetails(linkId);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / 100); // API retorna valores em centavos
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPaymentMethods = (methods: string[]): string => {
    const methodNames = {
      pix: 'Pix',
      cartao: 'Cartão',
      boleto: 'Boleto'
    };
    return methods.map(method => methodNames[method as keyof typeof methodNames] || method).join(', ');
  };

  const handleCopyLink = async () => {
    if (linkDetails) {
      const linkUrl = `https://app.kingpaybr.com/pay/${linkDetails.id}`;
      await Clipboard.setStringAsync(linkUrl);
      Alert.alert('Sucesso', 'Link copiado para a área de transferência!');
    }
  };

  const handleShareLink = () => {
    if (linkDetails) {
      const linkUrl = `https://app.kingpaybr.com/pay/${linkDetails.id}`;
      // Aqui você pode implementar o compartilhamento nativo
      Alert.alert('Compartilhar', `Link: ${linkUrl}`);
    }
  };

  const handleCancelLink = () => {
    Alert.alert(
      'Cancelar Link',
      'Tem certeza que deseja cancelar este link de pagamento?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          onPress: async () => {
            console.log('🎯 === CONFIRMADO CANCELAMENTO ===');
            const result = await cancelLink();
            
            if (result?.success) {
              Alert.alert('Sucesso', 'Link cancelado com sucesso!');
              // Notificar a tela anterior que o link foi cancelado
              router.back();
            } else {
              Alert.alert('Erro', result?.error || 'Erro ao cancelar link');
            }
          }
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.blue['01']} />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error || !linkDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar detalhes</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
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
        <Text style={styles.headerTitle}>Detalhes do link</Text>
      </View>
      <ScrollView style={styles.scrollView}>
       
        <View style={styles.card}>
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShareLink}>
              <LinksIcon width={56} height={56} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleShareLink}>
              <SendIcon width={56} height={56} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleCancelLink}>
              <CancelarLinkIcon width={56} height={56} />
            </TouchableOpacity>
          </View>

          <View style={styles.productHeader}>
            <Text style={styles.productValue}>{formatCurrency(linkDetails.valor)}</Text>
            {linkDetails.ativo ? <LinkAtivoIcon /> : <InativoIcon />}
          </View>
          <Text style={styles.productName}>{linkDetails.nome}</Text>
          <Text style={styles.productDate}>
            Criado em {formatDate(linkDetails.created_at)}.
          </Text>
          <View style={styles.paymentMethods}>
            <Text style={styles.paymentMethod}>
              {formatPaymentMethods(linkDetails.formas_de_pagamento)}
            </Text>
          </View>
          {linkDetails.descricao_cobranca && (
            <>
              <Text style={styles.description}>
                {linkDetails.descricao_cobranca}
              </Text>
              <TouchableOpacity>
                <Text style={styles.seeMore}>Ver mais</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.card}>
          <Text style={styles.paymentLinkTitle}>Link de pagamento</Text>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>
              https://app.kingpaybr.com/pay/{linkDetails.id}
            </Text>
            <TouchableOpacity style={styles.copyButton} onPress={handleCopyLink}>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#64748B',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white['01'],
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
  },
});