import { Controller } from '@/presentation/controllers/ports/controller';
import { HttpRequest } from '@/presentation/controllers/ports/http-request';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { UseCase } from '@/usecases/ports/use-case';

export class ListBikesController implements Controller {
  constructor(private useCase: UseCase) {}
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const candidateToken = request.token;
      const bikes = await this.useCase.perform(candidateToken);
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
