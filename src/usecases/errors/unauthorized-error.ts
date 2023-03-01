export class UnauthorizedError extends Error {
  public httpStatus = 401;
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}
