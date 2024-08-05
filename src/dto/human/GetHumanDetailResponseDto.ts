import { Dog } from '@/models/dogs.model';

export class GetHumanDetailResponseDTO {
  id!: number;
  name!: string;
  dogs!: Dog[];
  totalDogs!: number;
}
