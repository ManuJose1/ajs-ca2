import { Stack } from "expo-router";
import { SessionProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, MD3DarkTheme as PaperDarkTheme } from 'react-native-paper';

export default function Layout() {
  return (
    <CartProvider>
      <SessionProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </PaperProvider>
        </SafeAreaProvider>
      </SessionProvider>
    </CartProvider>
  );
}