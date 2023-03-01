import { UseCase } from '@/usecases/ports/use-case';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import { Bike } from '@/usecases/datatypes/bike';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import { UnauthorizedError } from '@/usecases/errors/unauthorized-error';

export class ListAvailableBikes implements UseCase {
  constructor(
    private bikeRepository: BikeRepository,
    private candidateRepository: CandidateRepository
  ) {}
  async perform(candidateToken: string): Promise<Bike[]> {
    const candidate = await this.candidateRepository.findByToken(candidateToken);
    if (!candidate) throw new UnauthorizedError();

    return await this.bikeRepository.listAvailable(candidate.id);
  }
}
