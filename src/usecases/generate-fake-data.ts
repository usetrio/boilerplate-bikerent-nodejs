import { UseCase } from '@/usecases/ports/use-case';
import { Bike } from '@/usecases/datatypes/bike';
import { BikeRepository } from '@/usecases/ports/bike-repository';
import { UserRepository } from '@/usecases/ports/user-repository';
import { User } from '@/usecases/datatypes/user';
import { faker } from '@faker-js/faker';

export class GenerateFakeData implements UseCase {
  private candidateId: number;
  private readonly numBikes = 10;
  private readonly numUsers = 2;

  constructor(
    private readonly bikeRepository: BikeRepository,
    private readonly userRepository: UserRepository
  ) {}

  async perform(candidateId: number): Promise<void> {
    this.candidateId = candidateId;
    await this.generateBikes();
    await this.generateUsers();
  }

  private async generateBikes(): Promise<Bike[]> {
    const bikes = [];
    for (let i = 0; i < this.numBikes; i++) {
      const randomBike = this.generateRandomBike();
      const bike = await this.bikeRepository.add(randomBike);
      bikes.push(bike);
    }
    return bikes;
  }

  private generateRandomBike(): Bike {
    const loads = [70, 80, 90, 100, 110, 120];
    const bodySizes = [20, 24, 26, 27, 29];
    const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
    const images = [12, 13, 14, 15, 16];
    return {
      candidateId: this.candidateId,
      name: faker.company.name(),
      type: faker.vehicle.bicycle(),
      maxLoad: this.getRandom(loads),
      bodySize: this.getRandom(bodySizes),
      rate: faker.datatype.number({ min: 10, max: 200 }),
      ratings: this.getRandom(ratings),
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      imageUrls: [
        'https://cremecycles.com/images/glowne/' + this.getRandom(images) + '.jpg',
        'https://cremecycles.com/images/glowne/' + this.getRandom(images) + '.jpg',
        'https://cremecycles.com/images/glowne/' + this.getRandom(images) + '.jpg',
      ],
    };
  }

  private getRandom(array: any[]): any {
    return array[Math.floor(Math.random() * array.length)];
  }

  private async generateUsers(): Promise<User[]> {
    const users = [];
    for (let i = 0; i < this.numUsers; i++) {
      const user = {
        candidateId: this.candidateId,
        name: faker.name.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };
      await this.userRepository.add(user);
      users.push(user);
    }
    return users;
  }
}
