# @hivelari/sdk — Overview

`@hivelari/sdk` is the official server-only TypeScript client for the HiVelari API.

## Features

- Fully typed resources (`Product`, `Category`, `Currency`, …)
- AES-256-CBC encrypt/decrypt helpers (used for social OAuth codes)
- Paginated response wrapper with typed metadata
- Unified `VelariError` with status codes and field-level validation errors
- Zero runtime dependencies beyond `axios` and `zod`

## Installation

```bash
pnpm add @hivelari/sdk
```

## Environment variables

| Variable            | Required | Description                              |
| ------------------- | -------- | ---------------------------------------- |
| `VELARI_SPACE_ID`   | ✓        | Your space identifier                    |
| `VELARI_PUBLIC_KEY` | ✓        | Space public key                         |
| `VELARI_SECRET_KEY` | ✓        | Space secret key — keep server-side only |
| `VELARI_API_URL`    | —        | Defaults to `https://api.hivelari.com`   |

## Instantiation

```ts
import { Velari } from "@hivelari/sdk";

// Reads all config from env vars
const client = new Velari();

// Pre-populate an existing session (e.g. from a database or cookie)
const client = new Velari({
  token: "hvl_tok_...",
  user: { id: "...", email: "..." },
});
```

## Services

| Property              | Description                                 | Status         |
| --------------------- | ------------------------------------------- | -------------- |
| `client.auth`         | Login, register, OAuth, profile, logout     | ✅ Available   |
| `client.commerce`     | Products — list and get                     | ✅ Available   |
| `client.records`      | Shared lookup data — currencies, categories | ✅ Available   |
| `client.booking`      | Schedules, slots, calendar availability     | 🔜 Coming soon |
| `client.blog`         | Posts, tags, categories, comments           | 🔜 Coming soon |
| `client.profile`      | Personal and business profiles              | 🔜 Coming soon |
| `client.forms`        | Form submissions, lead capture              | 🔜 Coming soon |
| `client.polls`        | Surveys, vote counts                        | 🔜 Coming soon |
| `client.waitlist`     | Subscribers, positions, referrals           | 🔜 Coming soon |
| `client.reviews`      | Ratings, aggregate averages                 | 🔜 Coming soon |
| `client.testimonials` | Approved endorsements                       | 🔜 Coming soon |

## Response shape

Every method returns `VelariResponse<T>`:

```ts
const response = await client.commerce.listProducts();
response.success; // boolean
response.status; // HTTP status code
response.data; // typed payload
```

## Error handling

```ts
import { VelariError } from "@hivelari/sdk";

try {
  await client.commerce.getProduct("missing");
} catch (error) {
  if (error instanceof VelariError) {
    error.status; // e.g. 404
    error.message; // e.g. 'Product not found'
    error.errors; // field errors on 422
  }
}
```

## Next.js

For Next.js projects use [`@hivelari/nextjs`](/nextjs/overview) which wraps this client with cookie-based session management.
