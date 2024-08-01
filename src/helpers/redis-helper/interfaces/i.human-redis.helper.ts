import { RequestPageable } from "@/dto/request/RequestPagable.dto";
import { IRedisHelper } from "@/helpers/redis-helper/interfaces/i.redis.helper";

export interface IHumanRedisHelper extends IRedisHelper {
  getCachePaging(requestPageable: RequestPageable): Promise<JSON | null>;
  setCachePaging(data: any, requestPageable: RequestPageable): Promise<any>;
}
