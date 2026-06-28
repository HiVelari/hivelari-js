/**
 * Query parameters for `client.commerce.listProducts()`.
 *
 * All fields are optional — omit any you don't need.
 */
export interface ListProductsParams {
  /** Full-text search across product name, description, and category. */
  search?: string;

  /** Filter by category ID. */
  category_id?: string;

  /** Filter by free-text custom category label. */
  custom_category?: string;

  /** Filter by product type: `'physical'`, `'digital'`, or `'service'`. */
  type?: string;

  /** Minimum price in the smallest currency unit (e.g. cents). */
  min_price?: number;

  /** Maximum price in the smallest currency unit (e.g. cents). */
  max_price?: number;

  /** Sort order. */
  sort?: 'price_asc' | 'price_desc' | 'latest';

  /** Items per page. Defaults to 15. */
  per_page?: number;

  /** Page number (1-indexed). Defaults to 1. */
  page?: number;
}
