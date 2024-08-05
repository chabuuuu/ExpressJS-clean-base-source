import { IBaseRepository } from '@/repository/interfaces/i.base.repository';

export interface IHumanRepository<T, ID> extends IBaseRepository<T, ID> {
  findByName(name: string): Promise<T | null>;
}
