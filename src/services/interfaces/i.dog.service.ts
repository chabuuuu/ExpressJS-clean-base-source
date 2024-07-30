import { Dog } from "@/models/dogs.model";
import { IBaseCrudService } from "@/services/interfaces/i.base-crud.service";

export interface IDogService extends IBaseCrudService<Dog, number>{}