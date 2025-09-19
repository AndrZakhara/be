export class GrpcError extends Error {
  public readonly code: number;
  public readonly details: string;

  constructor(code: number, details: string) {
    super(details);
    this.code = code;
    this.details = details;
    Object.setPrototypeOf(this, GrpcError.prototype);
  }
}
