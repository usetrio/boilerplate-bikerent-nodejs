import { Bike } from '@/usecases/datatypes/bike';

export interface BikeRepository {
  list(candidateId: number): Promise<Bike[]>;
  listAvailable(candidateId: number): Promise<Bike[]>;
  add(bike: Bike): Promise<Bike>;
}
