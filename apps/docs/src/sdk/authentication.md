# Authentication

All auth methods live on `client.auth`. State-mutating methods automatically update the client's in-memory token and user after a successful call.

## Login

```ts
const response = await client.auth.login({
  email: 'user@example.com',
  password: 'secret',
});

if (response.success) {
  const { token, user } = response.data;
}
```

**Throws** `VelariError` with status `401` on invalid credentials.

## Register

```ts
const response = await client.auth.register({
  email: 'user@example.com',
  password: 'secret',
  password_confirmation: 'secret',
  first_name: 'Ada',
  last_name: 'Lovelace',
  // username, phone, middle_name — all optional
});
```

**Throws** `VelariError` with status `422` on validation failures (e.g. duplicate email).

## Social OAuth

### Step 1 — get the provider redirect URL

```ts
const { data } = await client.auth.socialRedirectUrl(
  'google',
  'https://myapp.com/auth/callback',
);
// Redirect the user's browser to data.redirect_url
```

### Step 2 — exchange the code on callback

```ts
// The provider redirects back to your callback URL with ?code=<encrypted_payload>
const code = new URL(request.url).searchParams.get('code');
const response = await client.auth.authenticateUsingCode(code);
```

The code is a short-lived AES-encrypted payload (`{ token, user, expires_at }`) signed with your secret key. Decryption and expiry validation happen locally — no extra network request.

**Throws** `VelariError` if the code is expired or cannot be decrypted.

### Exchange a provider access token directly

Use this when your app handles the OAuth flow itself:

```ts
const response = await client.auth.exchangeSocialToken('google', {
  access_token: providerToken,
});
```

## Profile

```ts
// Fetch the authenticated user's profile
const response = await client.auth.getProfile();
const user = response.data;
// { id, email, first_name, last_name, username, phone, avatar_id }

// Update profile fields (all optional)
await client.auth.updateProfile({
  first_name: 'Ada',
  avatar_id: 'media_xyz',
});
```

## Email verification

```ts
await client.auth.initiateEmailVerification();
// Sends a verification email to the authenticated user
```

## Password recovery

```ts
await client.auth.initiatePasswordRecovery({
  email: 'user@example.com',
  redirect_url: 'https://myapp.com/auth/reset-password',
});
```

## Logout

```ts
await client.auth.logout();
// Revokes the server token and clears client.isAuthenticated()
```

## Checking auth state

```ts
client.isAuthenticated() // boolean
client.user()            // AuthUserPayload | undefined
client.getToken()        // string | undefined
```

---

::: tip Next.js
Use `@hivelari/nextjs` for cookie-based session management. The `NextAuthService` wraps all of these methods and automatically persists/clears `velari_token` and `velari_user` cookies. See [Session Management →](/nextjs/session-management)
:::

## Parameter reference

### `LoginParams`

| Field | Type | Required |
|---|---|---|
| `email` | `string` | ✓ |
| `password` | `string` | — |

### `RegisterParams`

| Field | Type | Required |
|---|---|---|
| `email` | `string` | ✓ |
| `password` | `string` | — |
| `password_confirmation` | `string` | — |
| `first_name` | `string \| null` | — |
| `middle_name` | `string \| null` | — |
| `last_name` | `string \| null` | — |
| `username` | `string \| null` | — |
| `phone` | `string \| null` | — |

### `UpdateProfileParams`

| Field | Type |
|---|---|
| `first_name` | `string \| null` |
| `middle_name` | `string \| null` |
| `last_name` | `string \| null` |
| `username` | `string \| null` |
| `phone` | `string \| null` |
| `email` | `string` |
| `password` | `string` |
| `password_confirmation` | `string` |
| `avatar_id` | `string \| null` |

### `AuthUserPayload`

| Field | Type |
|---|---|
| `id` | `string` |
| `email` | `string` |
| `first_name` | `string \| null` |
| `middle_name` | `string \| null` |
| `last_name` | `string \| null` |
| `username` | `string \| null` |
| `phone` | `string \| null` |
| `avatar_id` | `string \| null` |
