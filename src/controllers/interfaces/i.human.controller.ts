import { CreateHumanResponseDto } from "@/dto/human/CreateHumanResponseDto";
import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { NextFunction, Request, Response } from "express";

export interface IHumanController {
    createHuman(
    req: Request, 
    res: Response<BaseResponse<CreateHumanResponseDto>>, 
    next: NextFunction) : Promise<void>
    
    getHumanDetail
    (
    req: Request<{humanId: string}>, 
    res: Response<BaseResponse<GetHumanDetailResponseDTO>>, 
    next: NextFunction) 
    :Promise<void>
}