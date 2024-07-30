import { DeleteResultType } from "@/types/DeleteResult.type";
import { RecordOrderType } from "@/types/RecordOrder.type";
import { UpdateResultType } from "@/types/UpdateResult.type";

export interface IBaseRepository<T, ID> {
    /**
     * Create a new record with the given data
     * @param data 
     * @returns The created record
     */
    create(data: T): Promise<T>;

    /**
     * Find a record by the given filter and delete it
     * @param filter 
     * @returns The deleted record
     */
    findOneAndDelete(filter: Partial<T>): Promise<DeleteResultType>;

    /**
     * Find a record by ID
     * @param id 
     * @returns The record with given ID
     */
    findOneById(id: ID): Promise<T | null>;

    /**
     * Update a record by ID
     * @param id 
     * @param data 
     * @returns The updated success message
     */
    updateById(id: ID, data: Partial<T>): Promise<UpdateResultType>;

    /**
     * Find a record by the given filter and update it
     * @param filter 
     * @param updateData 
     * @returns The updated success message
     */
    findOneAndUpdate(filter: Partial<T>, updateData: Partial<T>): Promise<UpdateResultType>;

    /**
     * Delete a record by ID
     * @param id 
     * @returns The deleted success message
     */
    deleteById(id: ID): Promise<DeleteResultType>;

    /**
     * Find a record by the given filter
     * @param filter 
     * @returns The record with given filter
    */
    findOne(filter: Partial<T>): Promise<T | null>;

    /**
     * Find a record by the given filter with the given relations
     * @param filter 
     * @param relations 
     * @returns The record with given filter
     */
    findOneWithRelations(filter: Partial<T>, relations: string[]): Promise<T | null>;

    /**
     * Find all records by the given filter
     * @param filter 
     * @returns The records with given filter
     */
    findMany(filter: Partial<T>): Promise<T[]>;  
    
    /**
     * Search records by the given filter, order, pageSize and pageNumber
     * @param filter 
     * @param order 
     * @param pageSize 
     * @param pageNumber 
     */
    search(filter: Partial<T>, pageSize: number, pageNumber: number, order?: RecordOrderType,): Promise<T[]>;
    
    /**
     * Find all records
     */
    findAll(): Promise<T[]>;

    /**
     * Find all with paging and order
     * @param order 
     * @param pageSize 
     * @param pageNumber 
     */
    findAllWithPagingAndOrder(order: RecordOrderType, pageSize: number, pageNumber: number): Promise<T[]>;

    /**
     * Find all with paging
     * @param pageSize 
     * @param pageNumber 
     */
    findAllWithPaging(pageSize: number, pageNumber: number): Promise<T[]>;
    
    /**
     * Check if a record exists with the given filter
     * @param filter 
     */
    exists(filter: Partial<T>): Promise<boolean>;
}