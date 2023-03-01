import { ListAvailableBikes } from '@/usecases/list-available-bikes';
import { BikeBuilder } from '@test/builders/bike-builder';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryBikeRepository } from '@test/doubles/in-memory-bike-repository';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('List available bikes use case', () => {
  it('should return all available bikes', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    
    const differentBike = new BikeBuilder().different().build();
    const bikeRepository = new InMemoryBikeRepository();
    
    const userRepository = new InMemoryUserRepository();
    const useCase = new ListAvailableBikes(bikeRepository, candidateRepository);
    
    const bike = new BikeBuilder().build();
    const candidate = new CandidateBuilder().withToken().withId().build();
    await candidateRepository.add(candidate);
    bikeRepository.add({ id: 1, candidateId: candidate.id, ...bike });
    bikeRepository.add({ id: 2, candidateId: candidate.id, ...differentBike });
    const bikes = await useCase.perform(candidate.token);
    userRepository.add({
      id: 1,
      candidateId: candidate.id,
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    });

    expect(bikes.length).toBe(2);
  });
});
