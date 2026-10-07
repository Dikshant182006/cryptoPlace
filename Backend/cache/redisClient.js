// It creates a bridge which is responsible for the setting bridge between redis
const { createClient } = require("redis");

// It is used to communicate with redis/ creating a redis client
const redisClient = createClient({
    url: process.env.REDIS_URL,
});

// Redis Error Listener
redisClient.on("error", (error) => {
    console.error("Redis Error", error);
})

const connectRedis = async () => {
    await redisClient.connect();  // Connect the redis server
    console.log("Redis connected");
}   

module.exports = {
    redisClient,                    // Actual Client obj jisse commucation hogi.
    connectRedis,                   // Server ka actual connection banana.
}
