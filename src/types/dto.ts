/**
 * Backend DTOs — wire shapes as proposed in docs/API_CONTRACT.md.
 * Keep these separate from domain types; if the backend differs,
 * only repositories/api/mappers.ts changes.
 */
import type { OrderStatus } from './index';

export type ProductDto = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  image_url?: string;
  imageUrl?: string;
  category_id?: string;
  categoryId?: string;
  description?: string;
  rating?: number;
};

export type CategoryDto = {
  id: string;
  name: string;
};

export type LoginRequestDto = {
  username: string;
  password: string;
};

export type LoginResponseDto = {
  token: string;
  user: {
    id: string;
    username: string;
    name: string;
    email?: string;
  };
};

export type OrderItemDto = {
  product_id: string;
  quantity: number;
};

export type PlaceOrderRequestDto = {
  items: OrderItemDto[];
  /** Optional delivery address once checkout collects one */
  address?: string;
};

export type OrderDto = {
  id: string;
  items: OrderItemDto[];
  total: number;
  currency: string;
  status: OrderStatus;
  placed_at: string;
};

export type ErrorResponseDto = {
  error?: { code?: string; message?: string };
  message?: string;
};
