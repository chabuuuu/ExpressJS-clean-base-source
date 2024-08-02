import redisInstance from "@/utils/redis/redis.instance.utils";

export async function deleteRedisKeyMatch(key: string) {
  const stream = redisInstance.scanStream({
    match: key,
  });
  stream.on("data", (resultKeys) => {
    for (let i = 0; i < resultKeys.length; i++) {
      redisInstance.del(resultKeys[i]);
    }
  });
  stream.on("end", () => {
    console.log("done delete all keys match with: ", key);
  });
}
