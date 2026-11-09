import { QueryClient } from '@tanstack/react-query';

/**
 * Shared QueryClient. Defaults are tuned for a grocery catalog:
 * staleTime keeps lists fresh-feeling without refetch storms;
 * retry once so transient mock/network blips self-heal.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
