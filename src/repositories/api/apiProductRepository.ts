import type { ProductRepository } from '@/repositories/contracts';
import type { ApiResponse, Product, ProductDto } from '@/types';
import { apiClient } from '@/services/apiClient';
import { productDtoToDomain } from '@/utils/mappers';

/**
 * API implementation — matches docs/API_CONTRACT.md proposals.
 * Activated when EXPO_PUBLIC_USE_MOCK_API=false.
 */
export const apiProductRepository: ProductRepository = {
  async getProducts(): Promise<Product[]> {
    const { data } = await apiClient.get<ApiResponse<ProductDto[]>>('/products');
    return data.data.map(productDtoToDomain);
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data } = await apiClient.get<ApiResponse<ProductDto>>(`/products/${id}`);
    return productDtoToDomain(data.data);
  },

  async searchProducts(query: string): Promise<Product[]> {
    const { data } = await apiClient.get<ApiResponse<ProductDto[]>>('/products', {
      params: { q: query },
    });
    return data.data.map(productDtoToDomain);
  },
};
