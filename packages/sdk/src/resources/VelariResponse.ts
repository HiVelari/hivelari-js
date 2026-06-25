export class VelariResponse<T> {
  readonly success: boolean;
  readonly status: number;
  readonly data: T;

  constructor(success: boolean, status: number, data: T) {
    this.success = success;
    this.status = status;
    this.data = data;
  }
}
