/**
 * Thrown whenever a Velari API request fails.
 *
 * Catch this in your server components and server actions to handle API errors
 * gracefully without crashing the request.
 *
 * @example
 * ```ts
 * import { VelariError } from '@hivelari/sdk';
 *
 * try {
 *   const response = await client.commerce.getProduct(id);
 * } catch (error) {
 *   if (error instanceof VelariError) {
 *     console.error(error.status, error.message, error.errors);
 *   }
 * }
 * ```
 */
export class VelariError extends Error {
  /** HTTP status code returned by the API, if available. */
  public status?: number;

  /**
   * Field-level validation errors returned by the API.
   * Keys are field names; values are arrays of error messages.
   *
   * @example `{ email: ['The email has already been taken.'] }`
   */
  public errors?: Record<string, string[]>;

  constructor(
    message: string,
    status?: number,
    errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'VelariError';
    this.status = status;
    this.errors = errors;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
