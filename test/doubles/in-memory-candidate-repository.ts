import { Candidate } from '@/usecases/datatypes/candidate';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';

export class InMemoryCandidateRepository implements CandidateRepository {
  private candidates: Candidate[] = [];
  private idCounter = 1;

  async add(candidate: Candidate): Promise<Candidate> {
    const newCandidate = { ...candidate, id: this.idCounter++ };
    this.candidates.push(newCandidate);
    return newCandidate;
  }

  async findByEmail(email: string): Promise<Candidate | undefined> {
    return this.candidates.find((candidate) => candidate.email === email);
  }

  async findByToken(token: string): Promise<Candidate | undefined> {
    return this.candidates.find((candidate) => candidate.token === token);
  }
}
