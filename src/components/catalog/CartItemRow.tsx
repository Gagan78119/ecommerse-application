import { Image, StyleSheet, Text, View } from 'react-native';

import { theme } from '@/theme';
import { formatPrice } from '@/utils/format';
import type { CartItem } from '@/types';
import { useCartStore } from '@/stores/cartStore';
import { QuantitySelector } from '@/components/ui/QuantitySelector';

/** Cart line: thumbnail, name, unit, price, stepper (decrement to 0 removes). */
export function CartItemRow({ item }: { item: CartItem }) {
  const setQuantity = useCartStore((s) => s.setQuantity);
  const { product, quantity } = item;

  return (
    <View style={styles.row}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="contain" />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.unit}>{product.unit}</Text>
        <Text style={styles.price}>{formatPrice(product.price).replace('.00', '')}</Text>
      </View>
      <QuantitySelector
        quantity={quantity}
        min={0}
        onIncrement={() => setQuantity(product.id, quantity + 1)}
        onDecrement={() => setQuantity(product.id, quantity - 1)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, marginBottom: theme.spacing.lg },
  image: { width: 48, height: 48 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: theme.fontSizes.xs, fontWeight: '600', color: theme.colors.textPrimary },
  unit: { fontSize: theme.fontSizes.xs, color: theme.colors.textSecondary },
  price: { fontSize: theme.fontSizes.xs, fontWeight: '700', color: theme.colors.textPrimary },
});
