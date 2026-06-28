# @hivelari/sdk

Official TypeScript SDK for the HiVelari platform. Server-only — never import this in browser code.

## Installation

```bash
pnpm add @hivelari/sdk
```

## Environment variables

| Variable            | Required | Description                                          |
| ------------------- | -------- | ---------------------------------------------------- |
| `VELARI_SPACE_ID`   | ✓        | Your HiVelari space identifier                       |
| `VELARI_PUBLIC_KEY` | ✓        | Space public key                                     |
| `VELARI_SECRET_KEY` | ✓        | Space secret key (keep server-side only)             |
| `VELARI_API_URL`    | —        | API base URL. Defaults to `https://api.hivelari.com` |

Point `VELARI_API_URL` to `http://localhost:3001` during development to target the local sandbox.

## Quick start

```ts
import { Velari } from "@hivelari/sdk";

const client = new Velari();

// Ping the API
const ping = await client.ping();
console.log(ping.data.status); // 'ok'
```

---

## Auth (`client.auth`)

### Login

```ts
const response = await client.auth.login({
  email: "user@example.com",
  password: "secret",
});
if (response.success) {
  const { token, user } = response.data;
}
```

### Register

```ts
const response = await client.auth.register({
  email: "user@example.com",
  password: "secret",
  password_confirmation: "secret",
  first_name: "Ada",
  last_name: "Lovelace",
});
```

### Social OAuth

```ts
// 1. Get the redirect URL for the provider
const { data } = await client.auth.socialRedirectUrl(
  "google",
  "https://myapp.com/auth/callback",
);
// 2. Redirect the user to data.redirect_url
// 3. On callback, exchange the encrypted code
const session = await client.auth.authenticateUsingCode(code);
```

### Profile

```ts
const profile = await client.auth.getProfile();
await client.auth.updateProfile({ first_name: "Ada" });
```

### Logout

```ts
await client.auth.logout();
```

---

## Commerce (`client.commerce`)

### List products

```ts
const response = await client.commerce.listProducts({
  search: "hoodie",
  type: "physical",
  sort: "price_asc",
  per_page: 20,
  page: 1,
});
const { data: products, meta } = response.data;
// meta.total, meta.currentPage, meta.lastPage, meta.perPage
```

### Get a single product

```ts
const response = await client.commerce.getProduct("01HXYZ...");
const product = response.data;
console.log(product.name, product.originalPrice, product.salePrice);
```

#### `Product` properties

| Property        | Type             | Description                                |
| --------------- | ---------------- | ------------------------------------------ |
| `id`            | `string`         | ULID                                       |
| `name`          | `string`         | Display name                               |
| `currency`      | `string`         | ISO 4217 code                              |
| `originalPrice` | `number`         | Price in subunits                          |
| `salePrice`     | `number \| null` | Sale price in subunits                     |
| `type`          | `string`         | `'physical'` \| `'digital'` \| `'service'` |
| `visibility`    | `string`         | `'public'` \| `'private'` \| `'unlisted'`  |
| `categoryId`    | `string \| null` |                                            |
| `images`        | `ProductImage[]` |                                            |
| `files`         | `ProductFile[]`  | For digital products                       |

---

## Records (`client.records`)

### Categories

```ts
const response = await client.records.getCategories();
for (const category of response.data) {
  console.log(category.name); // top-level category
  for (const sub of category.children) {
    console.log("  ", sub.name); // subcategory
  }
}
```

### Currencies

```ts
const response = await client.records.getCurrencies();
const usd = response.data.find((c) => c.code === "USD");
console.log(usd?.symbol, usd?.subunitFactor); // '$', 100
```

---

## Error handling

All methods throw `VelariError` on failure:

```ts
import { VelariError } from "@hivelari/sdk";

try {
  await client.commerce.getProduct("invalid-id");
} catch (error) {
  if (error instanceof VelariError) {
    console.error(error.status); // e.g. 404
    console.error(error.message); // e.g. 'Product not found'
    console.error(error.errors); // field-level validation errors (422 responses)
  }
}
```

---

## Response wrapper

Every method returns `VelariResponse<T>`:

```ts
interface VelariResponse<T> {
  success: boolean; // true for 2xx responses
  status: number; // HTTP status code
  data: T; // typed payload
}
```

---

## Next.js

For Next.js projects, use [`@hivelari/nextjs`](../nextjs/README.md) which wraps this SDK with automatic cookie-based session management.
