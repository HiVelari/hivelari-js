/**
 * Raw category shape returned by the API.
 * Transformed into a {@link Category} resource by the SDK.
 */
export interface CategoryPayload {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  description: string | null;
  is_active: boolean;
  /** Nested subcategories (only present when the API loads children). */
  children?: CategoryPayload[];
}

/**
 * Raw currency shape returned by the API.
 * Transformed into a {@link Currency} resource by the SDK.
 */
export interface CurrencyPayload {
  code: string;
  country_code: string | null;
  name: string;
  symbol: string;
  subunit_name: string | null;
  subunit_symbol: string | null;
  /** How many subunits make one major unit (e.g. 100 for USD/GBP). */
  subunit_factor: number;
  is_active: boolean;
}
