import { ListBikesController } from '@/presentation/controllers/list-bikes-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { ListBikes } from '@/usecases/list-bikes';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeListBikesController = (): Controller => {
  const bikeRepository = makeBikeRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new ListBikes(bikeRepository, candidateRepository);
  const createCourseController = new ListBikesController(useCase);
  return createCourseController;
};
