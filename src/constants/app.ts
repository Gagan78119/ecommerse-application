/** AsyncStorage keys used by persisted Zustand stores. */
export const storageKeys = {
  authSession: 'nxtmart.auth.session',
} as const;

/** TanStack Query keys — single source so invalidation stays consistent. */
export const queryKeys = {
  products: ['products'] as const,
  product: (id: string) => ['product', id] as const,
  categories: ['categories'] as const,
} as const;

/** Simulated network latency ranges for mock repositories (ms) */
export const mockLatency = { min: 400, max: 800 } as const;
