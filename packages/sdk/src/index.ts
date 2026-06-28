import 'server-only';

export { Velari } from '@/core/client';
export { VelariError } from '@/errors';
export { CommerceService } from '@/services/commerce';
export { RecordsService } from '@/services/records';
export { AuthService } from '@/services/auth';

// Resources
export { VelariResponse } from '@/resources/VelariResponse';
export { PaginatedResponse } from '@/resources/PaginatedResponse';
export { PingInfo } from '@/resources/PingInfo';
export { Product } from '@/resources/commerce/Product';
export { Category } from '@/resources/records/Category';
export { Currency } from '@/resources/records/Currency';

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
export type { CategoryPayload, CurrencyPayload } from '@/types/records';
