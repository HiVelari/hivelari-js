# Getting Started

## Prerequisites

- Node.js 18+
- A HiVelari space — get your API keys from the HiVelari dashboard
- pnpm (recommended) or npm/yarn

## Choose your package

| Use case               | Install                              |
| ---------------------- | ------------------------------------ |
| Any Node.js server     | `@hivelari/sdk`                      |
| Next.js app            | `@hivelari/nextjs` + `@hivelari/sdk` |
| Local development mock | `@hivelari/sandbox`                  |

## Environment variables

All packages read from the same environment variables:

```env
VELARI_SPACE_ID=your_space_id
VELARI_PUBLIC_KEY=your_public_key
VELARI_SECRET_KEY=your_secret_key

# Optional — defaults to https://api.hivelari.com
# Set to http://localhost:3001 to use the local sandbox
VELARI_API_URL=https://api.hivelari.com
```

::: info VELARI_SECRET_KEY in Next.js
`@hivelari/nextjs` reuses `VELARI_SECRET_KEY` as the AES-256-CBC key for cookie encryption. No additional environment variable is needed.
:::

::: warning
Never expose `VELARI_SECRET_KEY` to the browser. The SDK is server-only.
:::

## Quick install — Next.js

```bash
pnpm add @hivelari/nextjs @hivelari/sdk
```

Create a shared client module using top-level `await`:

```ts
// lib/velari.ts
import { VelariNext } from "@hivelari/nextjs";

const hivelari = await VelariNext.init();
export default hivelari;
```

Use it in a server component:

```ts
// app/products/page.tsx
import hivelari from '@/lib/velari';

export default async function ProductsPage() {
  const { data } = await hivelari.commerce.listProducts();
  return <pre>{JSON.stringify(data.data, null, 2)}</pre>;
}
```

Start the local sandbox (optional):

```bash
pnpm --filter @hivelari/sandbox run serve
# → http://localhost:3001
```

Set `VELARI_API_URL=http://localhost:3001` in `.env.local` and you're developing against local mock data.

## Quick install — Node.js (SDK only)

```bash
pnpm add @hivelari/sdk
```

```ts
import { Velari } from "@hivelari/sdk";

const client = new Velari();
const { data } = await client.commerce.listProducts();
```

## Next steps

- [SDK reference →](/sdk/overview)
- [Next.js integration →](/nextjs/overview)
- [Sandbox endpoints →](/sandbox/overview)
