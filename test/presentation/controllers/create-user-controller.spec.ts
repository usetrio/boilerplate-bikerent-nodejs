import { CreateUserController } from '@/presentation/controllers/create-user-controller';
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports';
import { CreateUser } from '@/usecases/create-user';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('Create user controller', () => {
  it('should create a new user', async () => {
    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidateRepository = new InMemoryCandidateRepository();

    const userRepository = new InMemoryUserRepository();
    const useCase = new CreateUser(userRepository, candidateRepository);
    const controller = new CreateUserController(useCase);

    const candidate = await candidateRepository.add(addedCandidate);
    const request: HttpRequest = {
      token: candidate.token,
      body: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      },
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(201);
    expect(response.body.name).toEqual('John Doe');
  });

  it('should not create existing user', async () => {
    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidateRepository = new InMemoryCandidateRepository();

    const userRepository = new InMemoryUserRepository();
    const useCase = new CreateUser(userRepository, candidateRepository);
    const controller = new CreateUserController(useCase);

    const candidate = await candidateRepository.add(addedCandidate);
    const request: HttpRequest = {
      token: candidate.token,
      body: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      },
    };

    await controller.handle(request);
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(409);
    expect(response.body.errorType).toEqual('ExistingUserError');
  });

  it('should return 500 if use case throws', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const request: HttpRequest = {
      token: '123456',
      body: {
        name: 'John Doe',
        email: 'john@doe.com',
        password: '123456',
      },
    };
    const controller = new CreateUserController(useCasestub);

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new CreateUser(userRepository, candidateRepository);
    const controller = new CreateUserController(useCase);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });
});
