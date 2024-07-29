import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { Human } from "@/models/humans.model";
import { IBaseCrudService } from "@/services/interfaces/i.base-crud.service";

export interface IHumanService extends IBaseCrudService<Human, number> {
    getHumanDetailById(id: number): Promise<GetHumanDetailResponseDTO>;
}