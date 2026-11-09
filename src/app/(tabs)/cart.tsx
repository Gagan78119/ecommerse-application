import { router } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

import { CartItemRow } from '@/components/catalog/CartItemRow';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingDots } from '@/components/feedback/LoadingDots';
import { AppButton } from '@/components/ui/AppButton';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { routes } from '@/constants/routes';
import { cartTotals, useCartItems } from '@/features/cart/useCartItems';
import { useProducts } from '@/features/catalog/useProducts';
import { usePlaceOrder } from '@/features/checkout/usePlaceOrder';
import { theme } from '@/theme';
import { formatPrice } from '@/utils/format';

/** Cart + checkout in one screen (matches Figma "Cart" frame). */
export default function CartScreen() {
  const productsQuery = useProducts();
  const items = useCartItems(productsQuery.data);
  const { count, subtotal } = cartTotals(items);
  const { placeOrder, isPlacing, error } = usePlaceOrder();

  if (productsQuery.isLoading) {
    return (
      <ScreenWrapper contentStyle={styles.center}>
        <LoadingDots />
      </ScreenWrapper>
    );
  }

  if (productsQuery.isError) {
    return (
      <ScreenWrapper>
        <ErrorState onRetry={() => void productsQuery.refetch()} />
      </ScreenWrapper>
    );
  }

  if (items.length === 0) {
    return (
      <ScreenWrapper>
        <EmptyState title="Your cart is empty" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Pressable onPress={() => router.replace(routes.home)} hitSlop={8} style={styles.back}>
          <ArrowLeft size={18} color={theme.colors.textPrimary} />
        </Pressable>
        <Text style={styles.title}>Checkout</Text>
      </View>
      <Text style={styles.count}>Items ({count})</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => <CartItemRow item={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.footer}>
        <Text style={styles.total}>
          Total ({count} items) : {formatPrice(subtotal).replace('.00', '')}
        </Text>
        <AppButton title="Checkout" onPress={() => void placeOrder(items)} loading={isPlacing} style={styles.button} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  header: { alignItems: 'center', justifyContent: 'center', paddingVertical: theme.spacing.md },
  back: { position: 'absolute', left: 0 },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '500', color: theme.colors.textPrimary },
  count: { fontSize: 11, color: theme.colors.textSecondary, textAlign: 'right', marginBottom: theme.spacing.md },
  list: { flex: 1 },
  error: { ...theme.typography.caption, color: theme.colors.error, textAlign: 'center' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: theme.spacing.md },
  total: { fontSize: theme.fontSizes.xs, color: theme.colors.textPrimary },
  button: { minWidth: 100, height: 32 },
});
