import { IHumanController } from "@/controllers/interfaces/i.human.controller";
import { CreateHumanRequestDto } from "@/dto/human/CreateHumanRequestDto";
import { CreateHumanResponseDto } from "@/dto/human/CreateHumanResponseDto";
import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { IHumanService } from "@/services/interfaces/i.human.service";
import { DiTypes } from "@/types/di/DiTypes";
import { convertToDto } from "@/utils/dto-convert/convert-to-dto";
import ResponseGenerator from "@/utils/response/ResponseGenerator";
import { createHumanValidateSchema } from "@/validation/human.validation";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class HumanController implements IHumanController {
    protected humanService: IHumanService;

    constructor(
        @inject(DiTypes.HUMAN_SERVICE) humanService: IHumanService,
    ){
        this.humanService = humanService
    }

    /**
     ** POST /human/create
     * @param req 
     * @param res 
     * @param next 
     */
    async createHuman(req: Request, res: Response<BaseResponse<CreateHumanResponseDto>>, next: NextFunction) : Promise<void>
    {
        try {
            const data  = req.body;

            //Validate request body
            await createHumanValidateSchema.validateAsync(data);

            // Convert request to DTO
            const requestDtoConverted = convertToDto(CreateHumanRequestDto, data);

            const result = await this.humanService.create(requestDtoConverted);

            // Convert result to DTO
            const responseDtoConverted = convertToDto(CreateHumanResponseDto, result);

            //Format response
            const formatedReponse = new ResponseGenerator<CreateHumanResponseDto>().createSuccessResponse(responseDtoConverted);

            res.json(formatedReponse);
        } catch (error: any) {
            next(error);
        }
    }

    /**
     ** GET /human/detail/:humanId
     * @param req 
     * @param res 
     * @param next 
     */
    async getHumanDetail
    (
    req: Request<{humanId: string}>, 
    res: Response<BaseResponse<GetHumanDetailResponseDTO>>, 
    next: NextFunction) 
    :Promise<void>
    {
        try {
            const humanId = req.params.humanId;
            const result = await this.humanService.getHumanDetailById(Number(humanId));
            res.json(new ResponseGenerator<GetHumanDetailResponseDTO>().findOneSuccessResponse(result));
        } catch (error: any) {
            next(error);
        }
    }
}