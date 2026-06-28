# Commerce

Commerce methods live on `client.commerce`. The commerce service requires a space configured for commerce (`space:commerce` middleware on the server).

## List products

```ts
const response = await client.commerce.listProducts({
  search: 'hoodie',
  type: 'physical',
  sort: 'price_asc',
  per_page: 20,
  page: 1,
});

const { data: products, meta } = response.data;
// products: Product[]
// meta: { currentPage, lastPage, perPage, total }
```

### Query parameters

| Param | Type | Description |
|---|---|---|
| `search` | `string` | Full-text filter across name, description, category |
| `category_id` | `string` | Filter by category ID |
| `custom_category` | `string` | Filter by free-text custom category |
| `type` | `string` | `'physical'` \| `'digital'` \| `'service'` |
| `min_price` | `number` | Minimum price in subunits (e.g. cents) |
| `max_price` | `number` | Maximum price in subunits |
| `sort` | `string` | `'price_asc'` \| `'price_desc'` \| `'latest'` |
| `per_page` | `number` | Items per page — default `15` |
| `page` | `number` | Page number (1-indexed) — default `1` |

## Get a product

```ts
const response = await client.commerce.getProduct('01HXYZ...');
const product = response.data;
```

**Throws** `VelariError` with status `404` when the product does not exist.

## `Product` resource

| Property | Type | Description |
|---|---|---|
| `id` | `string` | ULID |
| `name` | `string` | Display name |
| `currency` | `string` | ISO 4217 code |
| `originalPrice` | `number` | Price in subunits |
| `salePrice` | `number \| null` | Sale price in subunits |
| `description` | `string \| null` | |
| `categoryId` | `string \| null` | |
| `customCategory` | `string \| null` | |
| `type` | `string` | `'physical'` \| `'digital'` \| `'service'` |
| `visibility` | `string` | `'public'` \| `'private'` \| `'unlisted'` |
| `requiresApproval` | `boolean` | |
| `limitPurchase` | `number \| null` | Max purchases per user |
| `redirectOnPurchase` | `string \| null` | URL to redirect after purchase |
| `physicalUnit` | `string \| null` | Unit of measure (physical only) |
| `physicalQuantityAvailable` | `number \| null` | Stock count (physical only) |
| `serviceDurationMinutes` | `number \| null` | Session length (service only) |
| `serviceRequiresBooking` | `boolean \| null` | (service only) |
| `serviceDeliveryTimeframe` | `string \| null` | (service only) |
| `files` | `ProductFile[]` | Downloadable files (digital only) |
| `images` | `ProductImage[]` | |

### `ProductFile`

| Property | Type |
|---|---|
| `id` | `string` |
| `fileId` | `string` |
| `title` | `string \| null` |
| `description` | `string \| null` |
| `license` | `string \| null` |
| `media` | `unknown` |

### `ProductImage`

| Property | Type |
|---|---|
| `id` | `string` |
| `imageId` | `string` |
| `alt` | `string \| null` |
| `media` | `unknown` |

## Pagination

List endpoints return a `PaginatedResponse<T>`:

```ts
const page = response.data;

page.data           // T[] — current page items
page.meta.total     // total item count
page.meta.currentPage
page.meta.lastPage
page.meta.perPage
```

### Fake responses for tests

```ts
import { PaginatedResponse } from '@hivelari/sdk';

const fake = PaginatedResponse.fake(5, (i) => new Product({
  id: `prod_${i}`,
  name: `Product ${i}`,
  // ...
}));
```
