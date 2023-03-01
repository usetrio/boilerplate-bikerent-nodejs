import { PrismaBikeRepository } from '@/external/repository/prisma/prisma-bike-repository';
import { BikeRepository } from '@/usecases/ports/bike-repository';

export const makeBikeRepository = (): BikeRepository => {
  return new PrismaBikeRepository();
};
