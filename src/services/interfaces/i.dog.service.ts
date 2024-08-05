import { Dog } from '@/models/dogs.model';
import { IBaseCrudService } from '@/services/interfaces/i.base-crud.service';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IDogService extends IBaseCrudService<Dog, number> {}
