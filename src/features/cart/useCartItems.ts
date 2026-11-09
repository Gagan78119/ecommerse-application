import { useMemo } from 'react';

import type { CartItem, Product } from '@/types';
import { useCartStore } from '@/stores/cartStore';

/**
 * Resolve cart quantities into display-ready CartItems.
 * Pass the product list (from useProducts) — lines whose product is
 * missing from the catalog are dropped.
 */
export function useCartItems(products: Product[] | undefined): CartItem[] {
  const quantities = useCartStore((s) => s.quantities);
  return useMemo(() => {
    if (!products) return [];
    const byId = new Map(products.map((p) => [p.id, p]));
    return Object.entries(quantities)
      .map(([id, quantity]) => {
        const product = byId.get(id);
        return product ? { product, quantity } : null;
      })
      .filter((i): i is CartItem => i !== null);
  }, [products, quantities]);
}

/** Subtotal + item count for the resolved cart lines. */
export function cartTotals(items: CartItem[]) {
  return {
    count: items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  };
}
