import { Bike } from '@/usecases/datatypes/bike';

export class BikeBuilder {
  private bike: Bike = {
    type: 'All terrain bike',
    name: 'Kent Flexer',
    maxLoad: 70,
    bodySize: 26,
    rate: 10,
    description: 'Nice bike.',
    ratings: 4.9,
    imageUrls: ['https://cremecycles.com/images/glowne/14.jpg'],
  };

  withId(): BikeBuilder {
    this.bike.id = 1;
    return this;
  }

  withCandidateId(): BikeBuilder {
    this.bike.candidateId = 1;
    return this;
  }

  different(): BikeBuilder {
    this.bike.name = 'Kent';
    this.bike.type = 'Do Flexor';
    this.bike.imageUrls = ['https://cremecycles.com/images/glowne/14.jpg'];
    return this;
  }

  build(): Bike {
    return this.bike;
  }
}
