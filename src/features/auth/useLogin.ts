import { useState } from 'react';
import { router } from 'expo-router';

import { routes } from '@/constants/routes';
import { authRepository } from '@/repositories';
import { useAuthStore } from '@/stores/authStore';
import type { ApiError } from '@/types';

/**
 * Login flow: validate (React Hook Form) → authRepository.login →
 * authStore.setSession → replace to tabs. Mock mode always succeeds
 * for valid input; API mode returns real auth responses.
 */
export function useLogin() {
  const setSession = useAuthStore((s) => s.setSession);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function submit(username: string, password: string) {
    setIsSubmitting(true);
    setServerError(null);
    try {
      const session = await authRepository.login({ username, password });
      setSession(session);
      router.replace(routes.home);
    } catch (err) {
      const apiError = err as ApiError;
      setServerError(apiError.message ?? 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return { submit, isSubmitting, serverError, clearError: () => setServerError(null) };
}
