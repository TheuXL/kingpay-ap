import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CarteiraIcon from '../../images/home/icon carteira.svg';
import TransacoesIcon from '../../images/home/icon transações.svg';
import LinkPagamentoIcon from '../../images/home/icon link de pagamento.svg';
import AreaPixIcon from '../../images/home/Icon Área pix.svg';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { icon: <CarteiraIcon width={70} height={70} />, label: 'Carteira', screen: '/wallet' },
    {
      icon: <TransacoesIcon width={70} height={70} />,
      label: 'Transações',
      screen: '/transactions',
    },
    {
      icon: <LinkPagamentoIcon width={70} height={70} />,
      label: 'Link de\nPagamento',
      screen: '/payment-link',
    },
    { icon: <AreaPixIcon width={70} height={70} />, label: 'Área Pix', screen: '/(app)/pix-area' },
  ];

  return (
    <View style={styles.container}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionButton}
          onPress={() => action.screen && router.push(action.screen as any)}
        >
          {action.icon}
          <Text style={styles.actionLabel}>{action.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingHorizontal: 20,
    marginTop: 30,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionLabel: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
