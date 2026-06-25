export class PingInfo {
  readonly status: string;
  readonly message: string;
  readonly space: string;

  constructor(data: { status: string; message: string; space: string }) {
    this.status = data.status;
    this.message = data.message;
    this.space = data.space;
  }
}
