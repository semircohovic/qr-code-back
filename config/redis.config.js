const redis = require("redis");
const { REDIS_PORT, REDIS_URL } = require("./config");

// const redis_client = redis.createClient(
//   process.env.REDIS_PORT,
//   process.env.REDIS_HOST
// );

// redis_client.on("connect", function () {
//   console.log("redis client connected");
// });

const redis_client = redis.createClient(REDIS_PORT, REDIS_URL);

redis_client.on("connect", function () {
  console.log("redis client connected");
});

module.exports = redis_client;
