import { getValidatedEnv } from '@/env';
import { VelariError } from '@/errors';
import { PingInfo } from '@/resources/PingInfo';
import { VelariResponse } from '@/resources/VelariResponse';
import { AuthService } from '@/services/auth';
import { CommerceService } from '@/services/commerce';
import type { AuthUserPayload } from '@/types/auth';
import axios, { type AxiosInstance, isAxiosError } from 'axios';

export interface RequestOptions<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: unknown;
  params?: unknown;
  transform: (data: unknown) => T;
}

export class Velari {
  private axiosInstance: AxiosInstance;
  private token?: string;
  private authUser?: AuthUserPayload;

  readonly spaceId: string;
  readonly pubKey: string;
  readonly baseUrl: string;

  readonly commerce: CommerceService;
  readonly auth: AuthService;

  constructor(options?: { token?: string; user?: AuthUserPayload }) {
    const envVal = getValidatedEnv();

    this.spaceId = envVal.VELARI_SPACE_ID;
    this.pubKey = envVal.VELARI_PUBLIC_KEY;
    this.baseUrl = envVal.VELARI_API_URL;

    if (options?.token) this.token = options.token;

    if (options?.user) this.authUser = options.user;

    this.axiosInstance = axios.create({
      baseURL: envVal.VELARI_API_URL,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-HVL-SPACEID': envVal.VELARI_SPACE_ID,
        'X-HVL-PUBKEY': envVal.VELARI_PUBLIC_KEY,
        'X-HVL-SECKEY': envVal.VELARI_SECRET_KEY,
      },
    });

    // Request interceptor to append authorization token if present
    this.axiosInstance.interceptors.request.use((config) => {
      if (this.token) config.headers.Authorization = `Bearer ${this.token}`;

      return config;
    });

    this.commerce = new CommerceService(this);
    this.auth = new AuthService(this);
  }

  public setToken(token: string | undefined): void {
    this.token = token;
  }

  public setAuthUser(user: AuthUserPayload | undefined): void {
    this.authUser = user;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public user(): AuthUserPayload | undefined {
    return this.authUser;
  }

  public getToken(): string | undefined {
    return this.token;
  }

  public async request<T>(
    options: RequestOptions<T>,
  ): Promise<VelariResponse<T>> {
    try {
      const response = await this.axiosInstance.request({
        method: options.method,
        url: options.url,
        data: options.data,
        params: options.params,
      });

      const transformedData = options.transform(response.data);
      return new VelariResponse(true, response.status, transformedData);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const data = error.response.data as {
          message?: string;
          errors?: Record<string, string[]>;
        };
        throw new VelariError(
          data?.message || `Request to ${options.url} failed`,
          error.response.status,
          data?.errors,
        );
      }
      const message =
        error instanceof Error
          ? error.message
          : `Request to ${options.url} failed`;
      throw new VelariError(message);
    }
  }

  async ping(): Promise<VelariResponse<PingInfo>> {
    return this.request<PingInfo>({
      method: 'GET',
      url: '/api/ping',
      transform: (data) =>
        new PingInfo(
          data as { status: string; message: string; space: string },
        ),
    });
  }
}
