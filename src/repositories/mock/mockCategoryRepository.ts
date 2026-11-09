import type { CategoryRepository } from '@/repositories/contracts';
import { categories } from '@/services/mock/mockData';
import { delay } from '@/services/mock/delay';
import { mockControl } from '@/services/mock/mockControl';
import type { ApiError } from '@/types';

export const mockCategoryRepository: CategoryRepository = {
  async getCategories() {
    await delay(300, 600);
    if (mockControl.failCategories) {
      throw { code: 'MOCK_FAILURE', message: 'Mock failure injected' } satisfies ApiError;
    }
    return categories;
  },
};
