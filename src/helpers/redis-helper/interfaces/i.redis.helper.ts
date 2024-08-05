import { CacheSchema } from '@/enums/CacheSchema.enum';

/**
 ** A helper that helps to interact with the redis cache
 */
export interface IRedisHelper {
  getCache(): Promise<JSON | null>;

  setCache(data: any): Promise<any>;

  cleanCache(): Promise<any>;
}
