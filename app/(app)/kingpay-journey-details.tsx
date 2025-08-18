import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import BackIcon from '@/images/icon_back.svg';
import HelpIcon from '@/images/jornada kingpay/help.svg';
import AspiranteRealezaIcon from '@/images/jornada kingpay/Aspirante a realeza.svg';
import Niveis2Icon from '@/images/jornada kingpay/Níveis 2.svg';
import PrincipeComercioIcon from '@/images/jornada kingpay/principe do comércio.svg';
import ReiDaKingIcon from '@/images/jornada kingpay/rei da king.svg';
import { Colors } from '../../constants/Colors';

const KingpayJourneyDetails = () => {
  const router = useRouter();

  return (
    <LinearGradient colors={['#f0f2f5', '#f0f2f5']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            <View style={styles.header}>
              <Pressable onPress={() => router.back()}>
                <BackIcon />
              </Pressable>
              <Text style={styles.headerTitle}>Jornada KingPay</Text>
              <HelpIcon />
            </View>
            <Image source={require('@/images/jornada kingpay/Reward.png')} style={styles.starImage} />
            <Text style={styles.journeyTitle}>Sua jornada</Text>
            <View style={styles.levelsContainer}>
              <View style={styles.levelImageContainer}>
                <AspiranteRealezaIcon width={360} height={100} />
              </View>
              <View style={styles.levelImageContainer}>
                <Niveis2Icon width={360} height={100} />
              </View>
              <View style={styles.levelImageContainer}>
                <PrincipeComercioIcon width={360} height={100} />
              </View>
              <View style={styles.levelImageContainer}>
                <ReiDaKingIcon width={360} height={100} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white['01'],
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerTitle: {
    color: Colors.blue['04'],
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  starImage: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
  journeyTitle: {
    color: Colors.blue['04'],
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: 5,
    marginTop: -40,
  },
  levelsContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
  },
  levelImageContainer: {
    marginVertical: -5,
    width: '100%',
    alignItems: 'flex-start',
  },
});

export default KingpayJourneyDetails;
