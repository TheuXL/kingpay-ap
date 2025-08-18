import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import BackIcon from '@/images/icon_back.svg';
import NotificacoesIcon from '@/images/home/notificações.svg';

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications = [
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
    {
      title: 'Programa Indiking',
      description: 'Compartilhe com empresas e ganhe comissão sobre as transações delas.',
      date: '10 de jun',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.notificationIconContainer}>
              <NotificacoesIcon width={48} height={48} />
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDate}>{notification.date}</Text>
              </View>
              <Text style={styles.notificationDescription}>{notification.description}</Text>
            </View>
          </View>
        ))}
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  notificationIconContainer: {
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  notificationDate: {
    fontSize: 14,
    color: '#64748B',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#64748B',
  },
});