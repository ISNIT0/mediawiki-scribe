export const redisDefault =
process.env.REDIS_URI ||
process.env.REDISCLOUD_URL || // heroku
(process.env.REDIS_PORT_6379_TCP_ADDR // docker
  ? `redis://${process.env.REDIS_PORT_6379_TCP_ADDR}:${
      process.env.REDIS_PORT_6379_TCP_PORT
    }`
  : 'redis://localhost:6379') // native
