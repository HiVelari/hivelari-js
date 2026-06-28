# Configuration

All configuration is passed to `VelariNext.init(options?)` or `createCallbackRouteHandler(options?)`. Every field is optional; defaults are applied automatically.

## `VelariNextOptions`

```ts
interface VelariNextOptions {
  encryptCookies?: boolean;
  cookieMaxAge?: number;
  auth?: VelariAuthConfig;
  social?: VelariSocialConfig;
}
```

### `encryptCookies`

|         |           |
| ------- | --------- |
| Type    | `boolean` |
| Default | `true`    |

When `true`, `velari_token` and `velari_user` cookie values are AES-256-CBC encrypted using `VELARI_SECRET_KEY` before being written, and decrypted on read. Disable only for local development.

### `cookieMaxAge`

|         |                    |
| ------- | ------------------ |
| Type    | `number` (seconds) |
| Default | `604800` (7 days)  |

Lifetime of the session cookies in seconds. This is equivalent to the `Max-Age` attribute.

### `auth`

```ts
interface VelariAuthConfig {
  loginSuccessRedirect?: string;
  logoutRedirect?: string;
}
```

| Property               | Type     | Default     | Description                                                                                     |
| ---------------------- | -------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `loginSuccessRedirect` | `string` | `undefined` | Where to redirect after a successful `login()` or `register()` call (must be handled by caller) |
| `logoutRedirect`       | `string` | `undefined` | Where to redirect after `logout()` (must be handled by caller)                                  |

::: info
Auth redirects are not performed automatically — they are exposed on `client.options.auth` so your server actions can read them without hardcoding:

```ts
redirect(client.options.auth.loginSuccessRedirect ?? "/");
```

:::

### `social`

```ts
interface VelariSocialConfig {
  loginSuccessRedirect?: string;
  loginFailedRedirect?: string;
  autoRedirect?: boolean;
}
```

| Property               | Type      | Default     | Description                                                                                                |
| ---------------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| `loginSuccessRedirect` | `string`  | `'/'`       | Redirect URL after a successful OAuth callback                                                             |
| `loginFailedRedirect`  | `string`  | `undefined` | Redirect URL on OAuth failure. When unset and `autoRedirect` is `true`, a 500 response is returned instead |
| `autoRedirect`         | `boolean` | `true`      | When `true`, `handleSocialAuthCallback` returns a redirect response. When `false`, returns JSON            |

## Full example

```ts
// lib/velari.ts
import { VelariNext } from "@hivelari/nextjs";

const hivelari = await VelariNext.init({
  encryptCookies: true,
  cookieMaxAge: 86400, // 1 day

  auth: {
    loginSuccessRedirect: "/dashboard",
    logoutRedirect: "/login",
  },

  social: {
    loginSuccessRedirect: "/dashboard",
    loginFailedRedirect: "/login/social-error",
    autoRedirect: true,
  },
});

export default hivelari;
```

## Resolved options

After `init()`, the resolved configuration is available on `hivelari.options`:

```ts
hivelari.options.encryptCookies; // boolean
hivelari.options.cookieMaxAge; // number
hivelari.options.auth.loginSuccessRedirect;
hivelari.options.auth.logoutRedirect;
hivelari.options.social.loginSuccessRedirect;
hivelari.options.social.loginFailedRedirect;
hivelari.options.social.autoRedirect; // always boolean (defaults applied)
```

## Environment variables

`@hivelari/nextjs` reads the same env vars as the SDK — no additional variables are required:

| Variable            | Required | Description                                                           |
| ------------------- | -------- | --------------------------------------------------------------------- |
| `VELARI_SPACE_ID`   | Yes      | Your HiVelari space identifier                                        |
| `VELARI_PUBLIC_KEY` | Yes      | Space public key                                                      |
| `VELARI_SECRET_KEY` | Yes      | Space secret key — also used as the AES-256-CBC cookie encryption key |
| `VELARI_API_URL`    | No       | Override API base URL (default: `https://api.hivelari.com`)           |
