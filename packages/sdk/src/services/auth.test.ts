import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { Velari, VelariResponse } from '@/index';
import axios from 'axios';

vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    request: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn(),
      },
    },
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      isAxiosError: vi.fn((err) => err?.isAxiosError === true),
    },
    isAxiosError: vi.fn((err) => err?.isAxiosError === true),
  };
});

describe('Auth Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      VELARI_SPACE_ID: 'space_123',
      VELARI_PUBLIC_KEY: 'pub_123',
      VELARI_SECRET_KEY: 'sec_123',
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should authenticate user and store token/user on login', async () => {
    const mockResponseData = {
      token: 'jwt_token_123',
      user: {
        id: 'user_1',
        first_name: 'John',
        middle_name: null,
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john@example.com',
        phone: null,
        avatar_id: null,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.login({
      email: 'john@example.com',
      password: 'password123',
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/login',
        data: { email: 'john@example.com', password: 'password123' },
      }),
    );
    expect(response).toBeInstanceOf(VelariResponse);
    expect(response.success).toBe(true);
    expect(client.isAuthenticated()).toBe(true);
    expect(client.getToken()).toBe('jwt_token_123');
    expect(client.user()).toEqual(mockResponseData.user);
  });

  it('should authenticate user and store token/user on register', async () => {
    const mockResponseData = {
      token: 'jwt_token_456',
      user: {
        id: 'user_2',
        first_name: 'Jane',
        middle_name: null,
        last_name: 'Doe',
        username: 'janedoe',
        email: 'jane@example.com',
        phone: null,
        avatar_id: null,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 201,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.register({
      first_name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      password: 'password123',
      password_confirmation: 'password123',
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/register',
      }),
    );
    expect(response.success).toBe(true);
    expect(client.isAuthenticated()).toBe(true);
    expect(client.getToken()).toBe('jwt_token_456');
    expect(client.user()).toEqual(mockResponseData.user);
  });

  it('should retrieve redirect URL for social provider', async () => {
    const mockResponseData = {
      redirect_url: 'https://github.com/login/oauth/authorize?state=xyz',
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.socialRedirectUrl(
      'github',
      'http://localhost:3000/callback',
    );

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/api/auth/v1/social/github/redirect-url',
      }),
    );
    expect(response.success).toBe(true);
    expect(response.data.redirect_url).toBe(mockResponseData.redirect_url);
  });

  it('should exchange social token and store credentials', async () => {
    const mockResponseData = {
      token: 'social_jwt_token',
      user: {
        id: 'user_3',
        first_name: 'Social',
        middle_name: null,
        last_name: 'User',
        username: 'socialuser',
        email: 'social@example.com',
        phone: null,
        avatar_id: null,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.exchangeSocialToken('github', {
      access_token: 'auth_code_123',
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/social/github/exchange-token',
        data: { access_token: 'auth_code_123' },
      }),
    );
    expect(response.success).toBe(true);
    expect(client.getToken()).toBe('social_jwt_token');
    expect(client.user()).toEqual(mockResponseData.user);
  });

  it('should initiate password recovery', async () => {
    const mockResponseData = { success: true };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.initiatePasswordRecovery({
      email: 'user@example.com',
      redirect_url: 'https://example.com/reset',
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/password-recovery/initiate',
      }),
    );
    expect(response.success).toBe(true);
    expect(response.data.success).toBe(true);
  });

  it('should clear authentication state on logout', async () => {
    const mockResponseData = { success: true };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari({
      token: 'active_token',
      user: {
        id: 'user_1',
        first_name: 'User',
        middle_name: null,
        last_name: null,
        username: null,
        email: 'user@example.com',
        phone: null,
        avatar_id: null,
      },
    });
    expect(client.isAuthenticated()).toBe(true);

    const response = await client.auth.logout();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/logout',
      }),
    );
    expect(response.success).toBe(true);
    expect(client.isAuthenticated()).toBe(false);
    expect(client.getToken()).toBeUndefined();
    expect(client.user()).toBeUndefined();
  });

  it('should initiate email verification', async () => {
    const mockResponseData = { success: true };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.initiateEmailVerification();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/api/auth/v1/email-verification/initiate',
      }),
    );
    expect(response.success).toBe(true);
  });

  it('should retrieve profile and update local user instance', async () => {
    const mockResponseData = {
      data: {
        id: 'user_1',
        first_name: 'Updated',
        middle_name: null,
        last_name: 'Name',
        username: 'updatedname',
        email: 'user@example.com',
        phone: null,
        avatar_id: null,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.getProfile();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'GET',
        url: '/api/auth/v1/profile',
      }),
    );
    expect(response.success).toBe(true);
    expect(client.user()).toEqual(mockResponseData.data);
  });

  it('should update profile and local user instance', async () => {
    const mockResponseData = {
      data: {
        id: 'user_1',
        first_name: 'New Profile Name',
        middle_name: null,
        last_name: null,
        username: null,
        email: 'newemail@example.com',
        phone: null,
        avatar_id: null,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.auth.updateProfile({
      first_name: 'New Profile Name',
      email: 'newemail@example.com',
    });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'PUT',
        url: '/api/auth/v1/profile',
        data: { first_name: 'New Profile Name', email: 'newemail@example.com' },
      }),
    );
    expect(response.success).toBe(true);
    expect(client.user()).toEqual(mockResponseData.data);
  });

  describe('Social Auth & Encryption Utilities', () => {
    it('should encrypt and decrypt strings correctly', () => {
      const client = new Velari();
      const originalText = 'Hello Velari Cryptography!';
      const encrypted = client.encrypt(originalText);
      expect(encrypted).not.toBe(originalText);

      const decrypted = client.decrypt(encrypted);
      expect(decrypted).toBe(originalText);
    });

    it('should call socialRedirectUrl with redirect_url parameter', async () => {
      const mockResponseData = {
        redirect_url: 'https://github.com/login/oauth/authorize?state=xyz',
      };

      const mockAxiosInstance = axios.create();
      vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
        status: 200,
        data: mockResponseData,
      });

      const client = new Velari();
      const response = await client.auth.socialRedirectUrl(
        'github',
        'http://localhost:3000/callback',
      );

      expect(mockAxiosInstance.request).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          url: '/api/auth/v1/social/github/redirect-url',
          params: { redirect_url: 'http://localhost:3000/callback' },
        }),
      );
      expect(response.success).toBe(true);
      expect(response.data.redirect_url).toBe(mockResponseData.redirect_url);
    });

    it('should authenticate user using encrypted session code', async () => {
      const client = new Velari();
      const mockUser = {
        id: 'usr_social_99',
        first_name: 'Social',
        middle_name: null,
        last_name: 'Tester',
        username: 'social_tester',
        email: 'social@example.com',
        phone: null,
        avatar_id: null,
      };

      const sessionPayload = {
        token: 'hvl_tok_social_session_123',
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) + 60,
      };

      const encryptedCode = client.encrypt(JSON.stringify(sessionPayload));

      const response = await client.auth.authenticateUsingCode(encryptedCode);

      expect(response.success).toBe(true);
      expect(response.data.token).toBe('hvl_tok_social_session_123');
      expect(client.isAuthenticated()).toBe(true);
      expect(client.getToken()).toBe('hvl_tok_social_session_123');
      expect(client.user()).toEqual(mockUser);
    });

    it('should throw an error if the social session code has expired', async () => {
      const client = new Velari();
      const mockUser = {
        id: 'usr_social_99',
        first_name: 'Social',
        middle_name: null,
        last_name: 'Tester',
        username: 'social_tester',
        email: 'social@example.com',
        phone: null,
        avatar_id: null,
      };

      const sessionPayload = {
        token: 'hvl_tok_social_session_123',
        user: mockUser,
        expires_at: Math.floor(Date.now() / 1000) - 10, // Expired 10s ago
      };

      const encryptedCode = client.encrypt(JSON.stringify(sessionPayload));

      await expect(
        client.auth.authenticateUsingCode(encryptedCode),
      ).rejects.toThrow('Authentication session has expired.');
    });
  });
});
