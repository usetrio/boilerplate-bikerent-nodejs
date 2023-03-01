import { PrismaBikeRepository } from '@/external/repository/prisma/prisma-bike-repository';
import { PrismaCandidateRepository } from '@/external/repository/prisma/prisma-candidate-repository';
import { BikeBuilder } from '@test/builders/bike-builder';
import { clearPrismaDatabase } from '@test/main/routes/clear-database';

describe('Bike prisma repository', () => {
  it('should be able to list bikes', async () => {
    await clearPrismaDatabase();
    const candidateRepo = new PrismaCandidateRepository();
    const repo = new PrismaBikeRepository();

    const candidate = await candidateRepo.add({
      name: 'any_name',
      email: 'any_email',
      token: 'any_token',
    });
    const bikeInfo = new BikeBuilder().build();
    await repo.add({
      candidateId: candidate.id,
      ...bikeInfo,
    });

    const bikes = await repo.list(candidate.id);

    expect(bikes.length).toBe(1);
    expect(bikes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...bikeInfo,
        }),
      ])
    );
  });
});
