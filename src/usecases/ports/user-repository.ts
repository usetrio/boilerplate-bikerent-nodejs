import { User } from '@/usecases/datatypes/user';

export interface UserRepository {
  add(user: User): Promise<User>;
  findByEmail(email: string, candidateId: number): Promise<User | undefined>;
  list(candidateId: number): Promise<User[]>;
}
