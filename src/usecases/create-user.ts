import { UseCase } from '@/usecases/ports/use-case';
import { UserRepository } from '@/usecases/ports/user-repository';
import { User } from '@/usecases/datatypes/user';
import { ExistingUserError } from '@/usecases/errors/existing-user-error';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';

export class CreateUser implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly candidateRepository: CandidateRepository
  ) {}

  async perform(user: User, candidateToken: string): Promise<User> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    const existingUser = await this.userRepository.findByEmail(user.email, candidate.id);
    if (existingUser) throw new ExistingUserError(user.email);

    return await this.userRepository.add({ ...user, candidateId: candidate.id });
  }
}
