export interface SdkFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const sdkFeatures: SdkFeature[] = [
  {
    id: 'server-only',
    title: 'Server-Only Security',
    description:
      "The SDK uses 'server-only' imports and runs exclusively in secure environments, guaranteeing that your API secret keys never leak to the browser.",
    icon: '🔒',
  },
  {
    id: 'type-safety',
    title: 'Strict Type Safety',
    description:
      'Built entirely with TypeScript, offering autocompletion, type checks, and validation schemas for requests and payloads.',
    icon: '🛡️',
  },
  {
    id: 'layered-architecture',
    title: 'Layered Domain Architecture',
    description:
      'Cleanly structured into services, requests, models, and types, reflecting a maintainable structure optimized for scalability.',
    icon: '🧱',
  },
  {
    id: 'sandbox',
    title: 'Local Developer Sandbox',
    description:
      'Integrates out-of-the-box with a high-fidelity local mock server using @simapi/simapi, letting you simulate and test all API flows offline.',
    icon: '🪐',
  },
];

export const sdkDomains = [
  {
    title: 'Commerce Domain',
    description:
      'Retrieve products list, fetch specific catalog item details, manage prices, stock levels, categories, and digital downloads.',
    path: '/commerce',
    status: 'active',
    badge: 'Production',
  },
  {
    title: 'Authentication Domain',
    description:
      'Token verification workflow, secure session handshake validation, and credential middleware verification.',
    path: '/auth',
    status: 'mock',
    badge: 'Mock Preview',
  },
  {
    title: 'Billing & Subscriptions',
    description:
      'Upcoming billing portals, recurrent invoicing, and customer payment setups.',
    path: '#',
    status: 'upcoming',
    badge: 'Coming Soon',
  },
];
