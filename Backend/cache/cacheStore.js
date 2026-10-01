const cache = new Map();
const inFlight = new Map();

const setCache = (key, data, ttl) => {
    const expiresAt = Date.now() + ttl;

    cache.set(key, {    
        data,
        expiresAt,
    })
}

const getCache = (key) => {
    const cached = cache.get(key);

    // If key does not exist
    if(!cached) {
        return null;
    }

    // If time is greater then the cache data store time
    if(Date.now() > cached.expiresAt) {
        cache.delete(key);
        return null;
    }

    return cached.data;
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