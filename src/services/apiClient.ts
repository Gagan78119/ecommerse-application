import { AxiosError, create, type InternalAxiosRequestConfig } from 'axios';

import { config } from '@/config/env';
import { useAuthStore } from '@/stores/authStore';
import type { ApiError } from '@/types';

/**
 * Centralized HTTP client for the future backend.
 * - Base URL + public config come from src/config/env.ts (EXPO_PUBLIC_* vars)
 * - Attaches the persisted auth token automatically
 * - Normalizes every failure into ApiError so repositories/UI never see AxiosError
 */
export const apiClient = create({
  baseURL: config.apiBaseUrl,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((req: InternalAxiosRequestConfig) => {
  const token = useAuthStore.getState().session?.token;
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error?: { code?: string; message?: string }; message?: string }>) => {
    const status = error.response?.status;
    const body = error.response?.data;
    const apiError: ApiError = {
      code: body?.error?.code ?? (status ? `HTTP_${status}` : 'NETWORK_ERROR'),
      message:
        body?.error?.message ??
        body?.message ??
        (error.code === 'ECONNABORTED' ? 'Request timed out' : 'Network request failed'),
      status,
    };
    return Promise.reject(apiError);
  },
);
