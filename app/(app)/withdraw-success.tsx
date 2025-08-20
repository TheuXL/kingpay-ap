import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import MessageConfirmacaoIcon from '@/images/solicitar saque/Message confirmação saque.svg';
import ComprovanteIcon from '@/images/solicitar saque/comprovante.svg';
import BotaoContinuarIcon from '@/images/solicitar saque/botão continuar.svg';


export default function WithdrawSuccessScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { accountName, amount, amountFormatted, date } = params;

  const formatCurrency = (cents: string) => {
    const amountInCents = parseInt(cents);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amountInCents / 100);
  };

  const formatDateTime = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    return `${date} às ${timeString}h`;
  };

  const handleContinue = () => {
    console.log('🏠 === NAVEGANDO PARA HOME ===');
    router.push('/(app)/home');
  };

  const handleGenerateReceipt = () => {
    console.log('📄 === GERANDO COMPROVANTE ===');
    console.log('🏦 Conta:', accountName);
    console.log('💰 Valor:', formatCurrency(amount as string));
    console.log('📅 Data/Hora:', formatDateTime());
    
    // Aqui você pode implementar a geração do comprovante
    // Por enquanto, apenas um log
  };

  return (
    <ImageBackground source={require('@/images/solicitar saque/Saque - Confirmar tela de fundo.png')} style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.overlay} />
      <View style={styles.card}>
        <View style={styles.topSection}>
          <MessageConfirmacaoIcon width={280} height={100}/>
        </View>
        
        <View style={styles.middleSection}>
          {/* Detalhes da transação */}
          <View style={styles.transactionDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Enviado para</Text>
              <Text style={styles.detailValue}>{accountName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Valor</Text>
              <Text style={styles.detailValue}>{formatCurrency(amount as string)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quando</Text>
              <Text style={styles.detailValue}>{formatDateTime()}</Text>
            </View>
          </View>

          {/* Ícone de comprovante */}
          <TouchableOpacity 
            style={styles.receiptButton}
            onPress={handleGenerateReceipt}
          >
            <ComprovanteIcon width={250} height={20} />
          </TouchableOpacity>
        </View>

        {/* Ícone continuar */}
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={handleContinue}
        >
          <BotaoContinuarIcon width="100%" height={56} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  card: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 30,
    paddingTop: 40,
    width: '100%',
    height: '55%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginBottom: 20,
    marginLeft: -20,
    marginTop: -10,
  },
  middleSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  transactionDetails: {
    width: '100%',
    marginBottom: 30,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: '#64748B',
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  receiptButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  continueButton: {
    width: '100%',
  },
});
