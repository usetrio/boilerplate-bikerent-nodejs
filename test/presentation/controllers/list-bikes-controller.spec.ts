import { ListBikesController } from '@/presentation/controllers/list-bikes-controller';
import { HttpRequest } from '@/presentation/controllers/ports/http-request';
import { HttpResponse } from '@/presentation/controllers/ports/http-response';
import { ListBikes } from '@/usecases/list-bikes';
import { BikeBuilder } from '@test/builders/bike-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { ErrorThrowingUseCaseStub } from '@test/doubles/error-throwing-use-case-stub';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('List bikes controller', () => {
  it('should return 200 and all bikes in the body', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const useCase = new ListBikes(bikeRepository, candidateRepository);
    const controller: ListBikesController = new ListBikesController(useCase);

    const addedCandidate = new CandidateBuilder().withToken().build();
    const bikeInfo = new BikeBuilder().build();
    const candidate = await candidateRepository.add(addedCandidate);
    bikeRepository.add({
      id: 1,
      candidateId: candidate.id,
      ...bikeInfo,
    });
    bikeRepository.add({
      id: 2,
      candidateId: candidate.id,
      ...bikeInfo,
    });

    const response: HttpResponse = await controller.handle({
      token: candidate.token,
    } as HttpRequest);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([
      { id: 1, candidateId: candidate.id, ...bikeInfo },
      { id: 2, candidateId: candidate.id, ...bikeInfo },
    ]);
  });

  it('should return 500 if use case raises', async () => {
    const useCasestub = new ErrorThrowingUseCaseStub();
    const controller = new ListBikesController(useCasestub);
    const request: HttpRequest = {
      token: '123456',
      body: {},
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(500);
  });

  it('should return 401 if user is unauthorized', async () => {
    const bikeRepository = new InMemoryBikeRepository();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new ListBikes(bikeRepository, candidateRepository);
    const controller = new ListBikesController(useCase);
    const request: HttpRequest = {
      token: '123456',
      body: {},
    };

    const response: HttpResponse = await controller.handle(request);

    expect(response.statusCode).toEqual(401);
  });
});
