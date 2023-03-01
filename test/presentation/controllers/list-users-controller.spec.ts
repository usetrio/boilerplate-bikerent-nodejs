import { ListUsersController } from '@/presentation/controllers/list-users-controller';
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports';
import { ListUsers } from '@/usecases/list-users';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('List users controller', () => {
  it('should return all users in the system', async () => {
    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidateRepository = new InMemoryCandidateRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new ListUsers(userRepository, candidateRepository);
    const controller = new ListUsersController(useCase);

    const candidate = await candidateRepository.add(addedCandidate);
    userRepository.add({
      id: 1,
      candidateId: candidate.id,
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });
    userRepository.add({
      id: 2,
      candidateId: candidate.id,
      name: 'Mary Doe',
      email: 'mary@doe.com',
      password: '123456',
    });

    const response: HttpResponse = await controller.handle({
      token: candidate.token,
      body: {},
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body.length).toEqual(2);
  });

  it('should return 500 if use case raises', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const controller = new ListUsersController(useCasestub);
    const request: HttpRequest = {
      token: 'any_token',
      body: {},
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const userRepository = new InMemoryUserRepository();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new ListUsers(userRepository, candidateRepository);
    const controller = new ListUsersController(useCase);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });
});
