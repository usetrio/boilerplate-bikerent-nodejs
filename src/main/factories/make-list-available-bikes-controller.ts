import { ListAvailableBikesController } from '@/presentation/controllers/list-available-bikes-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { ListAvailableBikes } from '@/usecases/list-available-bikes';
import { makeBikeRepository } from '@/main/factories/make-bike-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeListAvailableBikesController = (): Controller => {
  const bikeRepository = makeBikeRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new ListAvailableBikes(bikeRepository, candidateRepository);
  const listAvailableBikeController = new ListAvailableBikesController(useCase);
  return listAvailableBikeController;
};
