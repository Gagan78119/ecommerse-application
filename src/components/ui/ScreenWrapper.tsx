import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '@/theme';

type ScreenWrapperProps = {
  children: ReactNode;
  /** Extra style applied to the inner content container */
  contentStyle?: StyleProp<ViewStyle>;
  /** When true the screen paints the theme background (default true) */
  padded?: boolean;
};

/**
 * Wraps every screen: applies safe-area insets and the app background.
 * Keeps screens free of SafeAreaView boilerplate.
 */
export function ScreenWrapper({ children, contentStyle, padded = true }: ScreenWrapperProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.screen,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={[styles.content, padded && styles.padded, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.colors.background },
  content: { flex: 1 },
  padded: { paddingHorizontal: theme.spacing.md },
});
