/** Parameters for `auth.login()`. */
export interface LoginParams {
  email: string;
  password?: string;
}

/** Parameters for `auth.register()`. */
export interface RegisterParams {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  email: string;
  phone?: string | null;
  password?: string;
  password_confirmation?: string;
}

/** Parameters for `auth.exchangeSocialToken()`. */
export interface SocialExchangeTokenParams {
  access_token: string;
}

/** Parameters for `auth.updateProfile()`. */
export interface UpdateProfileParams {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  phone?: string | null;
  email?: string;
  password?: string;
  password_confirmation?: string;
  /** ID of the user's avatar media record, or `null` to remove. */
  avatar_id?: string | null;
}

/** Authenticated user's public profile, as returned by the API. */
export interface AuthUserPayload {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  username: string | null;
  email: string;
  phone: string | null;
  avatar_id: string | null;
}

/** Response body for login, register, and social token exchange. */
export interface AuthResponsePayload {
  token: string;
  user: AuthUserPayload;
}
