import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/constants/app';
import { productRepository } from '@/repositories';

/** Single product by id — returns null data when not found. */
export function useProduct(id: string) {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => productRepository.getProductById(id),
    enabled: id.length > 0,
  });
}
