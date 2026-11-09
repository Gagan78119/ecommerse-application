import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { CircleCheck } from 'lucide-react-native';

import { AppButton } from '@/components/ui/AppButton';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { routes } from '@/constants/routes';
import { theme } from '@/theme';

/** Figma "Cart-Successful": check icon, thank-you text, Return to Homepage. */
export default function OrderSuccessScreen() {
  return (
    <ScreenWrapper contentStyle={styles.container}>
      <CircleCheck size={48} color={theme.colors.primary} strokeWidth={1.5} />
      <Text style={styles.title}>Payment Successful</Text>
      <View style={styles.messages}>
        <Text style={styles.message}>Thank you for ordering.</Text>
        <Text style={styles.message}>Your payment is successfully completed.</Text>
      </View>
      <AppButton title="Return to Homepage" onPress={() => router.replace(routes.home)} style={styles.button} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', gap: theme.spacing.xs },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '600', color: theme.colors.textPrimary, marginTop: theme.spacing.xs },
  messages: { alignItems: 'center', gap: 2, marginVertical: theme.spacing.sm },
  message: { fontSize: 11, color: theme.colors.textSecondary, textAlign: 'center' },
  button: { height: 32, marginTop: theme.spacing.sm },
});
