export class VelariError extends Error {
  constructor(
    message: string,
    public status?: number,
    public errors?: Record<string, string[]>,
  ) {
    super(message);
    this.name = 'VelariError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
