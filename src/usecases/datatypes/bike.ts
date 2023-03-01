export interface Bike {
  id?: number;
  candidateId?: number;
  name: string;
  type: string;
  bodySize: number;
  maxLoad: number;
  rate: number;
  description: string;
  ratings: number;
  imageUrls: string[];
}
