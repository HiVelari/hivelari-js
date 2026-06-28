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

/** Raw specification entry on a product, as returned by the API. */
export interface ProductSpecificationPayload {
  id: string;
  product_id: string;
  key: string;
  value: string;
  is_active: boolean;
  created_at: string | null;
  updated_at: string | null;
}

/** Raw SEO metadata on a product, as returned by the API. */
export interface ProductSeoPayload {
  id: string;
  product_id: string;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image_id: string | null;
  og_image: unknown;
  twitter_title: string | null;
  twitter_description: string | null;
  twitter_image_id: string | null;
  twitter_image: unknown;
  created_at: string | null;
  updated_at: string | null;
}

/** Raw option value within a product option, as returned by the API. */
export interface ProductOptionValuePayload {
  id: string;
  value: string;
  position: number;
}

/** Raw product option (e.g. "Color", "Size"), as returned by the API. */
export interface ProductOptionPayload {
  id: string;
  product_id: string;
  name: string;
  position: number;
  values?: ProductOptionValuePayload[];
}

/** Raw variant option value reference within a variant, as returned by the API. */
export interface ProductVariantOptionValuePayload {
  id: string;
  option_id: string;
  value: string;
}

/** Raw product variant, as returned by the API. */
export interface ProductVariantPayload {
  id: string;
  product_id: string;
  sku: string | null;
  barcode: string | null;
  original_price: number | null;
  sale_price: number | null;
  quantity_available: number | null;
  is_active: boolean;
  option_values?: ProductVariantOptionValuePayload[];
  created_at: string | null;
  updated_at: string | null;
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
  specifications?: ProductSpecificationPayload[];
  seo?: ProductSeoPayload | null;
  options?: ProductOptionPayload[];
  variants?: ProductVariantPayload[];
}
