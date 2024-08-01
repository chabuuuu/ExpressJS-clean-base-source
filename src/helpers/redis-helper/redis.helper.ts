import { CacheSchema } from "@/enums/CacheSchema.enum";
import { IRedisHelper } from "@/helpers/redis-helper/interfaces/i.redis.helper";
import { injectable } from "inversify";

@injectable()
export abstract class RedisHelper implements IRedisHelper {
  public static schema = CacheSchema;

  public abstract getCache(): Promise<any>;

  public abstract setCache(data: any): Promise<any>;

  public abstract cleanCache(): Promise<any>;
}
