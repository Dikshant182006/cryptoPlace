require("dotenv").config();

const app = require("./main");
const { connectRedis } = require("./config/redisClient");

const port = process.env.PORT || 3000;

connectRedis()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Redis connection failed:", error);
    });
