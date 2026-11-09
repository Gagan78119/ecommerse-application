import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

import { theme } from '@/theme';
import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

type CategorySectionProps = {
  title: string;
  products: Product[];
  onViewAll?: () => void;
};

/** Section title + "View all" + horizontally scrolling product cards. */
export function CategorySection({ title, products, onViewAll }: CategorySectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          <ChevronRight size={14} color={theme.colors.textPrimary} />
        </View>
        {onViewAll ? (
          <Pressable onPress={onViewAll} hitSlop={8}>
            <Text style={styles.viewAll}>View all</Text>
          </Pressable>
        ) : null}
      </View>
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
        ItemSeparatorComponent={() => <View style={{ width: theme.spacing.sm }} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginBottom: theme.spacing.lg },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: theme.spacing.md, marginBottom: theme.spacing.sm },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  title: { fontSize: theme.fontSizes.sm, fontWeight: '700', color: theme.colors.textPrimary },
  viewAll: { fontSize: theme.fontSizes.xs, color: theme.colors.primary },
  list: { paddingHorizontal: theme.spacing.md },
});
