import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Star } from 'lucide-react-native';

import { AppButton } from '@/components/ui/AppButton';
import { QuantitySelector } from '@/components/ui/QuantitySelector';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { EmptyState } from '@/components/feedback/EmptyState';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingDots } from '@/components/feedback/LoadingDots';
import { useProduct } from '@/features/catalog/useProduct';
import { useCartQuantity, useCartStore } from '@/stores/cartStore';
import { theme } from '@/theme';
import { formatPrice } from '@/utils/format';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const productId = Array.isArray(id) ? id[0] : id ?? '';

  const query = useProduct(productId);
  const product = query.data;
  const quantity = useCartQuantity(productId);
  const add = useCartStore((s) => s.add);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const [added, setAdded] = useState(false);

  if (query.isLoading) {
    return (
      <ScreenWrapper contentStyle={styles.center}>
        <LoadingDots />
      </ScreenWrapper>
    );
  }

  if (query.isError) {
    return (
      <ScreenWrapper contentStyle={styles.center}>
        <ErrorState onRetry={() => void query.refetch()} />
      </ScreenWrapper>
    );
  }

  if (!product) {
    return (
      <ScreenWrapper contentStyle={styles.center}>
        <EmptyState
          title="Product not found"
          message="This product is no longer available."
          actionLabel="Back to shop"
          onAction={() => router.back()}
        />
      </ScreenWrapper>
    );
  }

  function handleAdd() {
    add(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <ScreenWrapper padded={false}>
      <View style={styles.topBar}>
        <Pressable
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.backButton}>
          <ArrowLeft size={22} color={theme.colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: product.imageUrl }} style={styles.image} resizeMode="cover" />

        <View style={styles.body}>
          <View style={styles.titleRow}>
            <Text style={styles.name}>{product.name}</Text>
            {product.rating ? (
              <View style={styles.rating}>
                <Star size={14} color={theme.colors.warning} fill={theme.colors.warning} />
                <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.unit}>{product.unit}</Text>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantity > 0 ? (
          <View style={styles.qtyWrap}>
            <QuantitySelector
              quantity={quantity}
              min={0}
              onIncrement={() => add(productId)}
              onDecrement={() => setQuantity(productId, quantity - 1)}
            />
          </View>
        ) : null}
        <AppButton
          title={added ? 'Added ✓' : quantity > 0 ? 'Add another' : 'Add to Cart'}
          onPress={handleAdd}
          style={styles.addButton}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { justifyContent: 'center', alignItems: 'center' },
  topBar: { paddingHorizontal: theme.spacing.md, paddingVertical: theme.spacing.xs },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.card,
  },
  content: { paddingBottom: theme.spacing.xxl },
  image: { width: '100%', aspectRatio: 1, backgroundColor: theme.colors.surfaceMuted },
  body: { padding: theme.spacing.lg, gap: theme.spacing.xs },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { ...theme.typography.screenTitle, color: theme.colors.textPrimary, flex: 1 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: theme.spacing.sm },
  ratingText: { ...theme.typography.caption, color: theme.colors.textSecondary, fontWeight: '600' },
  unit: { ...theme.typography.body, color: theme.colors.textSecondary },
  price: { ...theme.typography.price, color: theme.colors.primary, fontSize: theme.fontSizes.xl },
  description: { ...theme.typography.body, color: theme.colors.textSecondary, lineHeight: 22, marginTop: theme.spacing.sm },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  qtyWrap: { minWidth: 110, alignItems: 'center' },
  addButton: { flex: 1 },
});
