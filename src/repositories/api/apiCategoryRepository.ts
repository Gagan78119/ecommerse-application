import type { CategoryRepository } from '@/repositories/contracts';
import type { ApiResponse, CategoryDto } from '@/types';
import { apiClient } from '@/services/apiClient';
import { categoryDtoToDomain } from '@/utils/mappers';

export const apiCategoryRepository: CategoryRepository = {
  async getCategories() {
    const { data } = await apiClient.get<ApiResponse<CategoryDto[]>>('/categories');
    return data.data.map(categoryDtoToDomain);
  },
};
