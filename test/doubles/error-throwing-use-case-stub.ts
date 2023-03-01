import { UseCase } from '@/usecases/ports/use-case';

export class ErrorThrowingUseCaseStub implements UseCase {
  async perform(): Promise<any> {
    throw new Error();
  }
}
