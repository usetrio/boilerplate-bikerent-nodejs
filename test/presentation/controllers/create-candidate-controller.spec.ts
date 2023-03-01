import { CreateCandidateController } from '@/presentation/controllers/create-candidate-controller';
import { HttpRequest, HttpResponse } from '@/presentation/controllers/ports';
import { CreateCandidate } from '@/usecases/create-candidate';
import { GenerateFakeData } from '@/usecases/generate-fake-data';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('Create candidate controller', () => {
  it('should create a new candidate and populate database with fake data', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const userRepository = new InMemoryUserRepository();
    const createCandidateUseCase = new CreateCandidate(candidateRepository);
    const generateFakeDataUseCase = new GenerateFakeData(bikeRepository, userRepository);

    const request: HttpRequest = {
      body: {
        email: 'john@doe.com',
        name: 'John Doe',
      },
    };
    const controller = new CreateCandidateController(
      createCandidateUseCase,
      generateFakeDataUseCase
    );

    const response: HttpResponse = await controller.handle(request);
    const bikes = await bikeRepository.list(response.body.id);
    const users = await userRepository.list(response.body.id);

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).not.toBeUndefined();
    expect(bikes.length).toBeGreaterThan(0);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should return token for existing candidate', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const userRepository = new InMemoryUserRepository();

    const generateFakeDataUseCase = new GenerateFakeData(bikeRepository, userRepository);
    const createCandidateUseCase = new CreateCandidate(candidateRepository);
    const request: HttpRequest = {
      body: {
        email: 'john@doe.com',
        name: 'John Doe',
      },
    };
    const controller = new CreateCandidateController(
      createCandidateUseCase,
      generateFakeDataUseCase
    );

    await candidateRepository.add({
      email: 'john@doe.com',
      name: 'John Doe',
      token: '123456',
    });
    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(200);
    expect(response.body.token).toEqual('123456');
  });

  it('should return 500 if use case throws', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const request: HttpRequest = {
      body: {
        email: 'john@doe.com',
        name: 'John Doe',
      },
    };

    const bikeRepository = new InMemoryBikeRepository();
    const userRepository = new InMemoryUserRepository();
    const generateFakeDataUseCase = new GenerateFakeData(bikeRepository, userRepository);
    const controller = new CreateCandidateController(useCasestub, generateFakeDataUseCase);

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });
});
