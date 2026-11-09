import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';

type QuantitySelectorProps = {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  /** Minimum quantity; decrementing at this value is disabled. Default 1. */
  min?: number;
};

/** Compact outlined "− n +" stepper matching the Figma cart/product rows. */
export function QuantitySelector({ quantity, onIncrement, onDecrement, min = 1 }: QuantitySelectorProps) {
  return (
    <View style={styles.row}>
      <Pressable accessibilityLabel="Decrease quantity" onPress={onDecrement} disabled={quantity <= min} hitSlop={6}>
        <Text style={[styles.symbol, quantity <= min && styles.dim]}>−</Text>
      </Pressable>
      <Text style={styles.value}>{quantity}</Text>
      <Pressable accessibilityLabel="Increase quantity" onPress={onIncrement} hitSlop={6}>
        <Text style={styles.symbol}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 62,
    height: 24,
    paddingHorizontal: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
  },
  symbol: { fontSize: 16, fontWeight: '600', color: theme.colors.primary, paddingHorizontal: 2 },
  dim: { opacity: 0.4 },
  value: { fontSize: theme.fontSizes.xs, fontWeight: '600', color: theme.colors.primary },
});
