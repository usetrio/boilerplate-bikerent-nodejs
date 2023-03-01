import { User } from '@/usecases/datatypes/user';
import { UserRepository } from '@/usecases/ports/user-repository';

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];
  private currentId = 1;

  async add(user: User): Promise<User> {
    const newUser = { ...user, id: this.currentId++ };
    this.users.push(newUser);
    return newUser;
  }

  async findByEmail(email: string, candidateId: number): Promise<User> {
    return this.users.find((user) => user.email === email && user.candidateId === candidateId);
  }

  async list(candidateId: number): Promise<User[]> {
    return this.users.filter((user) => user.candidateId === candidateId);
  }
}
