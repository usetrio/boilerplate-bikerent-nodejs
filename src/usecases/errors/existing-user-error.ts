export class ExistingUserError extends Error {
  public httpStatus = 409;
  constructor(email: string) {
    super(`User with email ${email} already exists`);
    this.name = 'ExistingUserError';
  }
}
