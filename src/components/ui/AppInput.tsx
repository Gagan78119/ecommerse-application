import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { theme } from '@/theme';

type AppInputProps = TextInputProps & {
  label?: string;
  /** Leading icon element */
  icon?: ReactNode;
  error?: boolean;
};

/** Labeled text input with optional leading icon and error border. */
export function AppInput({ label, icon, error, style, ...rest }: AppInputProps) {
  return (
    <View style={styles.wrapper}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputWrap, error ? styles.inputError : null]}>
        {icon}
        <TextInput
          placeholderTextColor={theme.colors.textSecondary}
          style={[styles.input, style]}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: theme.spacing.xxs },
  label: { ...theme.typography.caption, color: theme.colors.textPrimary },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.sm,
  },
  inputError: { borderColor: theme.colors.error },
  input: { flex: 1, height: 40, ...theme.typography.body, color: theme.colors.textPrimary },
});
