import { Velari } from '@/core/client';
import { ListProductsParams } from '@/requests/commerce/ListProduct';
import { PaginatedResponse } from '@/resources/PaginatedResponse';
import { VelariResponse } from '@/resources/VelariResponse';
import { Product } from '@/resources/commerce/Product';
import { CommerceProductPayload } from '@/types/commerce';
import { PaginatedPayload } from '@/types/core';

/**
 * Commerce service — access products and related commerce data.
 *
 * Available as `client.commerce` on any {@link Velari} instance.
 */
export class CommerceService {
  constructor(private client: Velari) {}

  /**
   * Fetch a paginated list of products.
   *
   * @example
   * ```ts
   * const response = await client.commerce.listProducts({ search: 'hoodie', per_page: 20 });
   * const { data: products, meta } = response.data;
   * console.log(`${meta.total} products found, showing page ${meta.currentPage}/${meta.lastPage}`);
   * ```
   *
   * @throws {VelariError} On API or network errors.
   */
  async listProducts(
    params?: ListProductsParams,
  ): Promise<VelariResponse<PaginatedResponse<Product>>> {
    return this.client.request<PaginatedResponse<Product>>({
      method: 'GET',
      url: '/api/commerce/v1/products',
      params,
      transform: (data) =>
        new PaginatedResponse(
          data as PaginatedPayload<unknown>,
          (item) => new Product(item as CommerceProductPayload),
        ),
    });
  }

  /**
   * Fetch a single product by ID.
   *
   * @param id The product's ULID.
   *
   * @example
   * ```ts
   * const response = await client.commerce.getProduct('01HXYZ...');
   * const product = response.data;
   * console.log(product.name, product.originalPrice);
   * ```
   *
   * @throws {VelariError} With status `404` when the product does not exist.
   */
  async getProduct(id: string): Promise<VelariResponse<Product>> {
    return this.client.request<Product>({
      method: 'GET',
      url: `/api/commerce/v1/products/${id}`,
      transform: (data: unknown) => {
        const payload = data as { data: CommerceProductPayload };
        return new Product(payload.data);
      },
    });
  }
}
