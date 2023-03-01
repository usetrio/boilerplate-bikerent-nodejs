import { User } from '@/usecases/datatypes/user';
import { UserRepository } from '@/usecases/ports/user-repository';
import prismaClient from '@/external/repository/prisma/prisma-client';

export class PrismaUserRepository implements UserRepository {
  async add(user: User): Promise<User> {
    return await prismaClient.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        candidateId: user.candidateId,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  async list(): Promise<User[]> {
    return await prismaClient.user.findMany();
  }
}
