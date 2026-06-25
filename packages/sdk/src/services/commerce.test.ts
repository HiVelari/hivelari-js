import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));

import { PaginatedResponse, Product, Velari, VelariResponse } from '@/index';
import axios from 'axios';

vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    request: vi.fn(),
  };
  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      isAxiosError: vi.fn((err) => err?.isAxiosError === true),
    },
    isAxiosError: vi.fn((err) => err?.isAxiosError === true),
  };
});

describe('Commerce Service', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should list products from backend and return PaginatedResponse<Product>', async () => {
    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';

    const mockResponseData = {
      data: [
        {
          id: 'prod_1',
          name: 'Test Product 1',
          original_price: 1500,
          currency: 'USD',
          type: 'physical',
          visibility: 'public',
        },
      ],
      meta: {
        current_page: 1,
        last_page: 1,
        per_page: 15,
        total: 1,
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.commerce.listProducts({ search: 'Test' });

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/api/commerce/v1/products',
        params: { search: 'Test' },
      }),
    );
    expect(response).toBeInstanceOf(VelariResponse);
    expect(response.success).toBe(true);
    expect(response.data).toBeInstanceOf(PaginatedResponse);
    expect(response.data.data[0]).toBeInstanceOf(Product);
    expect(response.data.data[0].id).toBe('prod_1');
    expect(response.data.data[0].originalPrice).toBe(1500);
  });

  it('should get a single product and return Product', async () => {
    process.env.VELARI_SPACE_ID = 'space_123';
    process.env.VELARI_PUBLIC_KEY = 'pub_123';
    process.env.VELARI_SECRET_KEY = 'sec_123';

    const mockResponseData = {
      data: {
        id: 'prod_1',
        name: 'Test Product 1',
        original_price: 1500,
        currency: 'USD',
        type: 'physical',
        visibility: 'public',
      },
    };

    const mockAxiosInstance = axios.create();
    vi.mocked(mockAxiosInstance.request).mockResolvedValueOnce({
      status: 200,
      data: mockResponseData,
    });

    const client = new Velari();
    const response = await client.commerce.getProduct('prod_1');

    expect(mockAxiosInstance.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/api/commerce/v1/products/prod_1',
      }),
    );
    expect(response.success).toBe(true);
    expect(response.data).toBeInstanceOf(Product);
    expect(response.data.id).toBe('prod_1');
    expect(response.data.name).toBe('Test Product 1');
  });
});
