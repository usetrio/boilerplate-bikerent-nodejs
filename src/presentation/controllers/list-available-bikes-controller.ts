import { Controller } from '@/presentation/controllers/ports/controller';
import { UseCase } from '@/usecases/ports/use-case';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { HttpRequest } from './ports';

export class ListAvailableBikesController implements Controller {
  constructor(private useCase: UseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const bikes = await this.useCase.perform(request.token);
      return {
        statusCode: 200,
        body: bikes,
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
