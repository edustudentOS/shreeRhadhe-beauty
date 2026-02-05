import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="product-detail" options={{ presentation: 'card', headerShown: true, title: 'Product Details' }} />
          <Stack.Screen name="booking" options={{ presentation: 'modal', headerShown: true, title: 'Book Appointment' }} />
          <Stack.Screen name="gallery" options={{ headerShown: true, title: 'Gallery' }} />
          <Stack.Screen name="about" options={{ headerShown: true, title: 'About Us' }} />
          <Stack.Screen name="contact" options={{ headerShown: true, title: 'Contact Us' }} />
          <Stack.Screen name="reviews" options={{ headerShown: true, title: 'Customer Reviews' }} />
          <Stack.Screen name="admin/login" options={{ presentation: 'modal', headerShown: true, title: 'Admin Login' }} />
          <Stack.Screen name="admin/dashboard" options={{ headerShown: true, title: 'Admin Dashboard' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
