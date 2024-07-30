import { IBaseRepository } from "@/repository/interfaces/i.base.repository";
import { DeleteResultType } from "@/types/DeleteResult.type";
import { RecordOrderType } from "@/types/RecordOrder.type";
import { UpdateResultType } from "@/types/UpdateResult.type";
import BaseException from "@/utils/exception/BaseException";
import { injectable } from "inversify";
import { Attributes, Identifier, WhereOptions } from "sequelize";
import { Model, ModelCtor } from "sequelize-typescript";
import { MakeNullishOptional } from "sequelize/types/utils";

@injectable()
export abstract class BaseRepository<T extends Model, ID extends Identifier | undefined> implements IBaseRepository<T, ID> {

    protected BaseModel!: ModelCtor<T>;

    public async findAllWithPaging(pageSize: number, pageNumber: number): Promise<T[]> {
        try {
            const result = await this.BaseModel.findAll({
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async create(data: T): Promise<T> {
        try {            
            const result = await this.BaseModel.create(data as MakeNullishOptional<T["_creationAttributes"]>);            
            return result;
        } catch (error: any) {            
            throw new Error(error.message);
        }
    }

    public async findOneAndDelete(filter: Partial<T>): Promise<DeleteResultType> {
        try {
            const recordToDelete = await this.BaseModel.findOne({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined
            })
            if (!recordToDelete) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            await recordToDelete.destroy();
            return {
                message: "Record deleted successfully"
            };
        }
        catch (error: any)
        {
            throw error;
        }
    }

    public async findOneById(id: ID): Promise<T | null> {
        try {
            const result = await this.BaseModel.findByPk(id );
            return result;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateById(id: ID, data: Partial<T>): Promise<UpdateResultType> {
        try {
            const recordToUpdate = await this.BaseModel.findByPk(id);
            if (!recordToUpdate) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            await recordToUpdate.update(data as MakeNullishOptional<T["_creationAttributes"]>);
            return {
                message: "Record updated successfully"
            };
        } catch (error: any) {
            throw error;
        }
    }

    public async findOneAndUpdate(filter: Partial<T>, updateData: Partial<T>): Promise<UpdateResultType> {
        try {
            const recordToUpdate = await this.BaseModel.findOne({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined
            })
            if (!recordToUpdate) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            await recordToUpdate.update(updateData as MakeNullishOptional<T["_creationAttributes"]>);
            return ({
                message: "Record updated successfully"
            });
        } catch (error: any) {
            throw error;
        }
    }

    public async deleteById(id: ID): Promise<DeleteResultType> {
        try {
            const recordToDelete = await this.BaseModel.findByPk(id);
            if (!recordToDelete) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            await recordToDelete.destroy();
            return ({
                message: "Record deleted successfully"
            });
        } catch (error: any) {
            throw error;
        }
    }

    public async findOne(filter: Partial<T>): Promise<T | null> {
        try {
            const result = await this.BaseModel.findOne({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined
            });
            if (!result) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            return result;
        } catch (error: any) {
            throw error;    
        }
    }

    public async findOneWithRelations(filter: Partial<T>, relations: string[]): Promise<T | null> {
        try {
            const result = await this.BaseModel.findOne({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined,
                include: relations
            });
            if (!result) {
                throw new BaseException("NF_01", "Record not found", 404);
            }
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async findMany(filter: Partial<T>): Promise<T[]> {
        try {
            const result = await this.BaseModel.findAll({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async search(
        filter: Partial<T>, 
        pageSize: number, 
        pageNumber: number, 
        order?: RecordOrderType
    ): Promise<T[]> {
        try {
            const result = await this.BaseModel.findAll({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined,
                limit: pageSize,
                offset: (pageNumber - 1) * pageSize,
                order: order ? [[order.column, order.direction]] : undefined
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async findAll(): Promise<T[]> {
        try {
            const result = await this.BaseModel.findAll();
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async findAllWithPagingAndOrder(order: RecordOrderType, pageSize: number, pageNumber: number): Promise<T[]> {
        try {
            const result = await this.BaseModel.findAll({
                limit: pageSize,
                offset: pageNumber * pageSize,
                order: [[order.column, order.direction]]
            });
            return result;
        } catch (error: any) {
            throw error;
        }
    }

    public async exists(filter: Partial<T>): Promise<boolean> {
        try {
            const result = await this.BaseModel.findOne({
                where: filter as unknown as WhereOptions<Attributes<T>> | undefined
            });
            return (result ? true : false);
        } catch (error: any) {
            throw error;
        }
    }

}