import { getValidatedEnv } from '@/env';
import { VelariError } from '@/errors';
import { PingInfo } from '@/resources/PingInfo';
import { VelariResponse } from '@/resources/VelariResponse';
import { CommerceService } from '@/services/commerce';
import axios, { type AxiosInstance, isAxiosError } from 'axios';

export interface RequestOptions<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: unknown;
  params?: unknown;
  transform: (data: unknown) => T;
  mock: () => T;
}

export class Velari {
  private axiosInstance: AxiosInstance;
  readonly spaceId: string;
  readonly pubKey: string;
  readonly baseUrl: string;
  readonly isTestMode: boolean;
  readonly commerce: CommerceService;

  constructor() {
    const envVal = getValidatedEnv();

    this.spaceId = envVal.VELARI_SPACE_ID;
    this.pubKey = envVal.VELARI_PUBLIC_KEY;
    this.baseUrl = envVal.VELARI_API_URL;
    this.isTestMode = envVal.HIVELARI_TEST_MODE;

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

    this.commerce = new CommerceService(this);
  }

  public async request<T>(
    options: RequestOptions<T>,
  ): Promise<VelariResponse<T>> {
    if (this.isTestMode) {
      await new Promise((resolve) => setTimeout(resolve, 200));
      const fakedData = options.mock();
      return new VelariResponse(true, 200, fakedData);
    }

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
      mock: () => PingInfo.fake({ space: this.spaceId }),
    });
  }
}
