import { faker } from '@simapi/simapi';

export interface AuthUser {
  id: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  username: string | null;
  email: string;
  phone: string | null;
  avatar_id: string | null;
  password?: string;
}

// In-memory user database starting with a stable mock user
export const usersDb: Map<string, AuthUser> = new Map([
  [
    'jane.doe@example.com',
    {
      id: 'usr_mock_1',
      first_name: 'Jane',
      middle_name: 'E.',
      last_name: 'Doe',
      username: 'jane',
      email: 'jane.doe@example.com',
      phone: '+1234567890',
      avatar_id: null,
      password: 'Password123!',
    },
  ],
]);

// In-memory session store (maps Bearer Token -> User Email)
export const sessionsDb: Map<string, string> = new Map([
  ['hvl_tok_mock_login_token_12345', 'jane.doe@example.com'],
]);

export function makeUser(overrides: Partial<AuthUser> = {}): AuthUser {
  const email = overrides.email || faker.internet.email();
  const user: AuthUser = {
    id: overrides.id || `usr_${faker.string.alphanumeric(10)}`,
    first_name:
      overrides.first_name === undefined
        ? faker.person.firstName()
        : overrides.first_name,
    middle_name:
      overrides.middle_name === undefined ? null : overrides.middle_name,
    last_name:
      overrides.last_name === undefined
        ? faker.person.lastName()
        : overrides.last_name,
    username:
      overrides.username === undefined
        ? faker.internet.username()
        : overrides.username,
    email,
    phone:
      overrides.phone === undefined ? faker.phone.number() : overrides.phone,
    avatar_id: overrides.avatar_id === undefined ? null : overrides.avatar_id,
    password: overrides.password || 'Password123!',
  };

  usersDb.set(email, user);
  return user;
}
