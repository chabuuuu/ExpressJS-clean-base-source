import { RequestPageable } from '@/dto/request/RequestPagable.dto';
import { IHumanRedisHelper } from '@/helpers/redis-helper/interfaces/i.human-redis.helper';
import { RedisHelper } from '@/helpers/redis-helper/redis.helper';
import { deleteRedisKeyMatch } from '@/utils/redis/redis-delete-key-match';
import redisInstance from '@/utils/redis/redis.instance.utils';
import { injectable } from 'inversify';

@injectable()
export class HumanRedisHelper extends RedisHelper implements IHumanRedisHelper {
  public expireTime = 60 * 60 * 24;
  public async getCache(): Promise<JSON | null> {
    const data = await redisInstance.get(RedisHelper.schema.HUMANS);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }
  public async setCache(data: any): Promise<any> {
    await redisInstance.set(RedisHelper.schema.HUMANS, JSON.stringify(data), 'EX', this.expireTime);
  }
  public async cleanCache(): Promise<any> {
    await deleteRedisKeyMatch(RedisHelper.schema.HUMANS);
  }
  public async getCachePaging(requestPageable: RequestPageable): Promise<JSON | null> {
    const data = await redisInstance.get(RedisHelper.schema.HUMANS_PAGING + JSON.stringify(requestPageable));
    if (data) {
      return JSON.parse(data);
    }
    return null;
  }

  public async setCachePaging(data: any, requestPageable: RequestPageable): Promise<any> {
    await redisInstance.set(
      RedisHelper.schema.HUMANS_PAGING + JSON.stringify(requestPageable),
      JSON.stringify(data),
      'EX',
      this.expireTime
    );
  }
}
