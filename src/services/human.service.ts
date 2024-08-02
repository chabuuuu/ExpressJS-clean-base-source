import { ACCESS_TOKEN_EXPIRE_TIME } from "@/constants/ACCESS_TOKEN_EXPIRE_TIME.constant";
import { GetHumanDetailResponseDTO } from "@/dto/human/GetHumanDetailResponseDto";
import { LoginHumanResponseDto } from "@/dto/human/LoginHumanResponseDto";
import { RequestPageable } from "@/dto/request/RequestPagable.dto";
import { ErrorCode } from "@/enums/ErrorCode.enum";
import { IHumanRedisHelper } from "@/helpers/redis-helper/interfaces/i.human-redis.helper";
import { Human } from "@/models/humans.model";
import { IHumanRepository } from "@/repository/interfaces/i.human.repository";
import { BaseCrudService } from "@/services/base-crud.service";
import { IHumanService } from "@/services/interfaces/i.human.service";
import { DiTypes } from "@/types/di/DiTypes";
import { Page } from "@/types/Page.type";
import { UserJwt } from "@/types/UserJwt.type";
import BaseException from "@/utils/exception/BaseException";
import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";

@injectable()
export class HumanService
  extends BaseCrudService<Human, number>
  implements IHumanService
{
  protected humanRepository: IHumanRepository<Human, number>;

  constructor(
    @inject(DiTypes.HUMAN_REPOSITORY)
    humanRepository: IHumanRepository<Human, number>,
    @inject(DiTypes.HUMAN_REDIS_HELPER)
    humanRedisHelper: IHumanRedisHelper
  ) {
    super(humanRepository);
    this.humanRepository = humanRepository;
  }

  /**
   ** Login human
   * @param username
   * @param password
   */
  async humanLogin(
    username: string,
    password: string
  ): Promise<LoginHumanResponseDto> {
    const human = await this.humanRepository.findOne({ username, password });
    if (!human) {
      throw new BaseException(ErrorCode.NF_01, "Human not found", 404);
    }

    const tokenPayload: UserJwt = {
      id: human.id,
      username: human.username,
      role: human.role,
    };

    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    const token = jwt.sign(tokenPayload, JWT_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRE_TIME,
    });

    return {
      human: {
        id: human.id,
        name: human.name,
        username: human.username,
        role: human.role,
      },
      token: token,
    };
  }

  /**
   *
   * @param id
   */
  async getHumanDetailById(id: number): Promise<GetHumanDetailResponseDTO> {
    const human = await this.humanRepository.findOneById(id);
    if (!human) {
      throw new BaseException(ErrorCode.NF_01, "Human not found", 404);
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
