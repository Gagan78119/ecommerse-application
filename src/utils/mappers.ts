import type {
  CategoryDto,
  LoginResponseDto,
  OrderDto,
  OrderItemDto,
  ProductDto,
} from '@/types/dto';
import type {
  AuthSession,
  CartItem,
  Category,
  Order,
  Product,
  User,
} from '@/types';
import { products as fallbackProducts } from '@/services/mock/mockData';

/**
 * DTO → domain mappers. If the backend response shape differs from our
 * domain models, this is the ONLY file that needs to change.
 */

export function productDtoToDomain(dto: ProductDto): Product {
  return {
    id: dto.id,
    name: dto.name,
    price: dto.price,
    unit: dto.unit ?? '',
    imageUrl: dto.imageUrl ?? dto.image_url ?? '',
    categoryId: dto.categoryId ?? dto.category_id ?? '',
    description: dto.description ?? '',
    rating: dto.rating,
  };
}

export function categoryDtoToDomain(dto: CategoryDto): Category {
  return { id: dto.id, name: dto.name };
}

export function loginDtoToSession(dto: LoginResponseDto): AuthSession {
  const user: User = {
    id: dto.user.id,
    username: dto.user.username,
    name: dto.user.name,
    email: dto.user.email,
  };
  return { token: dto.token, user };
}

/** Order DTO only carries product ids — resolve full products from catalog */
export function orderDtoToDomain(dto: OrderDto, catalog: Product[]): Order {
  const items: CartItem[] = dto.items
    .map((item: OrderItemDto) => {
      const product = catalog.find((p) => p.id === item.product_id);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((i): i is CartItem => i !== null);
  return {
    id: dto.id,
    items,
    total: dto.total,
    currency: dto.currency,
    status: dto.status,
    placedAt: dto.placed_at,
  };
}

/** Enrich an order for display when the catalog lookup misses items */
export function resolveOrderItems(
  productIds: { id: string; quantity: number }[],
  catalog: Product[],
): CartItem[] {
  return productIds
    .map(({ id, quantity }) => {
      const product = catalog.find((p) => p.id === id) ?? fallbackProducts.find((p) => p.id === id);
      return product ? { product, quantity } : null;
    })
    .filter((i): i is CartItem => i !== null);
}
