import type { ResolvedVelariNextOptions } from '@/types';
import type {
  AuthResponsePayload,
  AuthService,
  AuthUserPayload,
  LoginParams,
  RegisterParams,
  SocialExchangeTokenParams,
  UpdateProfileParams,
  Velari,
} from '@hivelari/sdk';
import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

const TOKEN_COOKIE = 'velari_token';
const USER_COOKIE = 'velari_user';

/**
 * Next.js-aware auth service that wraps {@link AuthService} with automatic
 * cookie-based session persistence.
 *
 * Obtained via `client.auth` after calling {@link VelariNext.init}.
 */
export class NextAuthService {
  constructor(
    private readonly base: AuthService,
    private readonly sdk: Velari,
    private readonly options: ResolvedVelariNextOptions,
  ) {}

  /**
   * Authenticate with email and password.
   * On success, writes `velari_token` and `velari_user` cookies automatically.
   */
  async login(params: LoginParams) {
    const response = await this.base.login(params);
    if (response.success && response.data) {
      await this.persistSession(response.data);
    }
    return response;
  }

  /**
   * Register a new user account.
   * On success, writes `velari_token` and `velari_user` cookies automatically.
   */
  async register(params: RegisterParams) {
    const response = await this.base.register(params);
    if (response.success && response.data) {
      await this.persistSession(response.data);
    }
    return response;
  }

  /**
   * Log the current user out.
   * On success, deletes `velari_token` and `velari_user` cookies automatically.
   */
  async logout() {
    const response = await this.base.logout();

    if (response.success) await this.clearSession();

    return response;
  }

  /**
   * Update the authenticated user's profile.
   * On success, refreshes the `velari_user` cookie with the latest data.
   */
  async updateProfile(params: UpdateProfileParams) {
    const response = await this.base.updateProfile(params);

    if (response.success && response.data) {
      await this.persistUser(response.data);
    }

    return response;
  }

  /**
   * Exchange an encrypted social OAuth code for a session.
   * On success, writes session cookies automatically.
   *
   * This is the preferred method for server actions. For route handlers, use
   * {@link handleSocialAuthCallback} instead.
   */
  async exchangeCode(code: string) {
    const response = await this.base.authenticateUsingCode(code);

    if (response.success && response.data) {
      await this.persistSession(response.data);
    }

    return response;
  }

  /**
   * Exchange a provider access token for a HiVelari session token.
   * On success, writes session cookies automatically.
   */
  async exchangeSocialToken(
    provider: string,
    params: SocialExchangeTokenParams,
  ) {
    const response = await this.base.exchangeSocialToken(provider, params);

    if (response.success && response.data) {
      await this.persistSession(response.data);
    }

    return response;
  }

  /**
   * Handle the social OAuth redirect callback inside a Next.js route handler.
   *
   * Reads the `code` query parameter from the incoming request, exchanges it
   * for a session (persisting cookies), and returns a `Response`:
   * - If `social.autoRedirect` is `true` (default): issues an HTTP redirect to
   *   `social.loginSuccessRedirect` on success, or `social.loginFailedRedirect`
   *   on failure. Falls back to `'/'` when success redirect is not configured.
   * - If `social.autoRedirect` is `false`: returns a JSON body with
   *   `{ success, user? }` so you can drive navigation from the client.
   *
   * @example
   * ```ts
   * // app/auth/callback/route.ts
   * import { getVelariClient } from '@/lib/velari';
   * import { type NextRequest } from 'next/server';
   *
   * export async function GET(request: NextRequest) {
   *   const client = await getVelariClient();
   *   return client.auth.handleSocialAuthCallback(request);
   * }
   * ```
   */
  async handleSocialAuthCallback(request: NextRequest): Promise<Response> {
    const code = request.nextUrl.searchParams.get('code');

    const { autoRedirect, loginSuccessRedirect, loginFailedRedirect } =
      this.options.social;

    if (!code) {
      return this.callbackResponse(
        false,
        autoRedirect,
        request,
        loginFailedRedirect,
        { error: 'Missing code parameter.', status: 400 },
      );
    }

    try {
      const response = await this.exchangeCode(code);

      if (response.success) {
        return this.callbackResponse(
          true,
          autoRedirect,
          request,
          loginSuccessRedirect ?? '/',
          { data: { success: true, user: response.data?.user }, status: 200 },
        );
      }

      return this.callbackResponse(
        false,
        autoRedirect,
        request,
        loginFailedRedirect,
        { error: 'Authentication failed.', status: 401 },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Authentication failed.';

      return this.callbackResponse(
        false,
        autoRedirect,
        request,
        loginFailedRedirect,
        { error: message, status: 500 },
      );
    }
  }

  /**
   * Get the OAuth redirect URL for a social provider.
   *
   * @param provider - e.g. `'google'`, `'github'`
   * @param redirectUrl - The callback URL to send the provider back to after auth.
   */
  socialRedirectUrl(provider: string, redirectUrl: string) {
    return this.base.socialRedirectUrl(provider, redirectUrl);
  }

  /**
   * Initiate a password recovery email for the given address.
   */
  initiatePasswordRecovery(params: { email: string; redirect_url: string }) {
    return this.base.initiatePasswordRecovery(params);
  }

  /**
   * Send an email verification link to the authenticated user.
   */
  initiateEmailVerification() {
    return this.base.initiateEmailVerification();
  }

  /**
   * Fetch the authenticated user's profile from the API.
   */
  getProfile() {
    return this.base.getProfile();
  }

  // -------------------------------------------------------------------------
  // Private helpers
  // -------------------------------------------------------------------------

  private async persistSession(data: AuthResponsePayload) {
    const cookieStore = await cookies();
    const opts = this.cookieOpts();

    cookieStore.set(TOKEN_COOKIE, this.encode(data.token), opts);
    cookieStore.set(USER_COOKIE, this.encode(JSON.stringify(data.user)), opts);
  }

  private async persistUser(user: AuthUserPayload) {
    const cookieStore = await cookies();

    cookieStore.set(
      USER_COOKIE,
      this.encode(JSON.stringify(user)),
      this.cookieOpts(),
    );
  }

  private async clearSession() {
    const cookieStore = await cookies();

    cookieStore.delete(TOKEN_COOKIE);
    cookieStore.delete(USER_COOKIE);
  }

  private encode(value: string): string {
    return this.options.encryptCookies ? this.sdk.encrypt(value) : value;
  }

  private cookieOpts() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: this.options.cookieMaxAge,
    };
  }

  private callbackResponse(
    success: boolean,
    autoRedirect: boolean,
    request: NextRequest,
    redirectUrl: string | undefined,
    json: { data?: unknown; error?: string; status: number },
  ): Response {
    if (autoRedirect && redirectUrl) {
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    if (success) {
      return NextResponse.json(json.data ?? { success: true }, {
        status: json.status,
      });
    }

    return NextResponse.json(
      { success: false, error: json.error },
      { status: json.status },
    );
  }
}
