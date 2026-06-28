import { PaginatedPayload } from '@/types/core';

/**
 * A page of results returned by list endpoints.
 *
 * @template T The item type in the current page.
 *
 * @example
 * ```ts
 * const response = await client.commerce.listProducts({ per_page: 20, page: 2 });
 * const page = response.data;
 *
 * console.log(page.data);          // Product[]
 * console.log(page.meta.total);    // Total number of items across all pages
 * console.log(page.meta.lastPage); // Total page count
 * ```
 */
export class PaginatedResponse<T> {
  /** The items in the current page. */
  readonly data: T[];

  /** Pagination metadata. */
  readonly meta: {
    /** The current page number (1-indexed). */
    currentPage: number;
    /** The last available page number. */
    lastPage: number;
    /** Items per page. */
    perPage: number;
    /** Total item count across all pages. */
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

  /**
   * Build a fake paginated response for tests and Storybook stories.
   *
   * @param count   Number of items to generate.
   * @param fakeItem Factory called with the item index.
   *
   * @example
   * ```ts
   * const page = PaginatedResponse.fake(5, (i) => new Product({ id: `prod_${i}`, ... }));
   * ```
   */
  static fake<T>(
    count: number,
    fakeItem: (index: number) => T,
  ): PaginatedResponse<T> {
    const rawData = Array.from({ length: count }, (_, i) => fakeItem(i));

    return new PaginatedResponse(
      {
        data: rawData,
        meta: { current_page: 1, last_page: 1, per_page: 15, total: count },
      },
      (item) => item as T,
    );
  }
}
