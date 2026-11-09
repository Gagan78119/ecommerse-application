import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { CategoryChips } from '@/components/catalog/CategoryChips';
import { CategorySection } from '@/components/catalog/CategorySection';
import { ErrorState } from '@/components/feedback/ErrorState';
import { LoadingDots } from '@/components/feedback/LoadingDots';
import { ScreenWrapper } from '@/components/ui/ScreenWrapper';
import { useCategories } from '@/features/catalog/useCategories';
import { useProducts } from '@/features/catalog/useProducts';
import { theme } from '@/theme';

export default function HomeScreen() {
  const [selectedId, setSelectedId] = useState('all');
  const productsQuery = useProducts();
  const categoriesQuery = useCategories();

  const products = productsQuery.data ?? [];
  const categories = categoriesQuery.data ?? [];
  const visible = selectedId === 'all' ? categories : categories.filter((c) => c.id === selectedId);

  if (productsQuery.isLoading || categoriesQuery.isLoading) {
    return (
      <ScreenWrapper padded={false} contentStyle={styles.center}>
        <LoadingDots />
      </ScreenWrapper>
    );
  }

  if (productsQuery.isError || categoriesQuery.isError) {
    return (
      <ScreenWrapper padded={false}>
        <ErrorState
          onRetry={() => {
            void productsQuery.refetch();
            void categoriesQuery.refetch();
          }}
        />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper padded={false}>
      <View style={styles.chips}>
        <CategoryChips categories={categories} selectedId={selectedId} onSelect={setSelectedId} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        {visible.map((cat) => (
          <CategorySection
            key={cat.id}
            title={cat.name}
            products={products.filter((p) => p.categoryId === cat.id)}
            onViewAll={() => setSelectedId(cat.id)}
          />
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  chips: { paddingTop: theme.spacing.md, paddingBottom: theme.spacing.md },
  list: { paddingBottom: theme.spacing.xl },
});
