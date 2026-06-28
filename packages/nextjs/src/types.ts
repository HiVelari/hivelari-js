/**
 * Social OAuth flow configuration.
 */
export interface VelariSocialConfig {
  /**
   * URL to redirect to after a successful social OAuth callback.
   * Defaults to `'/'` when `autoRedirect` is `true` and this is not set.
   */
  loginSuccessRedirect?: string;

  /**
   * URL to redirect to after a failed or invalid social OAuth callback.
   * When unset and `autoRedirect` is `true`, a JSON error response is returned instead.
   */
  loginFailedRedirect?: string;

  /**
   * When `true` (default), `handleSocialAuthCallback()` issues an HTTP redirect.
   * Set to `false` to receive a JSON response and handle navigation yourself.
   *
   * @default true
   */
  autoRedirect?: boolean;
}

/**
 * Auth flow configuration — redirect targets for login, register, and logout.
 * These are surfaced via `client.options.auth` for your server actions to use.
 */
export interface VelariAuthConfig {
  /**
   * URL to redirect to after a successful login or register.
   * Read from `client.options.auth.loginSuccessRedirect` in your server actions.
   */
  loginSuccessRedirect?: string;

  /**
   * URL to redirect to after logout.
   * Read from `client.options.auth.logoutRedirect` in your server actions.
   */
  logoutRedirect?: string;
}

/**
 * Options accepted by {@link VelariNext.init}.
 */
export interface VelariNextOptions {
  /**
   * Encrypt cookie values with AES-256-CBC using the Velari secret key before writing,
   * and decrypt them on read. Defaults to `true`.
   *
   * When disabled, `velari_token` and `velari_user` are stored as plain strings.
   *
   * @default true
   */
  encryptCookies?: boolean;

  /**
   * Cookie `Max-Age` in seconds.
   *
   * @default 604800 (7 days)
   */
  cookieMaxAge?: number;

  /** Auth flow redirect configuration. */
  auth?: VelariAuthConfig;

  /** Social OAuth flow configuration. */
  social?: VelariSocialConfig;
}

/**
 * Fully-resolved version of {@link VelariNextOptions} — all fields present with defaults applied.
 * Exposed as `client.options` after {@link VelariNext.init}.
 */
export interface ResolvedVelariNextOptions {
  encryptCookies: boolean;
  cookieMaxAge: number;
  auth: VelariAuthConfig;
  social: VelariSocialConfig & { autoRedirect: boolean };
}
