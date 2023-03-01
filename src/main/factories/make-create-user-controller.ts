import { CreateUserController } from '@/presentation/controllers/create-user-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { CreateUser } from '@/usecases/create-user';
import { makeUserRepository } from '@/main/factories/make-user-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeCreateUserController = (): Controller => {
  const userRepository = makeUserRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new CreateUser(userRepository, candidateRepository);
  const createCourseController = new CreateUserController(useCase);
  return createCourseController;
};
