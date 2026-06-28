# Sandbox — Overview

`@hivelari/sandbox` is a local mock API server that replicates the HiVelari server API. Point the SDK at `http://localhost:3001` during development to iterate without hitting the real API.

## Start the server

```bash
pnpm --filter @hivelari/sandbox run serve
```

The server starts on **port 3001**. Point the SDK at it by setting:

```bash
VELARI_BASE_URL=http://localhost:3001
```

## Architecture

The sandbox is built on [`@simapi/simapi`](https://github.com/simapi/simapi), a lightweight mock-server framework. It auto-discovers all endpoint files in `src/endpoints/` — adding a new file immediately registers new routes.

```
packages/sandbox/
└── src/
    └── endpoints/
        ├── auth.ts          # /api/auth/*
        ├── commerce.ts      # /api/commerce/*
        └── records.ts       # /api/records/*
```

## Available endpoints

### Auth — `/api/auth`

| Method | Path | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Returns a mock token + user |
| `POST` | `/api/auth/register` | Returns a mock token + user |
| `POST` | `/api/auth/logout` | Clears session (stateless — always 200) |
| `GET` | `/api/auth/me` | Returns the mock user |
| `GET` | `/api/_social-auth` | Simulates OAuth provider screen |

### Commerce — `/api/commerce`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/commerce/products` | Paginated product list |
| `GET` | `/api/commerce/products/:id` | Single product |

### Records — `/api/records`

| Method | Path | Description |
|---|---|---|
| `GET` | `/api/records/commerce/categories` | Category tree (3 top-level, each with subcategories) |
| `GET` | `/api/records/currencies` | 4 currencies: EUR, GBP, NGN, USD |

## Adding a new endpoint

Create a new file (or add to an existing one) in `src/endpoints/`:

```ts
// src/endpoints/my-domain.ts
import { defineEndpoint } from '@simapi/simapi';

export default defineEndpoint({
  path: '/api/my-domain/resource',
  method: 'GET',
  handler(req, res) {
    return res.json({
      data: [{ id: '1', name: 'Mock item' }],
    });
  },
});
```

SimAPI picks it up automatically on the next server start — no registration step needed.

## Mock data

All mock data is hardcoded in the endpoint handlers. The sandbox is intentionally stateless — it does not persist data between requests. This keeps it predictable for tests and demos.

To simulate realistic pagination, the commerce endpoints accept `page` and `per_page` query params and slice the hardcoded array accordingly.
