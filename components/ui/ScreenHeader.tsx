import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import BackIcon from '@/images/icon_back.svg';

type ScreenHeaderProps = {
  title: string;
  showAccountSwitcher?: boolean;
};

export function ScreenHeader({ title, showAccountSwitcher = false }: ScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()}>
        <BackIcon />
      </TouchableOpacity>
      <ThemedText style={styles.title}>{title}</ThemedText>
      {showAccountSwitcher ? (
        <TouchableOpacity style={styles.accountSwitcher}>
          <ThemedText style={styles.accountText}>KingPay</ThemedText>
          <Ionicons name="chevron-down" size={16} color="gray" />
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: 50,
    backgroundColor: '#F8F9FA',
    // borderBottomWidth: 1,
    // borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  accountSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  accountText: {
    marginRight: 4,
    fontSize: 14,
  },
  placeholder: {
    width: 40, // to balance the back button
  },
});