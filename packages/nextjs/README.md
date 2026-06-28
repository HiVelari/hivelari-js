# @hivelari/nextjs

Next.js integration for the HiVelari SDK. Wraps `@hivelari/sdk` with automatic cookie-based session management, encrypted cookies, a social OAuth callback handler, and route middleware.

Server-only — never import this in Client Components or browser code.

## Installation

```bash
pnpm add @hivelari/nextjs @hivelari/sdk
```

## Environment variables

Uses the same env vars as `@hivelari/sdk` — no additional variables required. `VELARI_SECRET_KEY` doubles as the AES-256-CBC key for cookie encryption.

| Variable            | Required | Description                                        |
| ------------------- | -------- | -------------------------------------------------- |
| `VELARI_SPACE_ID`   | ✓        | Your HiVelari space identifier                     |
| `VELARI_PUBLIC_KEY` | ✓        | Space public key                                   |
| `VELARI_SECRET_KEY` | ✓        | Space secret key — also used for cookie encryption |
| `VELARI_API_URL`    | —        | Defaults to `https://api.hivelari.com`             |

## Quick example

```ts
// lib/velari.ts
import { VelariNext } from "@hivelari/nextjs";

const hivelari = await VelariNext.init();
export default hivelari;
```

```ts
// app/actions.ts
"use server";
import hivelari from "@/lib/velari";

export async function loginAction(email: string, password: string) {
  await hivelari.auth.login({ email, password }); // cookies set automatically
}
```

```ts
// middleware.ts
import { createVelariMiddleware } from "@hivelari/nextjs/middleware";

export const middleware = createVelariMiddleware({
  protectedRoutes: ["/dashboard/*"],
  redirectTo: "/login",
});
```

## Full documentation

Complete API reference, configuration options, and OAuth setup at **[sdk.hivelari.com](https://sdk.hivelari.com)**.

## Contributing

PRs and issues welcome at [github.com/HiVelari/hivelari-js](https://github.com/HiVelari/hivelari-js).
