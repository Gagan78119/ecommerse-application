import type { CartItem, Order, Product } from '@/types';

export interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  searchProducts(query: string): Promise<Product[]>;
}

export interface CategoryRepository {
  getCategories(): Promise<{ id: string; name: string }[]>;
}

export interface AuthRepository {
  /** Resolves with a session on success; rejects with ApiError on failure */
  login(credentials: { username: string; password: string }): Promise<import('@/types').AuthSession>;
  /** Optional server-side logout — mock resolves immediately */
  logout?(): Promise<void>;
}

export interface OrderRepository {
  placeOrder(items: CartItem[]): Promise<Order>;
}
