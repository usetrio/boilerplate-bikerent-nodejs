import { ListUsers } from '@/usecases/list-users';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('List users use case', () => {
  it('should return all users in the system', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new ListUsers(userRepository, candidateRepository);

    const addedCandidate = new CandidateBuilder().withToken().build();
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
    const users = await useCase.perform(candidate.token);

    expect(users.length).toBe(2);
  });
});
