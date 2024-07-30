import { Dog } from "@/models/dogs.model";
import { IDogRepository } from "@/repository/interfaces/i.dog.repository";
import { BaseCrudService } from "@/services/base-crud.service";
import { IDogService } from "@/services/interfaces/i.dog.service";
import { DiTypes } from "@/types/di/DiTypes";
import { inject, injectable } from "inversify";

@injectable()
export class DogService extends BaseCrudService<Dog, number> implements IDogService {
    protected dogRepository: IDogRepository<Dog, number>;
    constructor(
        @inject(DiTypes.DOG_REPOSITORY) dogRepository: IDogRepository<Dog, number>) {
        super(dogRepository);
        this.dogRepository = dogRepository;
    }
}