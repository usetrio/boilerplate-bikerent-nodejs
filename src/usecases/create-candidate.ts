import { UseCase } from '@/usecases/ports/use-case';
import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import { Candidate } from '@/usecases/datatypes/candidate';
import crypto from 'crypto';

export class CreateCandidate implements UseCase {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  async perform(candidate: Candidate): Promise<Candidate> {
    const existingCandidate = await this.candidateRepository.findByEmail(candidate.email);
    if (existingCandidate) return existingCandidate;
    const newCandidate = await this.candidateRepository.add({
      email: candidate.email,
      name: candidate.name,
      token: crypto.randomUUID(),
    });
    return newCandidate;
  }
}
