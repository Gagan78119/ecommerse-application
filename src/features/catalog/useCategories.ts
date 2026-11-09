import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/app';
import { categoryRepository } from '@/repositories';

export function useCategories() {
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: () => categoryRepository.getCategories(),
  });
}
