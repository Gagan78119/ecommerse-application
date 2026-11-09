import type { OrderRepository } from '@/repositories/contracts';
import type { ApiError, CartItem, Order } from '@/types';
import { delay } from '@/services/mock/delay';
import { mockControl } from '@/services/mock/mockControl';

export const mockOrderRepository: OrderRepository = {
  async placeOrder(items: CartItem[]): Promise<Order> {
    await delay(800, 1400);
    if (mockControl.failOrders) {
      throw { code: 'ORDER_FAILED', message: 'Could not place order. Please try again.' } satisfies ApiError;
    }
    const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    return {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      items,
      total: Math.round(total * 100) / 100,
      currency: 'INR',
      status: 'placed',
      placedAt: new Date().toISOString(),
    };
  },
};
