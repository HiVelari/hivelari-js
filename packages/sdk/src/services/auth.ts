import { Velari } from '@/core/client';
import { VelariError } from '@/errors';
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
    redirectUrl: string,
  ): Promise<VelariResponse<{ redirect_url: string }>> {
    return this.client.request<{ redirect_url: string }>({
      method: 'GET',
      url: `/api/auth/v1/social/${provider}/redirect-url`,
      params: { redirect_url: redirectUrl },
      transform: (data) =>
        (data as { data: { redirect_url: string } }).data ||
        (data as { redirect_url: string }),
    });
  }

  async authenticateUsingCode(
    code: string,
  ): Promise<VelariResponse<AuthResponsePayload>> {
    try {
      const decrypted = this.client.decrypt(code);
      const session = JSON.parse(decrypted) as {
        token: string;
        user: AuthUserPayload;
        expires_at: number;
      };

      if (session.expires_at * 1000 < Date.now()) {
        throw new Error('Authentication session has expired.');
      }

      this.client.setToken(session.token);
      this.client.setAuthUser(session.user);

      return new VelariResponse<AuthResponsePayload>(true, 200, {
        token: session.token,
        user: session.user,
      });
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Authentication session decryption failed.';
      throw new VelariError(message);
    }
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
