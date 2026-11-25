require("dotenv").config();

const app = require("./main");
const { connectRedis } = require("./config/redisClient");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectRedis();

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`CryptoPlace API running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Redis connection failed:", error);
        process.exit(1);
    }
};

startServer();