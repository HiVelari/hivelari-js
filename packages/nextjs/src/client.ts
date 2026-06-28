import 'server-only';
import { NextAuthService } from '@/services/auth';
import type { ResolvedVelariNextOptions, VelariNextOptions } from '@/types';
import type {
  AuthUserPayload,
  CommerceService,
  RecordsService,
} from '@hivelari/sdk';
import { Velari } from '@hivelari/sdk';
import { cookies } from 'next/headers';

/**
 * Next.js-aware HiVelari client.
 *
 * Wraps {@link Velari} with cookie-based session management. Use the static
 * {@link VelariNext.init} factory — never call `new VelariNext()` directly.
 *
 * @example
 * ```ts
 * // lib/velari.ts
 * import { VelariNext } from '@hivelari/nextjs';
 *
 * export async function getVelariClient() {
 *   return VelariNext.init();
 * }
 * ```
 */
export class VelariNext {
  /** Next.js-aware auth service with automatic cookie persistence. */
  readonly auth: NextAuthService;

  /** Commerce service — same API as the raw SDK. */
  readonly commerce: CommerceService;

  /** Records service (currencies, categories) — same API as the raw SDK. */
  readonly records: RecordsService;

  /** Resolved configuration with all defaults applied. */
  readonly options: ResolvedVelariNextOptions;

  private readonly _sdk: Velari;

  private constructor(sdk: Velari, options: ResolvedVelariNextOptions) {
    this._sdk = sdk;
    this.options = options;
    this.auth = new NextAuthService(sdk.auth, sdk, options);
    this.commerce = sdk.commerce;
    this.records = sdk.records;
  }

  /**
   * Create a {@link VelariNext} instance, hydrating the session from cookies.
   *
   * Call this at the top of every server component, server action, or route
   * handler that needs the HiVelari client. The returned instance is stateless
   * and safe to create on every request.
   *
   * @example
   * ```ts
   * const client = await VelariNext.init();
   * // or with custom options:
   * const client = await VelariNext.init({
   *   encryptCookies: true,
   *   social: { loginSuccessRedirect: '/dashboard', loginFailedRedirect: '/login' },
   *   auth:   { loginSuccessRedirect: '/dashboard', logoutRedirect: '/login' },
   * });
   * ```
   */
  static async init(options?: VelariNextOptions): Promise<VelariNext> {
    const resolved: ResolvedVelariNextOptions = {
      encryptCookies: options?.encryptCookies ?? true,
      cookieMaxAge: options?.cookieMaxAge ?? 60 * 60 * 24 * 7,
      auth: options?.auth ?? {},
      social: {
        loginSuccessRedirect: options?.social?.loginSuccessRedirect,
        loginFailedRedirect: options?.social?.loginFailedRedirect,
        autoRedirect: options?.social?.autoRedirect ?? true,
      },
    };

    const sdk = new Velari();
    const cookieStore = await cookies();

    const rawToken = cookieStore.get('velari_token')?.value;
    if (rawToken) {
      try {
        const token = resolved.encryptCookies
          ? sdk.decrypt(rawToken)
          : rawToken;
        sdk.setToken(token);
      } catch {
        // corrupted cookie — skip
      }
    }

    const rawUser = cookieStore.get('velari_user')?.value;
    if (rawUser) {
      try {
        const json = resolved.encryptCookies ? sdk.decrypt(rawUser) : rawUser;
        sdk.setAuthUser(JSON.parse(json) as AuthUserPayload);
      } catch {}
    }

    return new VelariNext(sdk, resolved);
  }

  /** Ping the API to verify connectivity and space configuration. */
  ping() {
    return this._sdk.ping();
  }

  /** Returns `true` when a session token is present in the current request. */
  isAuthenticated() {
    return this._sdk.isAuthenticated();
  }

  /** Returns the authenticated user's payload, or `undefined` if not authenticated. */
  user() {
    return this._sdk.user();
  }

  /** Returns the raw session token, or `undefined` if not authenticated. */
  getToken() {
    return this._sdk.getToken();
  }

  /**
   * Override the session token on the underlying SDK instance.
   * Prefer using `auth.login()` or `auth.exchangeCode()` which also persist cookies.
   */
  setToken(token: string | undefined) {
    this._sdk.setToken(token);
  }

  /**
   * Override the auth user on the underlying SDK instance.
   * Prefer using `auth.login()` or `auth.updateProfile()` which also persist cookies.
   */
  setAuthUser(user: AuthUserPayload | undefined) {
    this._sdk.setAuthUser(user);
  }

  /**
   * Encrypt a string with AES-256-CBC using the configured Velari secret key.
   * The same algorithm used for cookie values when `encryptCookies` is `true`.
   */
  encrypt(data: string) {
    return this._sdk.encrypt(data);
  }

  /**
   * Decrypt a string previously encrypted with {@link encrypt}.
   */
  decrypt(data: string) {
    return this._sdk.decrypt(data);
  }

  /** The space ID from environment config. */
  get spaceId() {
    return this._sdk.spaceId;
  }

  /** The public key from environment config. */
  get pubKey() {
    return this._sdk.pubKey;
  }

  /** The API base URL from environment config. */
  get baseUrl() {
    return this._sdk.baseUrl;
  }
}
