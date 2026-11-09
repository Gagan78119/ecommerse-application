import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Compass } from 'lucide-react-native';

import { AppButton } from '@/components/ui/AppButton';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { routes } from '@/constants/routes';
import { useAuthStore } from '@/stores/authStore';
import { theme } from '@/theme';

/** Figma "Not_Found_View" — shown for unmatched routes. */
export default function NotFoundScreen() {
  const session = useAuthStore((s) => s.session);

  return (
    <ScreenWrapper contentStyle={styles.container}>
      <Compass size={64} color={theme.colors.primary} strokeWidth={1.25} />
      <Text style={styles.title}>Page Not Found</Text>
      <Text style={styles.message}>We are sorry, the page you requested could not be found</Text>
      <AppButton
        title="Go Home"
        onPress={() => router.replace(session ? routes.home : routes.login)}
        style={styles.button}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: theme.spacing.xs, paddingHorizontal: theme.spacing.xl },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '600', color: theme.colors.textPrimary, marginTop: theme.spacing.md },
  message: { fontSize: 11, color: theme.colors.textSecondary, textAlign: 'center' },
  button: { height: 32, marginTop: theme.spacing.md },
});
