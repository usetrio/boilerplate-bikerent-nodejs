import prismaClient from '@/external/repository/prisma/prisma-client';

export async function clearPrismaDatabase(): Promise<void> {
  await prismaClient.imageUrl.deleteMany({});
  await prismaClient.bike.deleteMany({});
  await prismaClient.user.deleteMany({});
  await prismaClient.candidate.deleteMany({});
}
