export class PingInfo {
  readonly status: string;
  readonly message: string;
  readonly space: string;

  constructor(data: { status: string; message: string; space: string }) {
    this.status = data.status;
    this.message = data.message;
    this.space = data.space;
  }

  static fake(
    overrides: Partial<{ status: string; message: string; space: string }> = {},
  ): PingInfo {
    return new PingInfo({
      status: 'ok',
      message: 'pong',
      space: 'space_mock_123',
      ...overrides,
    });
  }
}
