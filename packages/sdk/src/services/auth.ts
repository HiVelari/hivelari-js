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

/**
 * Auth service — login, register, social OAuth, profile, and session management.
 *
 * Available as `client.auth` on any {@link Velari} instance.
 * For Next.js, `@hivelari/nextjs` wraps these methods with automatic cookie persistence.
 */
export class AuthService {
  constructor(private client: Velari) {}

  /**
   * Authenticate with email and password.
   * On success, sets the client's active token and user.
   *
   * @example
   * ```ts
   * const response = await client.auth.login({ email: 'user@example.com', password: 'secret' });
   * if (response.success) {
   *   console.log(response.data.user.email);
   * }
   * ```
   *
   * @throws {VelariError} With status `401` on invalid credentials.
   */
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

  /**
   * Register a new user account.
   * On success, sets the client's active token and user.
   *
   * @throws {VelariError} With status `422` on validation failures (e.g. duplicate email).
   */
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

  /**
   * Get the OAuth redirect URL for a social provider.
   * Redirect the user's browser to `response.data.redirect_url` to start the OAuth flow.
   *
   * @param provider    Social provider slug (e.g. `'google'`, `'github'`).
   * @param redirectUrl Callback URL to return the user to after OAuth completes.
   *
   * @example
   * ```ts
   * const response = await client.auth.socialRedirectUrl('google', 'https://myapp.com/auth/callback');
   * redirect(response.data.redirect_url);
   * ```
   */
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

  /**
   * Exchange an encrypted short-lived code for a session.
   *
   * The code is produced by the HiVelari server's social OAuth callback and
   * contains an AES-encrypted JSON payload with `{ token, user, expires_at }`.
   * This method decrypts it locally — no additional network request is made.
   *
   * For Next.js, prefer `client.auth.exchangeCode()` from `@hivelari/nextjs`
   * which also persists the resulting session to cookies.
   *
   * @throws {VelariError} If the code is expired or cannot be decrypted.
   */
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

  /**
   * Exchange a provider access token for a HiVelari session token.
   * Used when your app handles the OAuth flow itself and obtains the provider token directly.
   *
   * @param provider Social provider slug (e.g. `'google'`).
   * @param params   The provider access token.
   *
   * @throws {VelariError} On invalid or expired provider tokens.
   */
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

  /**
   * Initiate a password recovery email for the given address.
   *
   * @param params.email        The account email.
   * @param params.redirect_url Where to send the user after clicking the recovery link.
   */
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

  /**
   * Log out the current user.
   * Revokes the session token on the server, then clears the client's token and user.
   *
   * For Next.js, use `client.auth.logout()` from `@hivelari/nextjs` which also
   * deletes session cookies.
   *
   * @throws {VelariError} With status `401` if the token is already invalid.
   */
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

  /**
   * Send an email verification link to the authenticated user.
   * Requires an active session token.
   *
   * @throws {VelariError} With status `401` if the user is not authenticated.
   */
  async initiateEmailVerification(): Promise<
    VelariResponse<{ success: boolean }>
  > {
    return this.client.request<{ success: boolean }>({
      method: 'POST',
      url: '/api/auth/v1/email-verification/initiate',
      transform: (data) => data as { success: boolean },
    });
  }

  /**
   * Fetch the authenticated user's full profile from the API.
   * Updates the in-memory user on the client on success.
   *
   * @throws {VelariError} With status `401` if the user is not authenticated.
   */
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

  /**
   * Update the authenticated user's profile fields.
   * Updates the in-memory user on the client on success.
   *
   * Pass only the fields you want to change — all fields are optional.
   *
   * @throws {VelariError} With status `422` on validation failures.
   */
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
