import { CreateCandidate } from '@/usecases/create-candidate';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';

describe('Create candidate use case', () => {
  it('should create a new candidate', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new CreateCandidate(candidateRepository);

    const candidate = new CandidateBuilder().build();
    const returnedCandidate = await useCase.perform(candidate);

    expect(returnedCandidate.token).not.toBeUndefined();
  });

  it('should return token for existing candidate', async () => {
    const savedCandidate = new CandidateBuilder().withToken().build();
    const candidateRepository = new InMemoryCandidateRepository();
    const useCase = new CreateCandidate(candidateRepository);

    const candidate = new CandidateBuilder().build();
    await candidateRepository.add(savedCandidate);
    const returnedCandidate = await useCase.perform(candidate);

    expect(returnedCandidate.token).toEqual('123456');
  });
});
