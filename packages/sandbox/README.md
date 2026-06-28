# @hivelari/sandbox

Local mock API server that replicates the HiVelari API for development and testing. Built with [SimAPI](https://simapi.dev).

Use it to develop against the SDK without a live HiVelari space or network access.

## Running

```bash
pnpm --filter @hivelari/sandbox run serve
```

The server starts on **http://localhost:3001**.

## Point the SDK at the sandbox

```env
# .env.local
VELARI_API_URL=http://localhost:3001
```

## Quick example

```ts
import { Velari } from '@hivelari/sdk';

// With VELARI_API_URL=http://localhost:3001
const client = new Velari();

const products = await client.commerce.listProducts(); // hits mock server
const categories = await client.records.getCategories();
```

## Full documentation

Endpoint reference and guide for adding custom endpoints at **[sdk.hivelari.com](https://sdk.hivelari.com)**.

## Contributing

PRs and issues welcome at [github.com/HiVelari/hivelari-js](https://github.com/HiVelari/hivelari-js).
