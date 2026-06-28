# Records

Records endpoints return shared lookup data — categories and currencies. They are publicly accessible; no auth token is required.

Methods live on `client.records`.

## Categories

Returns all active commerce categories as a two-level tree (top-level categories with nested subcategories).

```ts
const response = await client.records.getCategories();
const categories = response.data; // Category[]

for (const category of categories) {
  console.log(category.name, category.slug);

  for (const sub of category.children) {
    console.log('  ', sub.name); // subcategories
  }
}
```

### `Category` resource

| Property | Type | Description |
|---|---|---|
| `id` | `string` | ULID |
| `name` | `string` | Display name |
| `slug` | `string` | URL-safe identifier |
| `parentId` | `string \| null` | `null` for top-level categories |
| `description` | `string \| null` | |
| `isActive` | `boolean` | |
| `children` | `Category[]` | Subcategories (populated for top-level, empty for leaves) |

## Currencies

Returns all active currencies configured in the space, ordered by code.

```ts
const response = await client.records.getCurrencies();
const currencies = response.data; // Currency[]

const usd = currencies.find(c => c.code === 'USD');
console.log(usd?.symbol, usd?.subunitFactor); // '$', 100
```

### `Currency` resource

| Property | Type | Description |
|---|---|---|
| `code` | `string` | ISO 4217 code (e.g. `'USD'`) |
| `countryCode` | `string \| null` | ISO 3166-1 alpha-2 (e.g. `'US'`) |
| `name` | `string` | Full name (e.g. `'United States Dollar'`) |
| `symbol` | `string` | Display symbol (e.g. `'$'`) |
| `subunitName` | `string \| null` | e.g. `'Cent'` |
| `subunitSymbol` | `string \| null` | e.g. `'¢'` |
| `subunitFactor` | `number` | Subunits per major unit — typically `100` |
| `isActive` | `boolean` | |

::: tip Prices
All product prices in the API are expressed in the **smallest currency subunit** (e.g. cents for USD). Divide by `subunitFactor` to get the display value:

```ts
const displayPrice = product.originalPrice / currency.subunitFactor;
// e.g. 1999 / 100 = $19.99
```
:::
