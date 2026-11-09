import type { ProductRepository } from '@/repositories/contracts';
import type { ApiError, Product } from '@/types';
import { categories, products } from '@/services/mock/mockData';
import { delay } from '@/services/mock/delay';
import { mockControl } from '@/services/mock/mockControl';

const fail = (): ApiError => ({ code: 'MOCK_FAILURE', message: 'Mock failure injected' });

export const mockProductRepository: ProductRepository = {
  async getProducts(): Promise<Product[]> {
    await delay();
    if (mockControl.failProducts) throw fail();
    return products;
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(200, 500);
    if (mockControl.failProducts) throw fail();
    return products.find((p) => p.id === id) ?? null;
  },

  async searchProducts(query: string): Promise<Product[]> {
    await delay(200, 500);
    if (mockControl.failProducts) throw fail();
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        categories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(q),
    );
  },
};
