# Social OAuth

`@hivelari/nextjs` provides a first-class OAuth callback handler that exchanges the encrypted code, persists the session, and redirects — all in one call.

## Full flow

```
1. User clicks "Sign in with Google"
2. Server action: hivelari.auth.socialRedirectUrl('google', callbackUrl)
3. Redirect user → provider OAuth screen
4. Provider redirects → /auth/callback?code=<encrypted_payload>
5. Route handler: hivelari.auth.handleSocialAuthCallback(request)
   - Reads code from URL
   - Decrypts payload (token + user + expires_at)
   - Validates expiry
   - Writes session cookies
   - Redirects to loginSuccessRedirect
```

## Step 1 — Get the redirect URL

```ts
// Server action
import hivelari from '@/lib/velari';
import { headers } from 'next/headers';

export async function socialRedirectUrlAction(provider: string) {
  const baseUrl = (await headers()).get('origin');
  const response = await hivelari.auth.socialRedirectUrl(
    provider,
    `${baseUrl}/auth/callback`,
  );
  return response.data.redirect_url;
}
```

## Step 2 — Callback route handler

### Option A: `createCallbackRouteHandler` (recommended)

```ts
// app/auth/callback/route.ts
import { createCallbackRouteHandler } from '@hivelari/nextjs';

export const { GET } = createCallbackRouteHandler({
  social: {
    loginSuccessRedirect: '/dashboard',
    loginFailedRedirect: '/login',
  },
});
```

That's the entire file. The handler:
1. Reads `?code=` from the URL
2. Calls `exchangeCode(code)` — decrypts, validates, sets cookies
3. Redirects to the configured URL

### Option B: Manual handler

```ts
// app/auth/callback/route.ts
import hivelari from '@/lib/velari';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  return hivelari.auth.handleSocialAuthCallback(request);
}
```

Use this when you need access to the full client after the callback (e.g. to fetch additional data or add custom response headers).

## `handleSocialAuthCallback(request)` behaviour

| Condition | `autoRedirect: true` (default) | `autoRedirect: false` |
|---|---|---|
| Success | `302 → social.loginSuccessRedirect` (or `/`) | `200 { success: true, user }` |
| Missing code | `302 → social.loginFailedRedirect` (or error) | `400 { success: false, error }` |
| Expired/invalid code | `302 → social.loginFailedRedirect` (or error) | `500 { success: false, error }` |

## Exchange provider token directly

If your app handles the OAuth flow itself and you already have a provider access token:

```ts
const response = await hivelari.auth.exchangeSocialToken('google', {
  access_token: providerToken,
});
// Session cookies are written automatically
```

## Sandbox OAuth simulation

The local sandbox includes a mock OAuth screen at `/api/_social-auth`. When you call `socialRedirectUrl()` pointing at the sandbox, it returns a mock redirect URL that simulates the provider callback. Clicking through generates a valid encrypted code and redirects to your callback URL.

See [Sandbox endpoints →](/sandbox/overview) for details.
