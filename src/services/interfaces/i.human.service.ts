import { GetHumanDetailResponseDTO } from '@/dto/human/GetHumanDetailResponseDto';
import { LoginHumanResponseDto } from '@/dto/human/LoginHumanResponseDto';
import { RequestPageable } from '@/dto/request/RequestPagable.dto';
import { Human } from '@/models/humans.model';
import { IBaseCrudService } from '@/services/interfaces/i.base-crud.service';
import { Page } from '@/types/Page.type';

export interface IHumanService extends IBaseCrudService<Human, number> {
  getHumanDetailById(id: number): Promise<GetHumanDetailResponseDTO>;
  humanLogin(username: string, password: string): Promise<LoginHumanResponseDto>;
}
