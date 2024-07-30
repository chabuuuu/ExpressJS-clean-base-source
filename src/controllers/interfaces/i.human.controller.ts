import { CreateHumanResponseDto } from "@/dto/human/CreateHumanResponseDto";
import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { LoginHumanRequestDto } from "@/dto/human/LoginHumanRequestDto";
import { LoginHumanResponseDto } from "@/dto/human/LoginHumanResponseDto";
import { RequestPageable } from "@/dto/request/RequestPagable.dto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { PagingResponse } from "@/dto/response/PagingResponse.dto";
import { Human } from "@/models/humans.model";
import { NextFunction, Request, Response } from "express";

export interface IHumanController {
  createHuman(
    req: Request,
    res: Response<BaseResponse<CreateHumanResponseDto>>,
    next: NextFunction
  ): Promise<void>;

  getHumanDetail(
    req: Request<{ humanId: string }>,
    res: Response<BaseResponse<GetHumanDetailResponseDTO>>,
    next: NextFunction
  ): Promise<void>;

  getHumanListPaging(
    req: Request<null, null, null, RequestPageable>,
    res: Response<BaseResponse<PagingResponse<Human>>>,
    next: NextFunction
  ): Promise<void>;

  humanLogin(
    req: Request<null, null, LoginHumanRequestDto>,
    res: Response<BaseResponse<LoginHumanResponseDto>>,
    next: NextFunction
  ): Promise<void>;
}
