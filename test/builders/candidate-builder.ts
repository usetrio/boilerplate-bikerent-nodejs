import { Candidate } from '@/usecases/datatypes/candidate';

export class CandidateBuilder {
  private candidate: Candidate = {
    email: 'john@doe.com',
    name: 'John Doe',
  };

  withToken(): CandidateBuilder {
    this.candidate.token = '123456';
    return this;
  }

  withId(): CandidateBuilder {
    this.candidate.id = 1;
    return this;
  }

  build(): Candidate {
    return this.candidate;
  }
}
