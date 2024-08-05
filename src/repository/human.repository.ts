import { Human } from '@/models/humans.model';
import { BaseRepository } from '@/repository/base.repository';
import { IHumanRepository } from '@/repository/interfaces/i.human.repository';
import { injectable } from 'inversify';

@injectable()
export class HumanRepository extends BaseRepository<Human, number> implements IHumanRepository<Human, number> {
  protected Model = Human;
  constructor() {
    super();
    this.BaseModel = this.Model;
  }
  async findByName(name: string): Promise<Human | null> {
    const result = await this.BaseModel.findOne({
      where: {
        name
      }
    });
    return result;
  }
}
