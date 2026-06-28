import 'server-only';

export { VelariNext } from '@/client';
export { createCallbackRouteHandler } from '@/handlers';
export type {
  VelariNextOptions,
  VelariAuthConfig,
  VelariSocialConfig,
  ResolvedVelariNextOptions,
} from '@/types';

// Re-export SDK types consumers commonly need alongside this package
export type {
  AuthUserPayload,
  AuthResponsePayload,
  LoginParams,
  RegisterParams,
  SocialExchangeTokenParams,
  UpdateProfileParams,
  ListProductsParams,
  CommerceProductPayload,
  CategoryPayload,
  CurrencyPayload,
  PaginatedPayload,
} from '@hivelari/sdk';

export {
  VelariError,
  VelariResponse,
  PaginatedResponse,
  PingInfo,
  Product,
  Category,
  Currency,
} from '@hivelari/sdk';
