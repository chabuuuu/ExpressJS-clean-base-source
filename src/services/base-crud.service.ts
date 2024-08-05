import { RequestPageable } from '@/dto/request/RequestPagable.dto';
import { IBaseRepository } from '@/repository/interfaces/i.base.repository';
import { IBaseCrudService } from '@/services/interfaces/i.base-crud.service';
import { DeleteResultType } from '@/types/DeleteResult.type';
import { Page } from '@/types/Page.type';
import { RecordOrderType } from '@/types/RecordOrder.type';
import { UpdateResultType } from '@/types/UpdateResult.type';
import { injectable } from 'inversify';

@injectable()
export class BaseCrudService<MODEL, ID> implements IBaseCrudService<MODEL, ID> {
  protected repository: IBaseRepository<MODEL, ID>;

  constructor(repository: IBaseRepository<MODEL, ID>) {
    this.repository = repository;
  }

  public async findAllWithPaging(requestPageable: RequestPageable): Promise<Page<MODEL>> {
    const content = await this.repository.findAllWithPaging(requestPageable.rpp, requestPageable.page);
    const totalRecords = await this.repository.findAll();
    return {
      content: content,
      totalElements: totalRecords.length
    };
  }

  public async findAllWithPagingAndOrder(
    requestPageable: RequestPageable,
    order: RecordOrderType
  ): Promise<Page<MODEL>> {
    const content = await this.repository.findAllWithPagingAndOrder(order, requestPageable.rpp, requestPageable.page);
    const totalRecords = await this.repository.findAll();
    return {
      content: content,
      totalElements: totalRecords.length
    };
  }

  public async create<DTO>(data: DTO): Promise<MODEL> {
    const result = await this.repository.create(data as unknown as MODEL);
    return result;
  }

  async findOneById(id: ID): Promise<MODEL | null> {
    const result = await this.repository.findOneById(id);
    return result;
  }

  async findAll(): Promise<MODEL[]> {
    const result = await this.repository.findAll();
    return result;
  }

  async updateById<DTO>(id: ID, data: Partial<DTO>): Promise<UpdateResultType> {
    const result = await this.repository.updateById(id, data as unknown as Partial<MODEL>);
    return result;
  }

  async deleteById(id: ID): Promise<DeleteResultType> {
    const result = await this.repository.deleteById(id);
    return result;
  }
}
