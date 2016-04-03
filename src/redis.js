import bluebird from 'bluebird'
import redis from 'redis'

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

export const pub = redis.createClient()
export const sub = redis.createClient()
