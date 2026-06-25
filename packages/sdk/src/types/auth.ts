export interface LoginParams {
  email: string;
  password?: string;
}

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

export interface SocialExchangeTokenParams {
  access_token: string;
}

export interface UpdateProfileParams {
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  username?: string | null;
  phone?: string | null;
  email?: string;
  password?: string;
  password_confirmation?: string;
  avatar_id?: string | null;
}

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

export interface AuthResponsePayload {
  token: string;
  user: AuthUserPayload;
}
