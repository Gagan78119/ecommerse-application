import { StyleSheet, Text, View } from 'react-native';
import { ShoppingCart } from 'lucide-react-native';

import { theme } from '@/theme';
import { AppButton } from '@/components/ui/AppButton';

type EmptyStateProps = {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
};

/** Green cart icon + message — Figma "Cart-Empty Cart" state. */
export function EmptyState({ title = 'Your cart is empty', message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <ShoppingCart size={40} color={theme.colors.primary} strokeWidth={1.5} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
      {actionLabel && onAction ? <AppButton title={actionLabel} onPress={onAction} style={styles.button} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing.xs, padding: theme.spacing.lg },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '600', color: theme.colors.textPrimary, marginTop: theme.spacing.xs },
  message: { ...theme.typography.caption, color: theme.colors.textSecondary, textAlign: 'center' },
  button: { marginTop: theme.spacing.md, minWidth: 160 },
});
