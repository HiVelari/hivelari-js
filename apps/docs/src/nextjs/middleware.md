# Route Middleware

`createVelariMiddleware` produces a standard Next.js middleware function that enforces authentication on configured routes.

Import from `@hivelari/nextjs/middleware` — a separate subpath export that contains no `server-only` or `next/headers` imports, so it's safe to use in middleware files (which run in the Edge runtime by default).

## Setup

```ts
// middleware.ts  (project root)
import { createVelariMiddleware } from '@hivelari/nextjs/middleware';

export const middleware = createVelariMiddleware({
  protectedRoutes: ['/dashboard/*', '/account/*', /^\/admin/],
  redirectTo: '/login',
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## How it works

1. For each incoming request, checks if the pathname matches any `protectedRoutes` pattern.
2. If matched, checks for the `velari_token` cookie.
3. **Cookie present** → `NextResponse.next()` (request proceeds normally).
4. **Cookie absent** → `302` redirect to `redirectTo?next=<pathname>`.

The `?next=<pathname>` query parameter lets you resume navigation after login:

```ts
// In your login server action:
const next = searchParams.get('next') ?? '/dashboard';
redirect(next);
```

::: info Cookie presence vs. validity
The middleware checks whether the cookie **exists** — it does not decrypt or cryptographically verify it. Token validation (expiry, revocation) happens on the first API call. Since the cookie is AES-encrypted with the server's secret key, it cannot be forged without the key.
:::

## Route patterns

| Pattern type | Example | Matches |
|---|---|---|
| Exact string | `'/dashboard'` | Only `/dashboard` |
| Prefix wildcard | `'/dashboard/*'` | `/dashboard` and all sub-paths |
| Trailing wildcard | `'/dashboard*'` | Starts with `/dashboard` |
| RegExp | `/^\/admin(\/.*)?$/` | Any path starting with `/admin` |
| Function | `(p) => p.startsWith('/admin')` | Custom predicate |

Multiple patterns can be mixed in the array:

```ts
protectedRoutes: [
  '/account',            // exact
  '/dashboard/*',        // prefix
  /^\/admin/,            // regex
  (p) => p.includes('/settings'),  // function
]
```

## Configuration reference

```ts
createVelariMiddleware({
  /**
   * Routes that require authentication.
   * Accepts a single pattern or an array of mixed patterns.
   */
  protectedRoutes?: RoutePattern | RoutePattern[];

  /**
   * Where to redirect unauthenticated users.
   * The current path is appended as ?next=<pathname>.
   * @default '/login'
   */
  redirectTo?: string;

  /**
   * Extra response headers to set on every authenticated request
   * that passes through a protected route.
   */
  headers?: Record<string, string>;
});
```

## Custom headers example

```ts
export const middleware = createVelariMiddleware({
  protectedRoutes: ['/api/private/*'],
  headers: {
    'X-Auth-Check': 'passed',
  },
});
```
