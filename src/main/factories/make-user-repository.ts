import { PrismaUserRepository } from '@/external/repository/prisma/prisma-user-repository';
import { UserRepository } from '@/usecases/ports/user-repository';

export const makeUserRepository = (): UserRepository => {
  return new PrismaUserRepository();
};
