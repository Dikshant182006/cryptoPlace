// This file is where we communicate with coinGreko
const axios = require('axios');
const { getCache,
    setCache,
    getInFlight,
    setInFlight,
    deleteInFlight,
} = require('../cache/cacheStore');

const getCoins = async (currency, page, perPage) => {
    // Cache ka address/data name
    const cacheKey = `coins:${currency}:${page}:${perPage}`;
    // Check completed cache
    const cachedData = await getCache(cacheKey);

    if (cachedData && !cachedData.isStale) {
        console.log("Redis Hit:", cacheKey);
        return cachedData.data;
    }

    // Check existing request
    const existingRequest = getInFlight(cacheKey);

    if (existingRequest) {
        console.log("IN-FLIGHT HIT:", cacheKey);
        return existingRequest;
    }

    console.log(
        cachedData?.isStale
            ? "STALE CACHE:" :
            "Redis Miss:", cacheKey
    );

    // Promise/ Create Request
    const request = axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
            params: {
                vs_currency: currency,
                order: "market_cap_desc",
                per_page: perPage,
                page: page,
                sparkline: false,
                price_change_percentage: "1h,24h,7d",
            },
        }
    ).then((response) => response.data);

    // Store Promise
    setInFlight(cacheKey, request);

    try {
        // Wait for response
        const response = await request;

        // Store data in cache
        await setCache(cacheKey, response, 30000);
        return response;
    } catch (error) {
        if (cachedData?.isStale) {
            console.log("COINGECKO FAILED → RETURNING STALE CACHE");

            return cachedData.data;
        }

        throw error;
    } finally {
        // Request Finished
        deleteInFlight(cacheKey);
    }
}

const getGlobal = async (currency) => {

    const cacheKey = `global:${currency}`;
    const cacheData = await getCache(cacheKey);

    if (cacheData && !cacheData.isStale) {
        console.log("CACHE HIT", cacheKey);
        return cacheData.data;
    }

    console.log("CACHE MISS", cacheKey);

    const existingRequest = getInFlight(cacheKey);
    if (existingRequest) {
        console.log("IN-FLIGHT HIT", cacheKey);
        return existingRequest;
    }

    const request = axios.get(
        "https://api.coingecko.com/api/v3/global",
        {
            params: {
                vs_currency: currency
            }
        }
    ).then((response) => response.data);

    setInFlight(cacheKey, request);

    try {
        const response = await request;

        await setCache(cacheKey, response, 60000);
        return response;
    } catch (error) {

        if (cacheData?.isStale) {
            console.log("COINGECKO FAILED → RETURNING STALE CACHE");

            return cacheData.data;
        }

        throw error;
    } finally {
        deleteInFlight(cacheKey);
    }
}

const getCoinDetails = async (id) => {
    const cacheKey = `coinDetails:${id}`;
    const cacheData = await getCache(cacheKey);

    if (cacheData && !cacheData.isStale) {
        console.log("Coin Details Hit:", cacheKey);
        return cacheData.data;
    }

    const existingRequest = getInFlight(cacheKey);
    if (existingRequest) {
        console.log("In flight", cacheKey);
        return existingRequest;
    }

    const request = axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
    ).then((response) => response.data);

    setInFlight(cacheKey, request);

    try {
        const response = await request;

        await setCache(cacheKey, response, 60000);
        return response;
    } catch (error) {
        if (cacheData?.isStale) {
            console.log("COINGREKO FAILS RETURN STALE CACHE");

            return cacheData.data;
        }

        throw error;
    }
    finally {
        deleteInFlight(cacheKey);
    }
}

const getCoinChart = async (id, currency, days, interval) => {
    const cacheKey = `chart:${id}:${currency}:${days}:${interval}`;
    const cacheData = await getCache(cacheKey);

    if (cacheData && !cacheData.isStale) {
        console.log("Chart Details Hit: ", cacheKey);
        return cacheData.data;
    }

    console.log("Chart Details Miss");

    const existingRequest = getInFlight(cacheKey);
    if (existingRequest) {
        return existingRequest;
    }

    const request = axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
            params: {
                vs_currency: currency, // It dynamically passes usd, inr, eur
                days,
                interval,
            },
        }
    ).then((response) => response.data);

    setInFlight(cacheKey, request);

    try {
        const response = await request;

        await setCache(cacheKey, response, 60000);
        return response;
    } catch (error) {
        if (cacheData?.isStale) {
            console.log("COINGREKO FAILS RETURN STALE DATA");

            return cacheData.data;
        }
        throw error;
    } finally {
        deleteInFlight(cacheKey);
    }
}

const getFavoriteCoins = async (favoriteIds, currency) => {

    const cacheKey = `favoriteCoins:${currency}:${favoriteIds.join(",")}`;
    const cacheData = await getCache(cacheKey);

    if (cacheData && !cacheData.isStale) {
        console.log("Chart Details hit:", cacheKey);
        return cacheData.data;
    }

    const existingRequest = getInFlight(cacheKey);
    if (existingRequest) {
        return existingRequest;
    }

    const request = axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
            params: {
                vs_currency: currency,
                ids: favoriteIds.join(","),
                order: "market_cap_desc",
                sparkline: false,
                price_change_percentage: "1h,24h,7d",
            },
        }
    ).then((response) => response.data);

    setInFlight(cacheKey, request);

    try {
        const response = await request;

        await setCache(cacheKey, response, 60000);
        return response;
    } catch (error) {
        if (cacheData.isStale) {
            console.log("COINGREKO FAILED RETURN STALE DATA");

            return cacheData.data;
        }

        throw error;
    } finally {
        deleteInFlight(cacheKey);
    }
}

module.exports = {
    getCoins,
    getGlobal,
    getCoinDetails,
    getCoinChart,
    getFavoriteCoins,
};
