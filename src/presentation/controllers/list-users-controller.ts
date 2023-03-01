import { Controller } from '@/presentation/controllers/ports/controller';
import { UseCase } from '@/usecases/ports/use-case';
import { HttpRequest } from './ports';

export class ListUsersController implements Controller {
  constructor(private readonly useCase: UseCase) {}

  async handle(request: HttpRequest): Promise<any> {
    try {
      const users = await this.useCase.perform(request.token);
      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      const userUnauthorized = error.constructor.name === 'UnauthorizedError';

      if (userUnauthorized) {
        return {
          statusCode: error.httpStatus,
          body: {
            errorType: error.constructor.name,
            message: error.message,
          },
        };
      }
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
