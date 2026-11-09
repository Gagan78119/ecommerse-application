import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Check, CircleUserRound, Lock } from 'lucide-react-native';

import { AppButton } from '@/components/ui/AppButton';
import { AppInput } from '@/components/ui/AppInput';
import { useLogin } from '@/features/auth/useLogin';
import { loginSchema, type LoginFormValues } from '@/features/auth/schema';
import { theme } from '@/theme';

/** Login — Figma states: empty (disabled button) / filled / error message. */
export default function LoginScreen() {
  const { submit, isSubmitting, serverError, clearError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormValues> = ({ username, password }) => {
    void submit(username.trim(), password);
  };

  const onChange = (field: 'username' | 'password') => (text: string) => {
    clearError();
    setValue(field, text, { shouldValidate: true });
  };

  return (
    <View style={styles.screen}>
      <Image source={require('../../assets/images/login-bg.jpg')} style={styles.bg} resizeMode="cover" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <View style={styles.logoRow}>
            <Text style={styles.logoNxt}>Nxt</Text>
            <View style={styles.logoBox}>
              <Text style={styles.logoMart}>Mart</Text>
            </View>
          </View>

          <AppInput
            label="Username"
            icon={<CircleUserRound size={16} color={theme.colors.textSecondary} />}
            onChangeText={onChange('username')}
            autoCapitalize="none"
            autoCorrect={false}
            error={!!serverError}
          />
          <AppInput
            label="Password"
            icon={<Lock size={16} color={theme.colors.textSecondary} />}
            onChangeText={onChange('password')}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            error={!!serverError}
          />

          <Pressable style={styles.checkRow} onPress={() => setShowPassword((v) => !v)}>
            <View style={[styles.checkbox, showPassword && styles.checkboxOn]}>
              {showPassword ? <Check size={12} color={theme.colors.textInverse} strokeWidth={3} /> : null}
            </View>
            <Text style={styles.checkLabel}>Show Password</Text>
          </Pressable>

          <AppButton title="Login" onPress={handleSubmit(onSubmit)} loading={isSubmitting} disabled={!isValid} />
          {serverError ? <Text style={styles.error}>Incorrect username or password</Text> : null}
        </View>
      </ScrollView>
    </View>
  );
}

const fill = { position: 'absolute' as const, top: 0, left: 0, right: 0, bottom: 0 };

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.primaryDark },
  bg: { ...fill, width: '100%', height: '100%' },
  scroll: { flexGrow: 1, justifyContent: 'center', padding: theme.spacing.xl },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.lg },
  logoNxt: { fontSize: 28, fontWeight: '700', color: theme.colors.primary },
  logoBox: {
    borderWidth: 3,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 6,
    marginLeft: 2,
  },
  logoMart: { fontSize: 28, fontWeight: '700', color: theme.colors.primary },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs, marginBottom: theme.spacing.xs },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: theme.colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary },
  checkLabel: { ...theme.typography.caption, color: theme.colors.textPrimary },
  error: { ...theme.typography.caption, color: theme.colors.error },
});
