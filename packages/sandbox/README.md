# @hivelari/sandbox

Local mock API server that replicates the HiVelari API for development and testing. Built with [SimAPI](https://simapi.dev).

Use it to develop against the SDK without needing a live HiVelari space or network access.

## Running

```bash
# One-shot (production-like, no file watching)
pnpm --filter @hivelari/sandbox run serve

# Development (file watching + auto-restart)
pnpm --filter @hivelari/sandbox run dev
```

The server starts on **<http://localhost:3001>**.

## Pointing the SDK at the sandbox

Set `VELARI_API_URL` in your app's `.env`:

```env
VELARI_API_URL=http://localhost:3001
```

The SDK will then target the sandbox instead of the live API.

---

## Available endpoints

All endpoints require the `X-HVL-SPACEID`, `X-HVL-PUBKEY`, and `X-HVL-SECKEY` headers (any non-empty values are accepted in sandbox mode).

### Utility

| Method | Path        | Description                                               |
| ------ | ----------- | --------------------------------------------------------- |
| `GET`  | `/api/ping` | Health check — returns `{ status: 'ok', message, space }` |

### Auth (`/api/auth/v1`)

| Method | Path                                           | Description                                            |
| ------ | ---------------------------------------------- | ------------------------------------------------------ |
| `POST` | `/api/auth/v1/register`                        | Register a new user                                    |
| `POST` | `/api/auth/v1/login`                           | Login with email + password                            |
| `POST` | `/api/auth/v1/logout`                          | Revoke the active session token                        |
| `GET`  | `/api/auth/v1/profile`                         | Get authenticated user profile                         |
| `PUT`  | `/api/auth/v1/profile`                         | Update authenticated user profile                      |
| `POST` | `/api/auth/v1/password-recovery/initiate`      | Simulate sending a recovery email                      |
| `POST` | `/api/auth/v1/email-verification/initiate`     | Simulate sending a verification email                  |
| `GET`  | `/api/auth/v1/social/:provider/redirect-url`   | Get OAuth redirect URL                                 |
| `POST` | `/api/auth/v1/social/:provider/exchange-token` | Exchange provider token for session                    |
| `GET`  | `/api/_social-auth`                            | **Sandbox-only** — simulates the OAuth callback screen |

#### Social OAuth flow (sandbox)

1. Call `client.auth.socialRedirectUrl(provider, callbackUrl)` to get a redirect URL.
2. Open the redirect URL in a browser — the sandbox shows a mock OAuth screen.
3. Clicking through generates an encrypted `code` and redirects to your `callbackUrl?code=...`.
4. Exchange the code with `client.auth.authenticateUsingCode(code)` or via the Next.js `handleSocialAuthCallback` route handler.

### Commerce (`/api/commerce/v1`)

| Method | Path                            | Description                           |
| ------ | ------------------------------- | ------------------------------------- |
| `GET`  | `/api/commerce/v1/products`     | List products (paginated, filterable) |
| `GET`  | `/api/commerce/v1/products/:id` | Get a single product by ID            |

Products are seeded with 25 stable fake items on startup (seeded with `faker.seed(42)`).

**Query parameters for list products:**

| Param      | Type     | Description                         |
| ---------- | -------- | ----------------------------------- |
| `search`   | `string` | Filter by name/description/category |
| `page`     | `number` | Page number (default: 1)            |
| `per_page` | `number` | Items per page (default: 15)        |

### Records (`/api/records`)

| Method | Path                               | Description                               |
| ------ | ---------------------------------- | ----------------------------------------- |
| `GET`  | `/api/records/commerce/categories` | List active categories with subcategories |
| `GET`  | `/api/records/currencies`          | List active currencies                    |

---

## Mock data

- **Products** — 25 stable items generated on startup via Faker (seeded).
- **Users** — created on-the-fly via `/register`; stored in an in-memory SQLite database that resets on restart.
- **Sessions** — token-to-email map stored in memory; cleared on restart.
- **Categories** — 3 top-level categories with subcategories, hardcoded.
- **Currencies** — 4 currencies (EUR, GBP, NGN, USD), hardcoded.

---

## Adding endpoints

Create a new file in `src/endpoints/`. SimAPI auto-discovers all `EndpointDefinition` exports from that directory.

```ts
// src/endpoints/my-endpoint.ts
import { AppResponse, type EndpointDefinition } from "@simapi/simapi";

export const myEndpoint: EndpointDefinition = {
  path: "/api/my-resource",
  method: "GET",
  type: "secure",
  title: "My Resource",
  description: "Returns something useful.",
  handler: () => AppResponse.success({ hello: "world" }),
};
```

## Adding models

Place model types and factory functions in `src/models/`. Use the `@models/` path alias in endpoints:

```ts
import { myResource } from "@models/my-resource.js";
```
