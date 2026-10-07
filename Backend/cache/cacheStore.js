// For backend manage the redis cache.
// const cache = new Map();
const { redisClient } = require('./redisClient');
const inFlight = new Map();

// Data ko Redis me cache ki form me save krna
const setCache = async (key, data, ttl) => {
    const expiresAt = Date.now() + ttl;

    const cachedData = {
        data,  // actual data
        expiresAt,    // when data is stale
    };

    await redisClient.set(
        key,
        JSON.stringify(cachedData)
    )
}

const getCache = async (key) => {
    const cached = await redisClient.get(key);

    // If key does not exist
    if (!cached) {
        return null;
    }

    const cacheData = JSON.parse(cached);
    const isStale = Date.now() > cacheData.expiresAt;

    return {
        data: cacheData.data,
        isStale,
    }
}

// Is the key request is already working
const getInFlight = (key) => {
    return inFlight.get(key);
}

// This request is currently running store this request in the promise
const setInFlight = (key, promise) => {
    inFlight.set(key, promise);
}

// Request has been completed so dont put this in the inFlight
const deleteInFlight = (key) => {
    inFlight.delete(key);
}

module.exports = {
    setCache,
    getCache,
    getInFlight,
    setInFlight,
    deleteInFlight
}
