import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { Human } from "@/models/humans.model";
import { IHumanRepository } from "@/repository/interfaces/i.human.repository";
import { BaseCrudService } from "@/services/base-crud.service";
import { IHumanService } from "@/services/interfaces/i.human.service";
import { DiTypes } from "@/types/di/DiTypes";
import BaseException from "@/utils/exception/BaseException";
import { inject, injectable } from "inversify";

@injectable()
export class HumanService extends BaseCrudService<Human, number>
implements IHumanService {
    protected humanRepository: IHumanRepository<Human, number>;

    constructor(
        @inject(DiTypes.HUMAN_REPOSITORY) humanRepository: IHumanRepository<Human, number>,
    ) {
        super(humanRepository);
        this.humanRepository = humanRepository;
    }


    /**
     * 
     * @param id 
     */
    async getHumanDetailById(id: number): Promise<GetHumanDetailResponseDTO> {
        const human = await this.humanRepository.findOneById(id);
        if (!human) {
            throw new BaseException("NF_01", "Human not found", 404);
        }
        const dogsOfHuman = await human?.$get("dogs");
        const result = new GetHumanDetailResponseDTO();
        result.id = human!.id;
        result.name = human!.name;
        result.dogs = dogsOfHuman;
        result.totalDogs = dogsOfHuman?.length;
        return result;
    }
}