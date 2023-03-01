import { CreateUser } from '@/usecases/create-user';
import { User } from '@/usecases/datatypes/user';
import { ExistingUserError } from '@/usecases/errors/existing-user-error';
import { CandidateBuilder } from '@test/builders/candidate-builder';
import { InMemoryCandidateRepository } from '@test/doubles/in-memory-candidate-repository';
import { InMemoryUserRepository } from '@test/doubles/in-memory-user-repository';

describe('Create user use case', () => {
  it('should create a new user', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new CreateUser(userRepository, candidateRepository);
    const request: User = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    };

    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidate = await candidateRepository.add(addedCandidate);
    const user = await useCase.perform(request, candidate.token);

    expect(user.name).toEqual('John Doe');
  });

  it('should not create existing user', async () => {
    const candidateRepository = new InMemoryCandidateRepository();
    const userRepository = new InMemoryUserRepository();
    const useCase = new CreateUser(userRepository, candidateRepository);
    const request: User = {
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    };

    const addedCandidate = new CandidateBuilder().withToken().build();
    const candidate = await candidateRepository.add(addedCandidate);
    await useCase.perform(request, candidate.token);

    await expect(useCase.perform(request, candidate.token)).rejects.toThrow(ExistingUserError);
  });
});
