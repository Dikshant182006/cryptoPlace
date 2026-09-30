const cache = new Map();

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

module.exports = {
    setCache,
    getCache,
}
