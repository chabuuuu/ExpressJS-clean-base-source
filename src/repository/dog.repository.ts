import { Dog } from '@/models/dogs.model';
import { BaseRepository } from '@/repository/base.repository';
import { IDogRepository } from '@/repository/interfaces/i.dog.repository';
import { injectable } from 'inversify';

@injectable()
export class DogRepository extends BaseRepository<Dog, number> implements IDogRepository<Dog, number> {
  protected Model = Dog;
  constructor() {
    super();
    this.BaseModel = this.Model;
  }
}
