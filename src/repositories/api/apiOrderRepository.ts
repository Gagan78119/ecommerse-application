import type { OrderRepository } from '@/repositories/contracts';
import type {
  ApiResponse,
  CartItem,
  Order,
  OrderDto,
  PlaceOrderRequestDto,
} from '@/types';
import { apiClient } from '@/services/apiClient';
import { productRepository } from '@/repositories';
import { orderDtoToDomain } from '@/utils/mappers';

export const apiOrderRepository: OrderRepository = {
  async placeOrder(items: CartItem[]): Promise<Order> {
    const body: PlaceOrderRequestDto = {
      items: items.map((i) => ({ product_id: i.product.id, quantity: i.quantity })),
    };
    const { data } = await apiClient.post<ApiResponse<OrderDto>>('/orders', body);
    const catalog = await productRepository.getProducts();
    return orderDtoToDomain(data.data, catalog);
  },
};
