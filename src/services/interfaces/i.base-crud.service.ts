import { RequestPageable } from '@/dto/request/RequestPagable.dto';
import { DeleteResultType } from '@/types/DeleteResult.type';
import { Page } from '@/types/Page.type';
import { RecordOrderType } from '@/types/RecordOrder.type';
import { UpdateResultType } from '@/types/UpdateResult.type';

export interface IBaseCrudService<MODEL, ID> {
  /**
   * Create a new record with the given data
   * @param data
   * @returns The created record
   */
  create<DTO>(data: DTO): Promise<MODEL>;

  /**
   * Find a record by ID
   * @param id
   * @returns The record with given ID
   */
  findOneById(id: ID): Promise<MODEL | null>;

  /**
   * Find all records
   */
  findAll(): Promise<MODEL[]>;

  /**
   * Update a record by ID
   * @param id
   * @param data
   * @returns The updated record
   */
  updateById<DTO>(id: ID, data: Partial<DTO>): Promise<UpdateResultType>;

  /**
   * Delete a record by ID
   * @param id
   * @returns The deleted record
   */
  deleteById(id: ID): Promise<DeleteResultType>;

  /**
   * Find all with paging and order
   * @param requestPageable
   * @param order
   * @returns MODEL[]
   */
  findAllWithPagingAndOrder(requestPageable: RequestPageable, order: RecordOrderType): Promise<Page<MODEL>>;

  /**
   * Find all with paging
   * @param requestPageable
   * @returns MODEL[]
   */
  findAllWithPaging(requestPageable: RequestPageable): Promise<Page<MODEL>>;
}
