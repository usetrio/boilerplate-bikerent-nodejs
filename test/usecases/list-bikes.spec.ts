import { ListBikes } from '@/usecases/list-bikes';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { BikeBuilder } from '@test/builders/bike-builder';

describe('List bikes use case', () => {
  it('should return all bikes in the catalog', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const useCase = new ListBikes(bikeRepository, candidateRepository);

    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidate = await candidateRepository.add(addedCandidate);
    const bike = new BikeBuilder().build();
    const differentBike = new BikeBuilder().different().build();
    bikeRepository.add({ id: 1, candidateId: candidate.id, ...bike });
    bikeRepository.add({ id: 2, candidateId: candidate.id, ...differentBike });
    const bikes = await useCase.perform(addedCandidate.token);

    expect(bikes.length).toBe(2);
    expect(bikes).toEqual([
      { id: 1, candidateId: candidate.id, ...bike },
      { id: 2, candidateId: candidate.id, ...differentBike },
    ]);
  });
});
