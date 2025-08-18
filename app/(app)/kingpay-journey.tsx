import { Feather } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import BackIcon from '@/images/icon_back.svg';
// import BackgroundJornadaIcon from '@/images/jornada kingpay/Background jornada kingpay.svg'; // Removido
import BemVindoIcon from '@/images/jornada kingpay/bem vindo(a).svg';
import HelpIcon from '@/images/jornada kingpay/help.svg';

export default function KingPayJourneyScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image
        source={require('@/images/jornada kingpay/Background jornada kingpay.svg')}
        style={styles.backgroundImage}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Jornada KingPay</Text>
        <TouchableOpacity>
          <HelpIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSheet}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Feather name="x" size={24} color="black" />
        </TouchableOpacity>
        <BemVindoIcon style={{ alignSelf: 'center', marginTop: 20 }} />
        <Text style={styles.sheetSubtitle}>
          Grandes resultados merecem reconhecimento! A KingPay transforma seu
          desempenho em prêmios exclusivos.
        </Text>
        <Link href={'kingpay-journey-details' as any} asChild>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.continueButtonText}>Continuar</Text>
            <Feather name="arrow-right" size={20} color="white" />
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['04'],
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 8,
  },
  closeButton: {
    alignSelf: 'flex-start',
  },
  sheetSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 30,
  },
  continueButton: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    paddingVertical: 18,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});
