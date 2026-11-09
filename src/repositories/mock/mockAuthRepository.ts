import type { AuthRepository } from '@/repositories/contracts';
import type { ApiError, AuthSession } from '@/types';
import { delay } from '@/services/mock/delay';
import { mockControl } from '@/services/mock/mockControl';

/**
 * Mock auth: any non-empty username/password succeeds.
 * Returns a fake token + user. Replace with ApiAuthRepository for real auth.
 */
export const mockAuthRepository: AuthRepository = {
  async login({ username }): Promise<AuthSession> {
    await delay(600, 1000);
    if (mockControl.failLogin) {
      throw { code: 'AUTH_FAILED', message: 'Invalid username or password' } satisfies ApiError;
    }
    const name = username
      .split(/[\s._-]+/)
      .filter(Boolean)
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(' ');
    return {
      token: `mock-token-${Date.now()}`,
      user: {
        id: `user-${username.toLowerCase()}`,
        username,
        name: name || username,
        email: `${username.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      },
    };
  },

  async logout() {
    await delay(100, 300);
  },
};
