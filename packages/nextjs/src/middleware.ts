import { type NextRequest, NextResponse } from 'next/server';

/**
 * A route pattern: an exact path string, a prefix ending in `/*`,
 * a `RegExp`, or a predicate function.
 *
 * @example
 * ```ts
 * '/dashboard'           // exact match
 * '/dashboard/*'         // prefix match
 * /^\/admin(\/.*)?$/     // regex
 * (path) => path.startsWith('/account')  // function
 * ```
 */
export type RoutePattern = string | RegExp | ((pathname: string) => boolean);

/**
 * Configuration for {@link createVelariMiddleware}.
 */
export interface VelariMiddlewareConfig {
  /**
   * Routes that require an authenticated session. Unmatched routes pass through.
   * Accepts a single pattern or an array of patterns.
   *
   * @example
   * ```ts
   * protectedRoutes: ['/dashboard/*', '/account/*', /^\/admin/]
   * ```
   */
  protectedRoutes?: RoutePattern | RoutePattern[];

  /**
   * Where to redirect unauthenticated users.
   * The current pathname is appended as `?next=<pathname>` so you can resume
   * after login.
   *
   * @default '/login'
   */
  redirectTo?: string;

  /**
   * Additional response headers to set on every request that passes through
   * a protected route (i.e. the user is authenticated).
   */
  headers?: Record<string, string>;
}

function matchesPattern(pathname: string, pattern: RoutePattern): boolean {
  if (typeof pattern === 'function') return pattern(pathname);
  if (pattern instanceof RegExp) return pattern.test(pathname);
  if (pattern.endsWith('/*')) return pathname.startsWith(pattern.slice(0, -2));
  if (pattern.endsWith('*')) return pathname.startsWith(pattern.slice(0, -1));
  return pathname === pattern || pathname.startsWith(`${pattern}/`);
}

function isProtectedRoute(
  pathname: string,
  routes?: RoutePattern | RoutePattern[],
): boolean {
  if (!routes) return false;
  const patterns = Array.isArray(routes) ? routes : [routes];
  return patterns.some((p) => matchesPattern(pathname, p));
}

/**
 * Create a Next.js middleware function that enforces authentication on the
 * configured protected routes.
 *
 * The check is token-presence only (cookie existence) — cryptographic
 * verification happens when the client makes an actual API call.
 *
 * Place the returned function in `middleware.ts` at your project root and
 * export a `config.matcher` as usual.
 *
 * @example
 * ```ts
 * // middleware.ts
 * import { createVelariMiddleware } from '@hivelari/nextjs/middleware';
 *
 * export const middleware = createVelariMiddleware({
 *   protectedRoutes: ['/dashboard/*', '/account/*'],
 *   redirectTo: '/login',
 * });
 *
 * export const config = {
 *   matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
 * };
 * ```
 */
export function createVelariMiddleware(config: VelariMiddlewareConfig) {
  return function middleware(request: NextRequest): NextResponse {
    const { pathname } = request.nextUrl;

    if (!isProtectedRoute(pathname, config.protectedRoutes)) {
      return NextResponse.next();
    }

    const token = request.cookies.get('velari_token')?.value;

    if (!token) {
      const redirectTo = config.redirectTo ?? '/login';
      const url = request.nextUrl.clone();
      url.pathname = redirectTo;
      url.searchParams.set('next', pathname);
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next();

    if (config.headers) {
      for (const [key, value] of Object.entries(config.headers)) {
        response.headers.set(key, value);
      }
    }

    return response;
  };
}
