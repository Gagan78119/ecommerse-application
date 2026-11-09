import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { routes } from '@/constants/routes';
import { theme } from '@/theme';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types';
import { useCartQuantity, useCartStore } from '@/stores/cartStore';
import { QuantitySelector } from '@/components/ui/QuantitySelector';

/** Product card: image, name, unit, price + "Add" button or − n + stepper. */
export function ProductCard({ product }: { product: Product }) {
  const quantity = useCartQuantity(product.id);
  const add = useCartStore((s) => s.add);
  const setQuantity = useCartStore((s) => s.setQuantity);

  return (
    <Pressable style={styles.card} onPress={() => router.push(routes.product(product.id))}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="contain" />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.unit}>{product.unit}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{formatPrice(product.price).replace('.00', '')}</Text>
        {quantity === 0 ? (
          <Pressable style={styles.addButton} onPress={() => add(product.id)}>
            <Text style={styles.addText}>Add</Text>
          </Pressable>
        ) : (
          <QuantitySelector
            quantity={quantity}
            min={0}
            onIncrement={() => add(product.id)}
            onDecrement={() => setQuantity(product.id, quantity - 1)}
          />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  image: { width: '100%', height: 70, marginBottom: theme.spacing.xs },
  name: { fontSize: theme.fontSizes.xs, fontWeight: '600', color: theme.colors.textPrimary },
  unit: { fontSize: 11, color: theme.colors.textSecondary, marginTop: 2 },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: theme.spacing.xs },
  price: { fontSize: theme.fontSizes.xs, fontWeight: '700', color: theme.colors.textPrimary },
  addButton: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.sm,
    height: 24,
    justifyContent: 'center',
  },
  addText: { fontSize: theme.fontSizes.xs, color: theme.colors.primary, fontWeight: '600' },
});
