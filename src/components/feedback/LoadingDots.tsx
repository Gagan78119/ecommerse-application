import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { theme } from '@/theme';

const DOT_COUNT = 3;
const DURATION = 500;

/** Three pulsing green dots — matches the Figma loading indicator. */
export function LoadingDots({ size = 'md' }: { size?: 'sm' | 'md' }) {
  // Lazy useState initializer creates the Animated.Values exactly once.
  const [scales] = useState(() =>
    Array.from({ length: DOT_COUNT }, () => new Animated.Value(0.6)),
  );

  useEffect(() => {
    const animations = scales.map((scale, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 150),
          Animated.timing(scale, {
            toValue: 1,
            duration: DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.6,
            duration: DURATION,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay((DOT_COUNT - 1 - i) * 150),
        ]),
      ),
    );
    animations.forEach((a) => a.start());
    return () => animations.forEach((a) => a.stop());
  }, [scales]);

  const dotSize = size === 'sm' ? 8 : 12;

  return (
    <View style={styles.row} accessibilityLabel="Loading">
      {scales.map((scale, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            { width: dotSize, height: dotSize, borderRadius: dotSize / 2, transform: [{ scale }] },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: theme.spacing.xs, alignItems: 'center' },
  dot: { backgroundColor: theme.colors.primary },
});
