import { UseCase } from '@/usecases/ports/use-case';
import { Bike } from '@/usecases/datatypes/bike';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import { CandidateRepository } from './ports/candidate-repository';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';

export class ListBikes implements UseCase {
  constructor(
    private bikeRepository: BikeRepository,
    private candidateRepository: CandidateRepository
  ) {}

  async perform(candidateToken: string): Promise<Bike[]> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    return await this.bikeRepository.list(candidate.id);
  }
}
