import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/app';
import { productRepository } from '@/repositories';

/** Full product catalog — cached by TanStack Query, shared across screens. */
export function useProducts() {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: () => productRepository.getProducts(),
  });
}
