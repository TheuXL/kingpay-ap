import { Stack } from 'expo-router';
import { View } from 'react-native';
import { AuthGuard } from '../../components/AuthGuard';
import FloatingMenu from '../../components/ui/FloatingMenu';

export default function AppLayout() {
  return (
    <AuthGuard>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
          <Stack.Screen name="wallet" options={{ headerShown: false }} />
          <Stack.Screen name="transactions" options={{ headerShown: false }} />
          <Stack.Screen name="movements" options={{ headerShown: false }} />
          <Stack.Screen name="payment-link" options={{ headerShown: false }} />
          <Stack.Screen name="create-payment-link" options={{ headerShown: false }} />
          <Stack.Screen name="payment-link-details" options={{ headerShown: false }} />
          <Stack.Screen name="payment-link-success" options={{ headerShown: false }} />
          <Stack.Screen name="settings" options={{ headerShown: false }} />
          <Stack.Screen name="notifications" options={{ headerShown: false }} />
          <Stack.Screen name="affiliate-panel" options={{ headerShown: false }} />
          <Stack.Screen name="management" options={{ headerShown: false }} />
          <Stack.Screen name="kingpay-journey" options={{ headerShown: false }} />
          <Stack.Screen name="kingpay-journey-details" options={{ headerShown: false }} />
          <Stack.Screen name="request-withdraw" options={{ headerShown: false }} />
          <Stack.Screen name="register-phone" options={{ headerShown: false }} />
          <Stack.Screen name="register-pix-key" options={{ headerShown: false }} />
          <Stack.Screen name="pix-key-success" options={{ headerShown: false }} />
          <Stack.Screen name="pix-area" options={{ headerShown: false }} />
          <Stack.Screen name="withdraw-amount" options={{ headerShown: false }} />
          <Stack.Screen name="withdraw-confirmation" options={{ headerShown: false }} />
          <Stack.Screen name="withdraw-success" options={{ headerShown: false }} />
          <Stack.Screen name="transaction-details" options={{ headerShown: false }} />
          <Stack.Screen name="create-payment-link-personalize" options={{ headerShown: false }} />
        </Stack>
        <FloatingMenu />
      </View>
    </AuthGuard>
  );
}
