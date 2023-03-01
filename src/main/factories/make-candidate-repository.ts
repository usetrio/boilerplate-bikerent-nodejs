import { PrismaCandidateRepository } from '@/external/repository/prisma/prisma-candidate-repository';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

export const makeCandidateRepository = (): CandidateRepository => {
  return new PrismaCandidateRepository();
};
