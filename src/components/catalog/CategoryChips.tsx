import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Apple, Package, ShoppingCart, Snowflake, UtensilsCrossed, type LucideIcon } from 'lucide-react-native';

import { theme } from '@/theme';
import type { Category } from '@/types';

const ICONS: Record<string, LucideIcon> = {
  all: ShoppingCart,
  'cat-fruits-veg': Apple,
  'cat-prepared': UtensilsCrossed,
  'cat-canned': Package,
  'cat-frozen': Snowflake,
};

type CategoryChipsProps = {
  categories: Category[];
  /** 'all' or a category id */
  selectedId: string;
  onSelect: (id: string) => void;
};

/** Horizontal category filter row (All + each category). */
export function CategoryChips({ categories, selectedId, onSelect }: CategoryChipsProps) {
  const items = [{ id: 'all', name: 'All' }, ...categories];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {items.map((item) => {
        const Icon = ICONS[item.id] ?? Package;
        const active = item.id === selectedId;
        return (
          <Pressable key={item.id} style={styles.item} onPress={() => onSelect(item.id)}>
            <View style={[styles.box, active && styles.boxActive]}>
              <Icon size={20} color={active ? theme.colors.textInverse : theme.colors.textSecondary} />
            </View>
            <Text style={[styles.label, active && styles.labelActive]} numberOfLines={2}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { paddingHorizontal: theme.spacing.md, gap: theme.spacing.sm },
  item: { width: 64, alignItems: 'center', gap: 4 },
  box: { width: 48, height: 48, borderRadius: theme.radius.sm, backgroundColor: theme.colors.surfaceMuted, alignItems: 'center', justifyContent: 'center' },
  boxActive: { backgroundColor: theme.colors.primary },
  label: { fontSize: 10, textAlign: 'center', color: theme.colors.textSecondary },
  labelActive: { color: theme.colors.primary, fontWeight: '600' },
});
