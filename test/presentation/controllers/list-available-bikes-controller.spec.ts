import { ListAvailableBikesController } from '@/presentation/controllers/list-available-bikes-controller';
import { HttpRequest } from '@/presentation/controllers/ports';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { ListAvailableBikes } from '@/usecases/list-available-bikes';
import { BikeBuilder } from '@test/builders/bike-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('List available bikes controller', () => {
  it('should return 200 and only available bikes in the body', async () => {
    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const useCase = new ListAvailableBikes(bikeRepository, candidateRepository);
    const controller: ListAvailableBikesController = new ListAvailableBikesController(useCase);

    const bike1Info = new BikeBuilder().build();
    const bike2Info = new BikeBuilder().different().build();

    const candidate = await candidateRepository.add(addedCandidate);
    bikeRepository.add({ candidateId: candidate.id, id: 1, ...bike1Info });
    bikeRepository.add({ candidateId: candidate.id, id: 2, ...bike2Info });
    const response: HttpResponse = await controller.handle({
      token: candidate.token,
      body: {},
    });

    expect(response.statusCode).toEqual(200);
  });

  it('should return 500 if use case raises', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const request: HttpRequest = {
      token: '123456',
      body: {},
    };
    const controller = new ListAvailableBikesController(useCasestub);

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const bikeRepository = new InMemoryBikeRepository();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new ListAvailableBikes(bikeRepository, candidateRepository);

    const request: HttpRequest = {
      token: '123456',
      body: {},
    };
    const controller = new ListAvailableBikesController(useCase);

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });
});
