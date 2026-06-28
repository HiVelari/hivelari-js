import { Velari } from '@/core/client';
import { VelariResponse } from '@/resources/VelariResponse';
import { Category } from '@/resources/records/Category';
import { Currency } from '@/resources/records/Currency';
import { CategoryPayload, CurrencyPayload } from '@/types/records';

/**
 * Records service — access shared lookup data (currencies, categories).
 *
 * Available as `client.records` on any {@link Velari} instance.
 * These endpoints are publicly accessible — no auth token is required.
 */
export class RecordsService {
  constructor(private client: Velari) {}

  /**
   * Fetch all active commerce categories, including their subcategories.
   *
   * Categories are returned as a tree: top-level categories have a populated
   * `children` array; leaf categories have an empty `children` array.
   *
   * @example
   * ```ts
   * const response = await client.records.getCategories();
   * for (const category of response.data) {
   *   console.log(category.name, category.children.map(c => c.name));
   * }
   * ```
   *
   * @throws {VelariError} On API or network errors.
   */
  async getCategories(): Promise<VelariResponse<Category[]>> {
    return this.client.request<Category[]>({
      method: 'GET',
      url: '/api/records/commerce/categories',
      transform: (data) => {
        const items =
          (data as { data: CategoryPayload[] }).data ??
          (data as CategoryPayload[]);
        return items.map((item) => new Category(item));
      },
    });
  }

  /**
   * Fetch all active currencies configured in the space.
   *
   * @example
   * ```ts
   * const response = await client.records.getCurrencies();
   * const usd = response.data.find(c => c.code === 'USD');
   * console.log(usd?.symbol); // '$'
   * ```
   *
   * @throws {VelariError} On API or network errors.
   */
  async getCurrencies(): Promise<VelariResponse<Currency[]>> {
    return this.client.request<Currency[]>({
      method: 'GET',
      url: '/api/records/currencies',
      transform: (data) => {
        const items =
          (data as { data: CurrencyPayload[] }).data ??
          (data as CurrencyPayload[]);
        return items.map((item) => new Currency(item));
      },
    });
  }
}
