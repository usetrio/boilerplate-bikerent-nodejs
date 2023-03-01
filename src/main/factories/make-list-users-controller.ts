import { ListUsersController } from '@/presentation/controllers/list-users-controller';
import { Controller } from '@/presentation/controllers/ports/controller';
import { ListUsers } from '@/usecases/list-users';
import { makeUserRepository } from '@/main/factories/make-user-repository';
import { makeCandidateRepository } from './make-candidate-repository';

export const makeListUsersController = (): Controller => {
  const userRepository = makeUserRepository();
  const candidateRepository = makeCandidateRepository();
  const useCase = new ListUsers(userRepository, candidateRepository);
  const createCourseController = new ListUsersController(useCase);
  return createCourseController;
};
