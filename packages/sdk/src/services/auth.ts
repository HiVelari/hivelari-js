import { Velari } from '@/core/client';
import { VelariResponse } from '@/resources/VelariResponse';
import {
  AuthResponsePayload,
  AuthUserPayload,
  LoginParams,
  RegisterParams,
  SocialExchangeTokenParams,
  UpdateProfileParams,
} from '@/types/auth';

export class AuthService {
  constructor(private client: Velari) {}

  async login(
    params: LoginParams,
  ): Promise<VelariResponse<AuthResponsePayload>> {
    const response = await this.client.request<AuthResponsePayload>({
      method: 'POST',
      url: '/api/auth/v1/login',
      data: params,
      transform: (data) => data as AuthResponsePayload,
    });

    if (response.success && response.data?.token) {
      this.client.setToken(response.data.token);
      this.client.setAuthUser(response.data.user);
    }

    return response;
  }

  async register(
    params: RegisterParams,
  ): Promise<VelariResponse<AuthResponsePayload>> {
    const response = await this.client.request<AuthResponsePayload>({
      method: 'POST',
      url: '/api/auth/v1/register',
      data: params,
      transform: (data) => data as AuthResponsePayload,
    });

    if (response.success && response.data?.token) {
      this.client.setToken(response.data.token);
      this.client.setAuthUser(response.data.user);
    }

    return response;
  }

  async socialRedirectUrl(
    provider: string,
  ): Promise<VelariResponse<{ redirect_url: string }>> {
    return this.client.request<{ redirect_url: string }>({
      method: 'GET',
      url: `/api/auth/v1/social/${provider}/redirect-url`,
      transform: (data) => data as { redirect_url: string },
    });
  }

  async exchangeSocialToken(
    provider: string,
    params: SocialExchangeTokenParams,
  ): Promise<VelariResponse<AuthResponsePayload>> {
    const response = await this.client.request<AuthResponsePayload>({
      method: 'POST',
      url: `/api/auth/v1/social/${provider}/exchange-token`,
      data: params,
      transform: (data) => data as AuthResponsePayload,
    });

    if (response.success && response.data?.token) {
      this.client.setToken(response.data.token);
      this.client.setAuthUser(response.data.user);
    }

    return response;
  }

  async initiatePasswordRecovery(params: {
    email: string;
    redirect_url: string;
  }): Promise<VelariResponse<{ success: boolean }>> {
    return this.client.request<{ success: boolean }>({
      method: 'POST',
      url: '/api/auth/v1/password-recovery/initiate',
      data: params,
      transform: (data) => data as { success: boolean },
    });
  }

  async logout(): Promise<VelariResponse<{ success: boolean }>> {
    const response = await this.client.request<{ success: boolean }>({
      method: 'POST',
      url: '/api/auth/v1/logout',
      transform: (data) => data as { success: boolean },
    });

    if (response.success) {
      this.client.setToken(undefined);
      this.client.setAuthUser(undefined);
    }

    return response;
  }

  async initiateEmailVerification(): Promise<
    VelariResponse<{ success: boolean }>
  > {
    return this.client.request<{ success: boolean }>({
      method: 'POST',
      url: '/api/auth/v1/email-verification/initiate',
      transform: (data) => data as { success: boolean },
    });
  }

  async getProfile(): Promise<VelariResponse<AuthUserPayload>> {
    const response = await this.client.request<AuthUserPayload>({
      method: 'GET',
      url: '/api/auth/v1/profile',
      transform: (data) =>
        (data as { data: AuthUserPayload }).data || (data as AuthUserPayload),
    });

    if (response.success) {
      this.client.setAuthUser(response.data);
    }

    return response;
  }

  async updateProfile(
    params: UpdateProfileParams,
  ): Promise<VelariResponse<AuthUserPayload>> {
    const response = await this.client.request<AuthUserPayload>({
      method: 'PUT',
      url: '/api/auth/v1/profile',
      data: params,
      transform: (data) =>
        (data as { data: AuthUserPayload }).data || (data as AuthUserPayload),
    });

    if (response.success) {
      this.client.setAuthUser(response.data);
    }

    return response;
  }
}
