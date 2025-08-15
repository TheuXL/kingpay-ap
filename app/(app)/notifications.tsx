import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
          <Ionicons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificações</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {notifications.map((notification, index) => (
          <View key={index} style={styles.notificationItem}>
            <View style={styles.notificationIconContainer}>
              <Ionicons name="share-social-outline" size={24} color="#1E293B" />
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
    backgroundColor: '#F8FAFC',
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  notificationIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
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