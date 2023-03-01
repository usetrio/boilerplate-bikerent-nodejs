import { CreateCandidateController } from '@/presentation/controllers/create-candidate-controller';
import { Controller } from '@/presentation/controllers/ports';
import { CreateCandidate } from '@/usecases/create-candidate';
import { makeCandidateRepository } from '@/main/factories/make-candidate-repository';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { makeUserRepository } from '@/main/factories/make-user-repository';
import { GenerateFakeData } from '@/usecases/generate-fake-data';

export const makeCreateCandidateController = (): Controller => {
  const candidateRepository = makeCandidateRepository();
  const bikeRepository = makeBikeRepository();
  const userRepository = makeUserRepository();
  const createCandidateUseCase = new CreateCandidate(candidateRepository);
  const generateFakeDataUseCase = new GenerateFakeData(bikeRepository, userRepository);

  const createCourseController = new CreateCandidateController(
    createCandidateUseCase,
    generateFakeDataUseCase
  );
  return createCourseController;
};
