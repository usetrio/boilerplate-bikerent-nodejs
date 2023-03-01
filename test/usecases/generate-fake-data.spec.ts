import { GenerateFakeData } from '@/usecases/generate-fake-data';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('Generate fake data', () => {
  it('should generate fake data for candidate', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const bikeRepository = new InMemoryBikeRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new GenerateFakeData(bikeRepository, userRepository);

    const candidate = new CandidateBuilder().withToken().withId().build();
    candidateRepository.add(candidate);
    await useCase.perform(candidate.id);
    const bikes = await bikeRepository.list(candidate.id);
    const users = await userRepository.list(candidate.id);

    expect(bikes.length).toBeGreaterThan(0);
    expect(users.length).toBeGreaterThan(0);
  });
});
