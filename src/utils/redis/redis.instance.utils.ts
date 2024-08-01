import { Redis } from "ioredis";

class RedisSingleton {
  private static instance: Redis;

  private constructor() {}

  public static getInstance(): Redis {
    if (!RedisSingleton.instance) {
      const url = process.env.REDIS_URL || "redis://localhost:6379";
      RedisSingleton.instance = new Redis(url);
    }
    return RedisSingleton.instance;
  }
}

const redisInstance = RedisSingleton.getInstance();

export default redisInstance;
