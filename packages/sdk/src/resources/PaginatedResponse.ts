import { PaginatedPayload } from '@/types/core';

export class PaginatedResponse<T> {
  readonly data: T[];
  readonly meta: {
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;
  };

  constructor(
    payload: PaginatedPayload<unknown>,
    transformItem: (item: unknown) => T,
  ) {
    this.data = (payload.data || []).map(transformItem);
    this.meta = {
      currentPage: payload.meta?.current_page || 1,
      lastPage: payload.meta?.last_page || 1,
      perPage: payload.meta?.per_page || 15,
      total: payload.meta?.total || 0,
    };
  }

  static fake<T>(
    count: number,
    fakeItem: (index: number) => T,
  ): PaginatedResponse<T> {
    const rawData = Array.from({ length: count }, (_, i) => fakeItem(i));

    return new PaginatedResponse(
      {
        data: rawData,
        meta: {
          current_page: 1,
          last_page: 1,
          per_page: 15,
          total: count,
        },
      },
      (item) => item as T,
    );
  }
}
