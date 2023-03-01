export interface UseCase {
  perform(request?: any, candidateToken?: string): Promise<any>;
}
