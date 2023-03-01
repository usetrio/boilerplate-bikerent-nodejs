import { UseCase } from '@/usecases/ports/use-case';
import { UserRepository } from '@/usecases/ports/user-repository';
import { User } from '@/usecases/datatypes/user';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';

export class ListUsers implements UseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly candidateRepository: CandidateRepository
  ) {}

  async perform(candidateToken: string): Promise<User[]> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    return await this.userRepository.list(candidate.id);
  }
}
