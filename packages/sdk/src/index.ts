import 'server-only';

export { Velari } from '@/core/client';
export { VelariError } from '@/errors';
export { CommerceService } from '@/services/commerce';
export { AuthService } from '@/services/auth';

// Resources
export { VelariResponse } from '@/resources/VelariResponse';
export { PaginatedResponse } from '@/resources/PaginatedResponse';
export { PingInfo } from '@/resources/PingInfo';
export { Product } from '@/resources/commerce/Product';

// Requests
export type { ListProductsParams } from '@/requests/commerce/ListProduct';

// Types
export type {
  CommerceProductPayload,
  ProductFilePayload,
  ProductImagePayload,
} from '@/types/commerce';
export type {
  LoginParams,
  RegisterParams,
  SocialExchangeTokenParams,
  UpdateProfileParams,
  AuthUserPayload,
  AuthResponsePayload,
} from '@/types/auth';
export type { PaginatedPayload } from '@/types/core';
