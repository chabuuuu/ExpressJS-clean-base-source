import { CreateNewDogResponseDto } from "@/dto/dog/CreateNewDogResponseDto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { NextFunction, Request, Response } from "express";

export interface IDogController {
    createNewDog
    (
        req: Request, 
        res: Response<BaseResponse<CreateNewDogResponseDto>>, 
        next: NextFunction) 
    : Promise<void>
}