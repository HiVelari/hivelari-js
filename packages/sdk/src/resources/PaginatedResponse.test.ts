import { PaginatedResponse } from '@/resources/PaginatedResponse';
import { describe, expect, it } from 'vitest';

describe('PaginatedResponse Resource', () => {
  it('should parse raw paginated response data correctly', () => {
    const rawPayload = {
      data: [1, 2, 3],
      meta: {
        current_page: 2,
        last_page: 5,
        per_page: 10,
        total: 50,
      },
    };

    const paginated = new PaginatedResponse<number>(
      rawPayload,
      (item) => Number(item) * 2,
    );

    expect(paginated.data).toEqual([2, 4, 6]);
    expect(paginated.meta.currentPage).toBe(2);
    expect(paginated.meta.lastPage).toBe(5);
    expect(paginated.meta.perPage).toBe(10);
    expect(paginated.meta.total).toBe(50);
  });

  it('should construct a fake response using fake static builder', () => {
    const faked = PaginatedResponse.fake(5, (index) => `item_${index}`);

    expect(faked.data).toEqual([
      'item_0',
      'item_1',
      'item_2',
      'item_3',
      'item_4',
    ]);
    expect(faked.meta.currentPage).toBe(1);
    expect(faked.meta.lastPage).toBe(1);
    expect(faked.meta.perPage).toBe(15);
    expect(faked.meta.total).toBe(5);
  });
});
