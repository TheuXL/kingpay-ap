import { Stack } from 'expo-router';
import { View } from 'react-native';
import FloatingMenu from '../../components/ui/FloatingMenu';

export default function AppLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen
          name="wallet"
          options={{
            title: 'Carteira',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#FFFFFF',
            },
            headerTintColor: '#000',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="transactions" options={{ headerShown: false }} />
        {/* <Stack.Screen name="create-payment-link-personalize" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="create-payment-link" options={{ headerShown: false }} /> */}
        <Stack.Screen name="kingpay-journey-details" options={{ headerShown: false }} />
        <Stack.Screen name="kingpay-journey" options={{ headerShown: false }} />
        <Stack.Screen name="payment-link-success" options={{ headerShown: false }} />
        <Stack.Screen name="payment-link" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="movements" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ headerShown: false }} />
        <Stack.Screen name="affiliate-panel" options={{ headerShown: false }} />
        <Stack.Screen name="transaction-details" options={{ headerShown: false }} />
        <Stack.Screen name="payment-link-details" options={{ headerShown: false }} />
      </Stack>
      <FloatingMenu />
    </View>
  );
}
