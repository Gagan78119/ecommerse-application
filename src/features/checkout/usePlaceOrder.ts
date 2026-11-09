import { useState } from 'react';
import { router } from 'expo-router';

import { routes } from '@/constants/routes';
import { orderRepository } from '@/repositories';
import { useCartStore } from '@/stores/cartStore';
import type { ApiError, CartItem, Order } from '@/types';

/**
 * Place-order flow: orderRepository.placeOrder (mock or API) →
 * clear cart → navigate to success. Exposes error for inline display.
 */
export function usePlaceOrder() {
  const clear = useCartStore((s) => s.clear);
  const [isPlacing, setIsPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function placeOrder(items: CartItem[]) {
    if (items.length === 0) return;
    setIsPlacing(true);
    setError(null);
    try {
      const order: Order = await orderRepository.placeOrder(items);
      clear();
      router.replace({ pathname: routes.orderSuccess, params: { orderId: order.id, total: order.total } });
    } catch (err) {
      setError((err as ApiError).message ?? 'Could not place your order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  }

  return { placeOrder, isPlacing, error, clearError: () => setError(null) };
}
