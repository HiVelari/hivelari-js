# @hivelari/nextjs

Next.js integration for the HiVelari SDK. Wraps `@hivelari/sdk` with:

- **Automatic session hydration** from cookies on every request
- **Cookie persistence** after login, register, social OAuth, and logout
- **Encrypted cookies** using your Velari secret key (AES-256-CBC)
- **Social OAuth callback handler** — one-liner route setup
- **Route middleware** for access control

Server-only — never import this in Client Components or browser code.

## Installation

```bash
pnpm add @hivelari/nextjs @hivelari/sdk
```

## Environment variables

Inherits from `@hivelari/sdk`:

| Variable            | Required | Description                                   |
| ------------------- | -------- | --------------------------------------------- |
| `VELARI_SPACE_ID`   | ✓        | Your HiVelari space identifier                |
| `VELARI_PUBLIC_KEY` | ✓        | Space public key                              |
| `VELARI_SECRET_KEY` | ✓        | Space secret key (used for cookie encryption) |
| `VELARI_API_URL`    | —        | Defaults to `https://api.hivelari.com`        |

---

## Quick start

### 1. Create a client helper

```ts
// lib/velari.ts
import { VelariNext } from "@hivelari/nextjs";

export async function getVelariClient() {
  return VelariNext.init();
}
```

### 2. Use it in server components and server actions

```ts
// app/dashboard/page.tsx
import { getVelariClient } from "@/lib/velari";

export default async function DashboardPage() {
  const client = await getVelariClient();

  if (!client.isAuthenticated()) {
    redirect("/login");
  }

  const { data: products } = await client.commerce.listProducts();
  // ...
}
```

---

## `VelariNext.init(options?)`

Creates a new client, reading `velari_token` and `velari_user` cookies from the incoming request. When `encryptCookies` is `true` (default), values are AES-decrypted before use.

```ts
const client = await VelariNext.init({
  encryptCookies: true, // default — encrypt/decrypt cookie values
  cookieMaxAge: 60 * 60 * 24 * 7, // default — 7 days
  auth: {
    loginSuccessRedirect: "/dashboard",
    logoutRedirect: "/login",
  },
  social: {
    loginSuccessRedirect: "/dashboard",
    loginFailedRedirect: "/login",
    autoRedirect: true, // default — redirect in handleSocialAuthCallback
  },
});
```

### Options

| Option                        | Type      | Default  | Description                              |
| ----------------------------- | --------- | -------- | ---------------------------------------- |
| `encryptCookies`              | `boolean` | `true`   | AES-256-CBC encrypt cookie values        |
| `cookieMaxAge`                | `number`  | `604800` | Cookie `Max-Age` in seconds              |
| `auth.loginSuccessRedirect`   | `string`  | —        | Available via `client.options.auth`      |
| `auth.logoutRedirect`         | `string`  | —        | Available via `client.options.auth`      |
| `social.loginSuccessRedirect` | `string`  | `'/'`    | Redirect after successful OAuth callback |
| `social.loginFailedRedirect`  | `string`  | —        | Redirect after failed OAuth callback     |
| `social.autoRedirect`         | `boolean` | `true`   | Whether the callback handler redirects   |

---

## Auth (`client.auth`)

The auth service automatically persists or clears session cookies:

| Method                                  | Cookie effect                         |
| --------------------------------------- | ------------------------------------- |
| `login(params)`                         | Sets `velari_token`, `velari_user`    |
| `register(params)`                      | Sets `velari_token`, `velari_user`    |
| `exchangeCode(code)`                    | Sets `velari_token`, `velari_user`    |
| `exchangeSocialToken(provider, params)` | Sets `velari_token`, `velari_user`    |
| `updateProfile(params)`                 | Refreshes `velari_user`               |
| `logout()`                              | Deletes `velari_token`, `velari_user` |

### Login server action

```ts
"use server";
import { getVelariClient } from "@/lib/velari";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function loginAction(params: { email: string; password: string }) {
  const client = await getVelariClient();
  const response = await client.auth.login(params); // cookies set automatically

  if (response.success) {
    revalidatePath("/");
    redirect(client.options.auth.loginSuccessRedirect ?? "/dashboard");
  }

  return { error: response.data?.toString() ?? "Login failed" };
}
```

### Logout server action

```ts
export async function logoutAction() {
  const client = await getVelariClient();
  await client.auth.logout(); // cookies cleared automatically
  redirect(client.options.auth.logoutRedirect ?? "/login");
}
```

---

## Social OAuth callback

### Option A — `createCallbackRouteHandler` (recommended)

```ts
// app/auth/callback/route.ts
import { createCallbackRouteHandler } from "@hivelari/nextjs";

export const { GET } = createCallbackRouteHandler({
  social: {
    loginSuccessRedirect: "/dashboard",
    loginFailedRedirect: "/login",
  },
});
```

### Option B — manual handler

```ts
// app/auth/callback/route.ts
import { getVelariClient } from "@/lib/velari";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const client = await getVelariClient();
  return client.auth.handleSocialAuthCallback(request);
}
```

### `handleSocialAuthCallback(request)` behaviour

1. Reads `code` from `request.nextUrl.searchParams`.
2. Calls `exchangeCode(code)` — decrypts the payload, validates expiry, sets session cookies.
3. If `social.autoRedirect` is `true` (default):
   - Success → `NextResponse.redirect(social.loginSuccessRedirect ?? '/')`
   - Failure → `NextResponse.redirect(social.loginFailedRedirect)` or JSON error
4. If `social.autoRedirect` is `false` → returns JSON `{ success, user? }`.

---

## Route middleware

Import from `@hivelari/nextjs/middleware` to keep the main bundle free of server-only imports.

```ts
// middleware.ts
import { createVelariMiddleware } from "@hivelari/nextjs/middleware";

export const middleware = createVelariMiddleware({
  protectedRoutes: ["/dashboard/*", "/account/*", /^\/admin/],
  redirectTo: "/login", // default: '/login'
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

Unauthenticated requests to protected routes are redirected to `redirectTo?next=<pathname>` so you can resume navigation after login.

### Route patterns

| Pattern                         | Matches                        |
| ------------------------------- | ------------------------------ |
| `'/dashboard'`                  | Exact path                     |
| `'/dashboard/*'`                | `/dashboard` and all sub-paths |
| `/^\/admin/`                    | RegExp                         |
| `(p) => p.startsWith('/admin')` | Predicate function             |

> **Note:** The middleware checks cookie existence only — cryptographic verification happens when the client makes an API call. The cookie cannot be forged without the secret key, but an expired/revoked token will only fail on the first API request.

---

## Cookie encryption

When `encryptCookies: true` (default), the raw token and user JSON are encrypted before being written to cookies using AES-256-CBC with your `VELARI_SECRET_KEY`. On the next request, `VelariNext.init()` decrypts them transparently.

To disable encryption (e.g. for debugging):

```ts
const client = await VelariNext.init({ encryptCookies: false });
```

---

## `client.options`

The resolved configuration is exposed on `client.options` so server actions can read configured redirect URLs without hardcoding them:

```ts
const client = await getVelariClient();
redirect(client.options.auth.loginSuccessRedirect ?? "/");
```

---

## Re-exported SDK types

Common types from `@hivelari/sdk` are re-exported so you can import everything from one place:

```ts
import type {
  LoginParams,
  RegisterParams,
  AuthUserPayload,
} from "@hivelari/nextjs";
```
