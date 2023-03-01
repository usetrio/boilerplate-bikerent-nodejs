import { Controller, HttpRequest, HttpResponse } from '@/presentation/controllers/ports';
import { UseCase } from '@/usecases/ports/use-case';

export class CreateCandidateController implements Controller {
  constructor(
    private readonly createCandidateUseCase: UseCase,
    private readonly generateFakeDataUseCase: UseCase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      const candidate = request.body;
      const newCandidate = await this.createCandidateUseCase.perform(candidate);
      await this.generateFakeDataUseCase.perform(newCandidate.id);
      return {
        statusCode: 200,
        body: newCandidate,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
