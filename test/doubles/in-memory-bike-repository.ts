import { Bike } from '@/usecases/datatypes/bike';
import { BikeRepository } from '@/usecases/ports/bike-repository';

export class InMemoryBikeRepository implements BikeRepository {
  private bikes: Bike[] = [];
  private currentId = 1;

  async list(candidateId: number): Promise<Bike[]> {
    return this.bikes.filter((bike) => bike.candidateId === candidateId);
  }

  async listAvailable(candidateId: number): Promise<Bike[]> {
    const openRents = [];
    const allBikes = await this.list(candidateId);
    const availableBikes: Bike[] = [];
    allBikes.forEach((bike) => {
      const bikeIsAvailable = !openRents.some((rent) => rent.bikeId === bike.id);
      if (bikeIsAvailable) availableBikes.push(bike);
    });
    return availableBikes;
  }

  async add(bike: Bike): Promise<Bike> {
    const newBike = { ...bike, id: this.currentId++ };
    this.bikes.push(newBike);
    return newBike;
  }
}
