import { create } from 'zustand';

/**
 * Cart store — client-only state, intentionally NOT persisted.
 * Holds productId → quantity; screens resolve full products via the
 * catalog query (single source of truth for product data).
 */
type CartState = {
  quantities: Record<string, number>;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()((set) => ({
  quantities: {},
  add: (productId, quantity = 1) =>
    set((s) => ({
      quantities: {
        ...s.quantities,
        [productId]: (s.quantities[productId] ?? 0) + quantity,
      },
    })),
  remove: (productId) =>
    set((s) => {
      const next = { ...s.quantities };
      delete next[productId];
      return { quantities: next };
    }),
  setQuantity: (productId, quantity) =>
    set((s) => {
      if (quantity <= 0) {
        const next = { ...s.quantities };
        delete next[productId];
        return { quantities: next };
      }
      return { quantities: { ...s.quantities, [productId]: quantity } };
    }),
  clear: () => set({ quantities: {} }),
}));

/** Total number of items in cart (sum of quantities) — for the tab badge */
export const useCartCount = () =>
  useCartStore((s) => Object.values(s.quantities).reduce((a, b) => a + b, 0));

/** Quantity of a single product, 0 when absent */
export const useCartQuantity = (productId: string) =>
  useCartStore((s) => s.quantities[productId] ?? 0);
