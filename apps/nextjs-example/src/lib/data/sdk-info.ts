export const sdkFeatures = [
  {
    id: 'server-only',
    icon: '🔒',
    title: 'Server-Only by Design',
    description:
      'The SDK ships with a `server-only` guard, preventing credentials from leaking into client bundles. Every request is server-side.',
  },
  {
    id: 'type-safe',
    icon: '🧩',
    title: 'End-to-End Type Safety',
    description:
      'Full TypeScript coverage from request params to response payloads. IDE autocomplete and compile-time checks throughout.',
  },
  {
    id: 'zod-runtime',
    icon: '🛡️',
    title: 'Runtime Validation',
    description:
      'Zod schemas validate all environment variables at startup. Misconfigured deployments fail fast with a clear error — not silently at runtime.',
  },
  {
    id: 'layered-arch',
    icon: '🏗️',
    title: 'Layered Architecture',
    description:
      'Clean separation: Client → Services → Resources → Types. Swap, extend, or mock any layer independently.',
  },
  {
    id: 'pagination',
    icon: '📄',
    title: 'Pagination Abstraction',
    description:
      'PaginatedResponse wraps meta transforms consistently. No more manually mapping snake_case cursor fields.',
  },
  {
    id: 'encryption',
    icon: '🔑',
    title: 'Built-In Encryption',
    description:
      'AES-256-CBC helpers for the social OAuth code exchange flow are built directly into the client — no extra dependencies.',
  },
] as const;

export const sdkDomains = [
  {
    title: 'Commerce',
    path: '/commerce',
    status: 'active' as const,
    badge: 'Live',
    description:
      'Browse products with full-text search. Demonstrates listProducts(), getProduct(), pagination, and typed query params.',
    endpoints: [
      'GET /api/commerce/v1/products',
      'GET /api/commerce/v1/products/:id',
    ],
  },
  {
    title: 'Authentication',
    path: '/auth',
    status: 'active' as const,
    badge: 'Live',
    description:
      'Login, register, update profile, and OAuth social login via Google or GitHub. Uses httpOnly cookies for session persistence.',
    endpoints: [
      'POST /api/auth/v1/login',
      'POST /api/auth/v1/register',
      'GET  /api/auth/v1/social/:provider/redirect-url',
    ],
  },
  {
    title: 'Billing & Subscriptions',
    path: '#',
    status: 'soon' as const,
    badge: 'Coming Soon',
    description:
      'Manage customer subscriptions, invoices, and payment methods. SDK service layer is planned for the next release cycle.',
    endpoints: [],
  },
] as const;
