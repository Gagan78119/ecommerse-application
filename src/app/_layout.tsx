import { QueryClientProvider } from '@tanstack/react-query';
import { Redirect, Stack, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { LoadingDots } from '@/components/feedback/LoadingDots';
import { routes } from '@/constants/routes';
import { queryClient } from '@/services/queryClient';
import { useAuthStore } from '@/stores/authStore';
import { theme } from '@/theme';

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <AuthGate />
    </QueryClientProvider>
  );
}

/**
 * Route protection: unauthenticated users land on /login, authenticated
 * users are pushed into the tab group. Waits for AsyncStorage hydration
 * before deciding so a persisted session doesn't flicker to login.
 */
function AuthGate() {
  const session = useAuthStore((s) => s.session);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const segments = useSegments();

  if (!hasHydrated) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
        <LoadingDots />
      </View>
    );
  }

  const inLogin = segments[0] === 'login';

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      {!session && !inLogin ? <Redirect href={routes.login} /> : null}
      {session && inLogin ? <Redirect href={routes.home} /> : null}
    </>
  );
}
