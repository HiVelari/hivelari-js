import { CurrencyPayload } from '@/types/records';

/**
 * A currency returned by `client.records.getCurrencies()`.
 */
export class Currency {
  /** ISO 4217 currency code (e.g. `'USD'`, `'EUR'`). */
  readonly code: string;

  /** ISO 3166-1 alpha-2 country code, or `null`. */
  readonly countryCode: string | null;

  /** Full currency name (e.g. `'United States Dollar'`). */
  readonly name: string;

  /** Currency symbol (e.g. `'$'`, `'€'`). */
  readonly symbol: string;

  /** Name of the subunit (e.g. `'Cent'`). */
  readonly subunitName: string | null;

  /** Symbol of the subunit (e.g. `'¢'`). */
  readonly subunitSymbol: string | null;

  /**
   * How many subunits make one major unit.
   * For most currencies this is `100` (e.g. 100 cents = 1 USD).
   * Prices in the API are expressed in subunits.
   */
  readonly subunitFactor: number;

  /** Whether the currency is enabled for the space. */
  readonly isActive: boolean;

  constructor(data: CurrencyPayload) {
    this.code = data.code;
    this.countryCode = data.country_code ?? null;
    this.name = data.name;
    this.symbol = data.symbol;
    this.subunitName = data.subunit_name ?? null;
    this.subunitSymbol = data.subunit_symbol ?? null;
    this.subunitFactor = data.subunit_factor;
    this.isActive = data.is_active;
  }
}
