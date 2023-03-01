import { CandidateRepository } from '@/usecases/ports/candidate-repository';
import prismaClient from '@/external/repository/prisma/prisma-client';
import { Candidate } from '@/usecases/datatypes/candidate';

export class PrismaCandidateRepository implements CandidateRepository {
  async add(candidate: Candidate): Promise<Candidate> {
    return await prismaClient.candidate.create({
      data: {
        email: candidate.email,
        name: candidate.name,
        token: candidate.token,
      },
    });
  }

  async findByEmail(email: string): Promise<Candidate | undefined> {
    const candidate = await prismaClient.candidate.findUnique({
      where: { email },
    });
    if (!candidate) return undefined;
    return candidate;
  }

  async findByToken(token: string): Promise<Candidate | undefined> {
    const candidate = await prismaClient.candidate.findUnique({
      where: { token },
    });
    if (!candidate) return undefined;
    return candidate;
  }
}
