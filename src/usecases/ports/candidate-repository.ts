import { Candidate } from '@/usecases/datatypes/candidate';

export interface CandidateRepository {
  add(candidate: Candidate): Promise<Candidate>;
  findByEmail(email: string): Promise<Candidate | undefined>;
  findByToken(token: string): Promise<Candidate | undefined>;
}
