import type { AuthRepository } from '@/repositories/contracts';
import type { ApiResponse, AuthSession, LoginCredentials, LoginResponseDto } from '@/types';
import { apiClient } from '@/services/apiClient';
import { loginDtoToSession } from '@/utils/mappers';

export const apiAuthRepository: AuthRepository = {
  async login(credentials: LoginCredentials): Promise<AuthSession> {
    const { data } = await apiClient.post<ApiResponse<LoginResponseDto>>('/auth/login', credentials);
    return loginDtoToSession(data.data);
  },

  async logout() {
    await apiClient.post('/auth/logout');
  },
};
