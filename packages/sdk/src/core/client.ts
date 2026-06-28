import crypto from 'node:crypto';
import { getValidatedEnv } from '@/env';
import { VelariError } from '@/errors';
import { PingInfo } from '@/resources/PingInfo';
import { VelariResponse } from '@/resources/VelariResponse';
import { AuthService } from '@/services/auth';
import { CommerceService } from '@/services/commerce';
import { RecordsService } from '@/services/records';
import type { AuthUserPayload } from '@/types/auth';
import axios, { type AxiosInstance, isAxiosError } from 'axios';

/**
 * Options for a raw API request. Used internally by service classes.
 * @internal
 */
export interface RequestOptions<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  data?: unknown;
  params?: unknown;
  /** Map the raw API response body to a typed resource. */
  transform: (data: unknown) => T;
}

/**
 * The core HiVelari API client.
 *
 * Reads configuration from environment variables at instantiation time.
 * This class is **server-only** — never import it in browser code.
 *
 * ## Environment variables
 * | Variable | Description |
 * |---|---|
 * | `VELARI_SPACE_ID` | Your HiVelari space identifier |
 * | `VELARI_PUBLIC_KEY` | Space public key |
 * | `VELARI_SECRET_KEY` | Space secret key (keep server-side only) |
 * | `VELARI_API_URL` | API base URL (defaults to `https://api.hivelari.com`) |
 *
 * ## Usage
 * ```ts
 * import { Velari } from '@hivelari/sdk';
 *
 * const client = new Velari();
 *
 * // With a pre-existing auth token:
 * const client = new Velari({ token: 'hvl_tok_...', user: { ... } });
 * ```
 *
 * For Next.js projects, use `@hivelari/nextjs` which handles session
 * hydration from cookies automatically via `VelariNext.init()`.
 */
export class Velari {
  private axiosInstance: AxiosInstance;
  private token?: string;
  private authUser?: AuthUserPayload;
  private readonly secretKey: string;

  /** The space ID resolved from `VELARI_SPACE_ID`. */
  readonly spaceId: string;

  /** The public key resolved from `VELARI_PUBLIC_KEY`. */
  readonly pubKey: string;

  /** The API base URL resolved from `VELARI_API_URL`. */
  readonly baseUrl: string;

  /** Commerce service: products, categories. */
  readonly commerce: CommerceService;

  /** Records service: currencies, commerce categories. */
  readonly records: RecordsService;

  /** Auth service: login, register, OAuth, profile management. */
  readonly auth: AuthService;

  constructor(options?: { token?: string; user?: AuthUserPayload }) {
    const envVal = getValidatedEnv();

    this.spaceId = envVal.VELARI_SPACE_ID;
    this.pubKey = envVal.VELARI_PUBLIC_KEY;
    this.baseUrl = envVal.VELARI_API_URL;
    this.secretKey = envVal.VELARI_SECRET_KEY;

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
    this.records = new RecordsService(this);
    this.auth = new AuthService(this);
  }

  /**
   * Encrypt a UTF-8 string with AES-256-CBC using the space secret key.
   * The IV is prepended to the cipher text; the whole thing is Base64-encoded.
   *
   * Used internally for social OAuth code payloads and (optionally) cookie values.
   */
  public encrypt(data: string): string {
    const keyBuf = Buffer.alloc(32);
    const srcBuf = Buffer.from(this.secretKey, 'utf8');
    srcBuf.copy(keyBuf, 0, 0, Math.min(srcBuf.length, 32));

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', keyBuf, iv);
    let encrypted = cipher.update(data, 'utf8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return Buffer.concat([iv, encrypted]).toString('base64');
  }

  /**
   * Decrypt a Base64-encoded AES-256-CBC payload produced by {@link encrypt}.
   *
   * @throws {Error} If the payload is too short or decryption fails.
   */
  public decrypt(payload: string): string {
    const keyBuf = Buffer.alloc(32);
    const srcBuf = Buffer.from(this.secretKey, 'utf8');
    srcBuf.copy(keyBuf, 0, 0, Math.min(srcBuf.length, 32));

    const raw = Buffer.from(payload, 'base64');
    if (raw.length < 16) {
      throw new Error('Invalid encrypted payload size.');
    }
    const iv = raw.subarray(0, 16);
    const encrypted = raw.subarray(16);

    const decipher = crypto.createDecipheriv('aes-256-cbc', keyBuf, iv);
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  }

  /** Set the active session token. Subsequent requests will include `Authorization: Bearer <token>`. */
  public setToken(token: string | undefined): void {
    this.token = token;
  }

  /** Set the active authenticated user payload. */
  public setAuthUser(user: AuthUserPayload | undefined): void {
    this.authUser = user;
  }

  /** Returns `true` when a session token is present on the client. */
  public isAuthenticated(): boolean {
    return !!this.token;
  }

  /** Returns the authenticated user's payload, or `undefined`. */
  public user(): AuthUserPayload | undefined {
    return this.authUser;
  }

  /** Returns the active session token, or `undefined`. */
  public getToken(): string | undefined {
    return this.token;
  }

  /**
   * Execute a raw API request and return a {@link VelariResponse}.
   *
   * Prefer using the typed service methods (`client.commerce.*`, `client.auth.*`, etc.)
   * over calling this directly.
   *
   * @throws {VelariError} On any non-2xx response or network failure.
   */
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

  /**
   * Ping the API to verify connectivity and space configuration.
   *
   * @example
   * ```ts
   * const { data } = await client.ping();
   * console.log(data.status); // 'ok'
   * ```
   */
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
