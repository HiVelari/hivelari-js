/** Raw file attachment on a product, as returned by the API. */
export interface ProductFilePayload {
  id: string;
  file_id: string;
  title: string | null;
  description: string | null;
  license: string | null;
  media: unknown;
}

/** Raw image on a product, as returned by the API. */
export interface ProductImagePayload {
  id: string;
  image_id: string;
  alt: string | null;
  media: unknown;
}

/**
 * Raw commerce product shape returned by the API.
 * Transformed into a {@link Product} resource by the SDK.
 */
export interface CommerceProductPayload {
  id: string;
  name: string;
  currency: string;
  original_price: number;
  sale_price?: number | null;
  description?: string | null;
  category_id?: string | null;
  custom_category?: string | null;
  /** `'physical'` | `'digital'` | `'service'` */
  type: string;
  requires_approval?: boolean;
  /** `'public'` | `'private'` | `'unlisted'` */
  visibility: string;
  limit_purchase?: number | null;
  redirect_on_purchase?: string | null;
  physical_unit?: string | null;
  physical_quantity_available?: number | null;
  service_duration_minutes?: number | null;
  service_requires_booking?: boolean | null;
  service_delivery_timeframe?: string | null;
  files?: ProductFilePayload[];
  images?: ProductImagePayload[];
}
