import type {
  AuthRepository,
  CategoryRepository,
  OrderRepository,
  ProductRepository,
} from './contracts';
import { config } from '@/config/env';
import { mockAuthRepository } from './mock/mockAuthRepository';
import { mockCategoryRepository } from './mock/mockCategoryRepository';
import { mockOrderRepository } from './mock/mockOrderRepository';
import { mockProductRepository } from './mock/mockProductRepository';
import { apiAuthRepository } from './api/apiAuthRepository';
import { apiCategoryRepository } from './api/apiCategoryRepository';
import { apiOrderRepository } from './api/apiOrderRepository';
import { apiProductRepository } from './api/apiProductRepository';

/**
 * Repository switch — the single seam between mock and real backend.
 *
 * Mock mode (default):  EXPO_PUBLIC_USE_MOCK_API=true  (or unset)
 * API mode:             EXPO_PUBLIC_USE_MOCK_API=false + EXPO_PUBLIC_API_BASE_URL set
 *
 * Screens and hooks import repositories from HERE only.
 */
const useMock = config.useMockApi;

if (__DEV__ && !useMock && !config.apiBaseUrl) {
  console.warn('[NxtMart] EXPO_PUBLIC_USE_MOCK_API=false but EXPO_PUBLIC_API_BASE_URL is empty — API calls will fail.');
}

export const productRepository: ProductRepository = useMock
  ? mockProductRepository
  : apiProductRepository;

export const categoryRepository: CategoryRepository = useMock
  ? mockCategoryRepository
  : apiCategoryRepository;

export const authRepository: AuthRepository = useMock
  ? mockAuthRepository
  : apiAuthRepository;

export const orderRepository: OrderRepository = useMock
  ? mockOrderRepository
  : apiOrderRepository;
