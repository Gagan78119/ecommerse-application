import { StyleSheet, Text, View } from 'react-native';
import { Unplug } from 'lucide-react-native';

import { theme } from '@/theme';
import { AppButton } from '@/components/ui/AppButton';

type ErrorStateProps = { onRetry?: () => void };

/** Figma "Failure" state: icon, headline, subtext, Retry. */
export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <View style={styles.container}>
      <Unplug size={64} color={theme.colors.primary} strokeWidth={1.25} />
      <Text style={styles.title}>Oops! Something went wrong</Text>
      <Text style={styles.message}>We are having some trouble</Text>
      {onRetry ? <AppButton title="Retry" onPress={onRetry} style={styles.button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing.xs, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '600', color: theme.colors.textPrimary, marginTop: theme.spacing.md },
  message: { ...theme.typography.caption, color: theme.colors.textSecondary },
  button: { marginTop: theme.spacing.lg, minWidth: 80, height: 32 },
});
