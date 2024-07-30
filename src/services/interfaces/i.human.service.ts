import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { LoginHumanResponseDto } from "@/dto/human/LoginHumanResponseDto";
import { Human } from "@/models/humans.model";
import { IBaseCrudService } from "@/services/interfaces/i.base-crud.service";

export interface IHumanService extends IBaseCrudService<Human, number> {
    getHumanDetailById(id: number): Promise<GetHumanDetailResponseDTO>;
    humanLogin(username: string, password: string): Promise<LoginHumanResponseDto>;
}