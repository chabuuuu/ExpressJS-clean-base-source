import { DeleteResultType, UpdateResultType } from "@/repository/interfaces/i.base.repository";

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
    updateById<DTO> (id: ID, data: Partial<DTO>): Promise<UpdateResultType>;

    /**
     * Delete a record by ID
     * @param id 
     * @returns The deleted record
     */
    deleteById(id: ID): Promise<DeleteResultType>;
}