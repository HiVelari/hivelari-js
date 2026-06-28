/**
 * Response from `client.ping()`.
 *
 * Use this to verify that the SDK is correctly configured and can reach the API.
 */
export class PingInfo {
  /** API status — `'ok'` when the service is healthy. */
  readonly status: string;

  /** Human-readable status message. */
  readonly message: string;

  /** The space ID that was resolved from the request headers. */
  readonly space: string;

  constructor(data: { status: string; message: string; space: string }) {
    this.status = data.status;
    this.message = data.message;
    this.space = data.space;
  }
}
