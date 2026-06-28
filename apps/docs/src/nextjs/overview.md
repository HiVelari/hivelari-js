# @hivelari/nextjs — Overview

`@hivelari/nextjs` wraps `@hivelari/sdk` for Next.js App Router projects. It handles everything session-related so your server components and server actions stay clean.

## What it adds

| Feature | Description |
|---|---|
| **Cookie hydration** | `VelariNext.init()` reads `velari_token` + `velari_user` cookies automatically |
| **Cookie persistence** | Auth methods write/delete cookies without manual `cookieStore.set()` calls |
| **Cookie encryption** | Values are AES-256-CBC encrypted with your secret key by default |
| **OAuth callback handler** | One-liner route setup via `createCallbackRouteHandler()` |
| **Route middleware** | `createVelariMiddleware()` protects routes based on cookie presence |

## Installation

```bash
pnpm add @hivelari/nextjs @hivelari/sdk
```

## Setup

Create a single shared client instance at the module level using top-level `await`:

```ts
// lib/velari.ts
import { VelariNext } from '@hivelari/nextjs';

const hivelari = await VelariNext.init();
export default hivelari;
```

`VelariNext.init()` reads cookies from the incoming request context (via `next/headers`). Because Next.js re-executes server module files per request in the App Router, this gives you a fresh, request-scoped client on every request — with no per-call overhead and no shared mutable state between requests.

## Usage

```ts
// app/products/page.tsx (Server Component)
import hivelari from '@/lib/velari';

export default async function ProductsPage() {
  const { data } = await hivelari.commerce.listProducts();
  // ...
}
```

```ts
// app/actions.ts (Server Action)
'use server';
import hivelari from '@/lib/velari';

export async function loginAction(email: string, password: string) {
  await hivelari.auth.login({ email, password }); // session cookies set automatically
}
```

## Sections

- [Session Management](/nextjs/session-management) — `VelariNext.init()`, cookie encryption, options
- [Social OAuth](/nextjs/social-oauth) — OAuth flow, `handleSocialAuthCallback`, `createCallbackRouteHandler`
- [Middleware](/nextjs/middleware) — `createVelariMiddleware`, route patterns
- [Configuration](/nextjs/configuration) — full options reference
