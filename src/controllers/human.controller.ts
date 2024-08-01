import { IHumanController } from "@/controllers/interfaces/i.human.controller";
import { CreateHumanRequestDto } from "@/dto/human/CreateHumanRequestDto";
import { CreateHumanResponseDto } from "@/dto/human/CreateHumanResponseDto";
import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { GetHumanResponseDto } from "@/dto/human/GetHumanResponseDto";
import { LoginHumanRequestDto } from "@/dto/human/LoginHumanRequestDto";
import { LoginHumanResponseDto } from "@/dto/human/LoginHumanResponseDto";
import { RequestPageable } from "@/dto/request/RequestPagable.dto";
import { BaseResponse } from "@/dto/response/BaseResponse.dto";
import { PagingResponse } from "@/dto/response/PagingResponse.dto";
import { IHumanRedisHelper } from "@/helpers/redis-helper/interfaces/i.human-redis.helper";
import { Human } from "@/models/humans.model";
import { IHumanService } from "@/services/interfaces/i.human.service";
import { DiTypes } from "@/types/di/DiTypes";
import { Page } from "@/types/Page.type";
import { convertToDto } from "@/utils/dto-convert/convert-to-dto";
import { convertToPageDto } from "@/utils/dto-convert/convert-to-page-dto";
import ResponseGenerator from "@/utils/response/ResponseGenerator";
import {
  createHumanValidateSchema,
  loginHumanValidateSchema,
} from "@/validation/human.validation";
import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";

@injectable()
export class HumanController implements IHumanController {
  protected humanService: IHumanService;
  protected humanRedisHelper: IHumanRedisHelper;

  constructor(
    @inject(DiTypes.HUMAN_SERVICE) humanService: IHumanService,
    @inject(DiTypes.HUMAN_REDIS_HELPER) humanRedisHelper: IHumanRedisHelper
  ) {
    this.humanService = humanService;
    this.humanRedisHelper = humanRedisHelper;
  }

  /**
   ** POST /human/login
   * @param req
   * @param res
   * @param next
   */
  async humanLogin(
    req: Request<null, null, LoginHumanRequestDto>,
    res: Response<BaseResponse<LoginHumanResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      //Validate request body
      await loginHumanValidateSchema.validateAsync(req.body);

      //Get username and password from request body
      const { username, password } = req.body;

      const result = await this.humanService.humanLogin(username, password);

      res.json(
        new ResponseGenerator<LoginHumanResponseDto>().findOneSuccessResponse(
          result
        )
      );
    } catch (error) {
      next(error);
    }
  }

  /**
   ** POST /human/create
   * @param req
   * @param res
   * @param next
   */
  async createHuman(
    req: Request,
    res: Response<BaseResponse<CreateHumanResponseDto>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;

      //Validate request body
      await createHumanValidateSchema.validateAsync(data);

      // Convert request to DTO
      const requestDtoConverted = convertToDto(CreateHumanRequestDto, data);

      const result = await this.humanService.create(requestDtoConverted);

      // Convert result to DTO
      const responseDtoConverted = convertToDto(CreateHumanResponseDto, result);

      //Format response
      const formatedReponse =
        new ResponseGenerator<CreateHumanResponseDto>().createSuccessResponse(
          responseDtoConverted
        );

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
  async getHumanDetail(
    req: Request<{ humanId: string }>,
    res: Response<BaseResponse<GetHumanDetailResponseDTO>>,
    next: NextFunction
  ): Promise<void> {
    try {
      const humanId = req.params.humanId;
      const result = await this.humanService.getHumanDetailById(
        Number(humanId)
      );
      res.json(
        new ResponseGenerator<GetHumanDetailResponseDTO>().findOneSuccessResponse(
          result
        )
      );
    } catch (error: any) {
      next(error);
    }
  }

  /**
   ** GET /human/list-paing
   * @param req
   * @param res
   * @param next
   */
  async getHumanListPaging(
    req: Request<null, null, null, RequestPageable>,
    res: Response<BaseResponse<PagingResponse<GetHumanResponseDto>> | JSON>,
    next: NextFunction
  ): Promise<void> {
    try {
      //Generate request pageable
      const { page, rpp } = req.query;
      const requestPageable = new RequestPageable(page, rpp);

      //Check data from cache
      const cacheData = await this.humanRedisHelper.getCachePaging(
        requestPageable
      );
      if (cacheData) {
        res.json(cacheData);
        return;
      }

      //Find all with paging
      let result = await this.humanService.findAllWithPaging(requestPageable);

      //Convert result to DTO
      const convertedResult = convertToPageDto(GetHumanResponseDto, result);

      //Format response
      const formatedReponse =
        new ResponseGenerator<GetHumanResponseDto>().pagingSuccessResponse(
          convertedResult,
          requestPageable
        );

      //Set cache
      this.humanRedisHelper.setCachePaging(formatedReponse, requestPageable);

      res.json(formatedReponse);
    } catch (error: any) {
      next(error);
    }
  }
}
