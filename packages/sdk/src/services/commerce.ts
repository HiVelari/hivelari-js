import { Velari } from '@/core/client';
import { ListProductsParams } from '@/requests/commerce/ListProduct';
import { PaginatedResponse } from '@/resources/PaginatedResponse';
import { VelariResponse } from '@/resources/VelariResponse';
import { Product } from '@/resources/commerce/Product';
import { CommerceProductPayload } from '@/types/commerce';
import { PaginatedPayload } from '@/types/core';

export class CommerceService {
  constructor(private client: Velari) {}

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
      mock: () =>
        PaginatedResponse.fake(3, (i) =>
          Product.fake({
            id: `prod_mock_${i + 1}`,
            name: `Mock Product ${i + 1}`,
          }),
        ),
    });
  }

  async getProduct(id: string): Promise<VelariResponse<Product>> {
    return this.client.request<Product>({
      method: 'GET',
      url: `/api/commerce/v1/products/${id}`,
      transform: (data: unknown) => {
        const payload = data as { data: CommerceProductPayload };
        return new Product(payload.data);
      },
      mock: () => Product.fake({ id }),
    });
  }
}
