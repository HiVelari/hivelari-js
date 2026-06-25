import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { PingInfo, Velari, VelariResponse } from '@/index';
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

describe('Velari Client', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.unstubAllGlobals();
  });

  it('should throw an error if window is defined (browser check)', () => {
    vi.stubGlobal('window', {});

    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';

    expect(() => new Velari()).toThrow(
      'This package is server-only and cannot be executed in the browser.',
    );
  });

  it('should throw validation error if required env vars are missing', () => {
    expect(() => new Velari()).toThrow();
  });

  it('should initialize correctly with required env vars', () => {
    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';

    const client = new Velari();
    expect(client.spaceId).toBe('space_123');
    expect(client.pubKey).toBe('pub_123');
    expect(client.baseUrl).toBe('https://api.hivelari.com');
  });

  it('should support overriding baseUrl with VELARI_API_URL', () => {
    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';
    process.env.VELARI_API_URL = 'https://api.custom.com';

    const client = new Velari();
    expect(client.baseUrl).toBe('https://api.custom.com');
  });

  it('should execute ping method and return backend response wrapped in VelariResponse and PingInfo', async () => {
    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';

    const mockResponseData = {
      status: 'ok',
      message: 'pong',
      space: 'space_123',
    };
    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.ping();

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/api/ping' }),
    );
    expect(response).toBeInstanceOf(VelariResponse);
    expect(response.success).toBe(true);
    expect(response.status).toBe(200);
    expect(response.data).toBeInstanceOf(PingInfo);
    expect(response.data.status).toBe('ok');
    expect(response.data.message).toBe('pong');
    expect(response.data.space).toBe('space_123');
  });
});
