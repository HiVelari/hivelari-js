# Session Management

`VelariNext.init()` is the entry point for the HiVelari client in Next.js. It reads cookies from the current request and returns a hydrated client instance.

## The singleton pattern

The recommended setup is a single module-level `await` that Next.js re-executes per request:

```ts
// lib/velari.ts
import { VelariNext } from '@hivelari/nextjs';

const hivelari = await VelariNext.init();
export default hivelari;
```

Because Next.js App Router re-runs server module code per request, this is effectively request-scoped — each request gets its own `hivelari` instance with cookies read fresh from that request. There is no shared mutable state between requests.

Import and use it directly in server components, actions, and route handlers:

```ts
import hivelari from '@/lib/velari';

const { data } = await hivelari.commerce.listProducts();
```

## `VelariNext.init(options?)`

What it does on each call:
1. Reads `velari_token` cookie → decrypts (if `encryptCookies: true`) → calls `sdk.setToken()`
2. Reads `velari_user` cookie → decrypts and JSON-parses → calls `sdk.setAuthUser()`
3. Returns a new `VelariNext` instance wrapping the configured SDK client

Corrupted or missing cookies are silently ignored — the client starts unauthenticated.

## Cookie management

The `hivelari.auth` service automatically manages cookies on state-changing operations:

| Method | Cookie effect |
|---|---|
| `login(params)` | Sets `velari_token`, `velari_user` |
| `register(params)` | Sets `velari_token`, `velari_user` |
| `exchangeCode(code)` | Sets `velari_token`, `velari_user` |
| `exchangeSocialToken(provider, params)` | Sets `velari_token`, `velari_user` |
| `updateProfile(params)` | Refreshes `velari_user` |
| `logout()` | Deletes `velari_token`, `velari_user` |

Cookie options applied to every write:

```ts
{
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: options.cookieMaxAge, // default: 604800 (7 days)
}
```

## Encryption

When `encryptCookies: true` (default), cookie values are encrypted before writing and decrypted on read using AES-256-CBC with your `VELARI_SECRET_KEY`:

```
write: JSON.stringify(user) → encrypt(secretKey) → Base64 cookie value
read:  Base64 cookie value → decrypt(secretKey) → JSON.parse()
```

To disable (e.g. during local development):

```ts
// lib/velari.ts
const hivelari = await VelariNext.init({ encryptCookies: false });
export default hivelari;
```

::: warning
Never set `encryptCookies: false` in production — cookie values contain the raw session token.
:::

## Checking auth state

```ts
hivelari.isAuthenticated()  // boolean — true when a token cookie was present
hivelari.user()             // AuthUserPayload | undefined
hivelari.getToken()         // string | undefined
```

## Server action patterns

### Login

```ts
'use server';
import hivelari from '@/lib/velari';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
  try {
    await hivelari.auth.login({ email, password }); // sets cookies
    revalidatePath('/');
    redirect(hivelari.options.auth.loginSuccessRedirect ?? '/dashboard');
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Login failed' };
  }
}
```

### Logout

```ts
export async function logoutAction() {
  try {
    await hivelari.auth.logout(); // clears cookies
  } catch {
    // local sign-out must always succeed
  }

  redirect(hivelari.options.auth.logoutRedirect ?? '/login');
}
```

### Gate a server component

```ts
import hivelari from '@/lib/velari';
import { redirect } from 'next/navigation';

export default async function AccountPage() {
  if (!hivelari.isAuthenticated()) redirect('/login');

  const user = hivelari.user();
  return <h1>Hello, {user?.first_name}</h1>;
}
```

## `hivelari.options`

The resolved configuration is exposed on `hivelari.options`. Use it to read configured redirect URLs in server actions without hardcoding them:

```ts
// lib/velari.ts
const hivelari = await VelariNext.init({
  auth: { loginSuccessRedirect: '/dashboard', logoutRedirect: '/login' },
});
export default hivelari;

// In a server action:
redirect(hivelari.options.auth.loginSuccessRedirect ?? '/');
```
