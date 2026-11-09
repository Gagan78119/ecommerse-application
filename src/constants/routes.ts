/** Route paths — always navigate via these constants, never raw strings. */
export const routes = {
  login: '/login',
  home: '/',
  cart: '/(tabs)/cart',
  product: (id: string) =>
    ({ pathname: '/product/[id]', params: { id } }) as const,
  orderSuccess: '/order-success',
} as const;
