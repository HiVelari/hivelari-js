/**
 * Raw paginated payload shape returned by list API endpoints.
 * Transformed into {@link PaginatedResponse} by the SDK.
 *
 * @template T The raw item type before transformation.
 */
export interface PaginatedPayload<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
