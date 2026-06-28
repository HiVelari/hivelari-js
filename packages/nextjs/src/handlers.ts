import 'server-only';
import { VelariNext } from '@/client';
import type { VelariNextOptions } from '@/types';
import { type NextRequest } from 'next/server';

/**
 * Creates a minimal Next.js App Router route handler for the social OAuth callback.
 *
 * Mount it at the path you pass to `socialRedirectUrl()` — typically
 * `app/auth/callback/route.ts`. Reads the `code` query parameter, exchanges it
 * for a session (writing cookies), then redirects based on `social` config.
 *
 * @example
 * ```ts
 * // app/auth/callback/route.ts
 * import { createCallbackRouteHandler } from '@hivelari/nextjs';
 *
 * export const { GET } = createCallbackRouteHandler({
 *   social: {
 *     loginSuccessRedirect: '/dashboard',
 *     loginFailedRedirect:  '/login',
 *   },
 * });
 * ```
 *
 * If you need access to the full client after handling the callback (e.g. to
 * trigger additional data loading), instantiate the client manually instead:
 *
 * ```ts
 * export async function GET(request: NextRequest) {
 *   const client = await getVelariClient();
 *   return client.auth.handleSocialAuthCallback(request);
 * }
 * ```
 */
export function createCallbackRouteHandler(options?: VelariNextOptions) {
  return {
    async GET(request: NextRequest) {
      const client = await VelariNext.init(options);
      return client.auth.handleSocialAuthCallback(request);
    },
  };
}
