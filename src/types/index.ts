/**
 * Domain models — the shapes the UI works with.
 * These are intentionally decoupled from backend DTOs; mappers in
 * repositories/api translate wire format → domain.
 */

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  /** Price in the smallest currency unit is NOT used — plain number, e.g. 4.99 */
  price: number;
  /** Display unit, e.g. "500 g", "1 L", "pack of 6" */
  unit: string;
  /** Remote image URL (mock data uses placeholder CDN URLs) */
  imageUrl: string;
  categoryId: string;
  description: string;
  /** Optional rating 0–5 shown on cards/detail */
  rating?: number;
};

export type User = {
  id: string;
  username: string;
  name: string;
  email?: string;
};

export type AuthSession = {
  /** Opaque token returned by the auth repository (mock or real) */
  token: string;
  user: User;
};

export type LoginCredentials = {
  username: string;
  password: string;
};

/** A cart line resolved for display: product snapshot + quantity */
export type CartItem = {
  product: Product;
  quantity: number;
};

export type OrderStatus = 'placed' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';

export type Order = {
  id: string;
  items: CartItem[];
  /** Total in display currency units */
  total: number;
  currency: string;
  status: OrderStatus;
  placedAt: string; // ISO timestamp
};

/** Normalized error shape every repository/API failure maps to */
export type ApiError = {
  code: string;
  message: string;
  status?: number;
};

/** Envelope the backend is expected to return for list/detail endpoints */
export type ApiResponse<T> = {
  data: T;
  message?: string;
};

// Re-export DTO wire types so `@/types` is the single import surface.
export * from './dto';
