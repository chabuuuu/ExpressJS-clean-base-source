import { ErrorCode } from '@/enums/ErrorCode.enum';
import { IBaseRepository } from '@/repository/interfaces/i.base.repository';
import { DeleteResultType } from '@/types/DeleteResult.type';
import { RecordOrderType } from '@/types/RecordOrder.type';
import { UpdateResultType } from '@/types/UpdateResult.type';
import BaseException from '@/utils/exception/BaseException';
import { injectable } from 'inversify';
import { Attributes, Identifier, WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';

@injectable()
export abstract class BaseRepository<T extends Model, ID extends Identifier | undefined>
  implements IBaseRepository<T, ID>
{
  protected BaseModel!: ModelCtor<T>;

  public async findAllWithPaging(pageSize: number, pageNumber: number): Promise<T[]> {
    const result = await this.BaseModel.findAll({
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize
    });
    return result;
  }

  public async create(data: T): Promise<T> {
    const result = await this.BaseModel.create(data as MakeNullishOptional<T['_creationAttributes']>);
    return result;
  }

  public async findOneAndDelete(filter: Partial<T>): Promise<DeleteResultType> {
    const recordToDelete = await this.BaseModel.findOne({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined
    });
    if (!recordToDelete) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    await recordToDelete.destroy();
    return {
      message: 'Record deleted successfully'
    };
  }

  public async findOneById(id: ID): Promise<T | null> {
    const result = await this.BaseModel.findByPk(id);
    return result;
  }

  public async updateById(id: ID, data: Partial<T>): Promise<UpdateResultType> {
    const recordToUpdate = await this.BaseModel.findByPk(id);
    if (!recordToUpdate) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    await recordToUpdate.update(data as MakeNullishOptional<T['_creationAttributes']>);
    return {
      message: 'Record updated successfully'
    };
  }

  public async findOneAndUpdate(filter: Partial<T>, updateData: Partial<T>): Promise<UpdateResultType> {
    const recordToUpdate = await this.BaseModel.findOne({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined
    });
    if (!recordToUpdate) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    await recordToUpdate.update(updateData as MakeNullishOptional<T['_creationAttributes']>);
    return {
      message: 'Record updated successfully'
    };
  }

  public async deleteById(id: ID): Promise<DeleteResultType> {
    const recordToDelete = await this.BaseModel.findByPk(id);
    if (!recordToDelete) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    await recordToDelete.destroy();
    return {
      message: 'Record deleted successfully'
    };
  }

  public async findOne(filter: Partial<T>): Promise<T | null> {
    const result = await this.BaseModel.findOne({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined
    });
    if (!result) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    return result;
  }

  public async findOneWithRelations(filter: Partial<T>, relations: string[]): Promise<T | null> {
    const result = await this.BaseModel.findOne({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined,
      include: relations
    });
    if (!result) {
      throw new BaseException(ErrorCode.NF_01, 'Record not found', 404);
    }
    return result;
  }

  public async findMany(filter: Partial<T>): Promise<T[]> {
    const result = await this.BaseModel.findAll({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined
    });
    return result;
  }

  public async search(filter: Partial<T>, pageSize: number, pageNumber: number, order?: RecordOrderType): Promise<T[]> {
    const result = await this.BaseModel.findAll({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined,
      limit: pageSize,
      offset: (pageNumber - 1) * pageSize,
      order: order ? [[order.column, order.direction]] : undefined
    });
    return result;
  }

  public async findAll(): Promise<T[]> {
    const result = await this.BaseModel.findAll();
    return result;
  }

  public async findAllWithPagingAndOrder(order: RecordOrderType, pageSize: number, pageNumber: number): Promise<T[]> {
    const result = await this.BaseModel.findAll({
      limit: pageSize,
      offset: pageNumber * pageSize,
      order: [[order.column, order.direction]]
    });
    return result;
  }

  public async exists(filter: Partial<T>): Promise<boolean> {
    const result = await this.BaseModel.findOne({
      where: filter as unknown as WhereOptions<Attributes<T>> | undefined
    });
    return result ? true : false;
  }
}
