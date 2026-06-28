/**
 * Wrapper returned by every SDK method.
 *
 * @template T The type of the response data.
 *
 * @example
 * ```ts
 * const response = await client.commerce.listProducts();
 * if (response.success) {
 *   console.log(response.data.data); // Product[]
 * }
 * ```
 */
export class VelariResponse<T> {
  /** Whether the request succeeded (2xx status). */
  readonly success: boolean;

  /** The HTTP status code. */
  readonly status: number;

  /** The typed response payload. */
  readonly data: T;

  constructor(success: boolean, status: number, data: T) {
    this.success = success;
    this.status = status;
    this.data = data;
  }
}
