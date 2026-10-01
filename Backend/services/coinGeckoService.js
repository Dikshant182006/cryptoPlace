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
    // Check cache
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log("CACHE HIT:", cacheKey);
        return cachedData;
    }

    // Check existing request
    const existingRequest = getInFlight(cacheKey);

    if (existingRequest) {
        console.log("IN-FLIGHT HIT:", cacheKey);
        return existingRequest;
    }

    console.log("CACHE MISS", cacheKey);

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
        setCache(cacheKey, response, 30000);
        return response.data;
    } finally {
        // Request Finished
        deleteInFlight(cacheKey);
    }
}

const getGlobal = async (currency) => {

    const cacheKey = `global:${currency}`;
    const cacheData = getCache(cacheKey);

    if (cacheData) {
        console.log("CACHE HIT", cacheKey);
        return cacheData;
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

        setCache(cacheKey, response, 60000);
        return response.data;
    } finally {
        deleteInFlight(cacheKey);
    }
}

const getCoinDetails = async (id) => {
    const cacheKey = `coinDetails:${id}`;
    const cacheData = getCache(cacheKey);

    if (cacheData) {
        console.log("Coin Details Hit:", cacheKey);
        return cacheData;
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

        setCache(cacheKey, response, 60000);
        return response.data;
    } finally {
        deleteInFlight(cacheKey);
    }
}

const getCoinChart = async (id, currency, days, interval) => {
    const cacheKey = `chart:${id}:${currency}:${days}:${interval}`;
    const cacheData = getCache(cacheKey);

    if (cacheData) {
        console.log("Chart Details Hit: ", cacheKey);
        return cacheData;
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

        setCache(cacheKey, response, 60000);
        return response.data;
    } finally {
        deleteInFlight(cacheKey);
    }

}

const getFavoriteCoins = async (favoriteIds, currency) => {

    const cacheKey = `favoriteCoins:${currency}:${favoriteIds.join(",")}`;
    const cacheData = getCache(cacheKey);

    if (cacheData) {
        console.log("Chart Details hit:", cacheKey);
        return cacheData;
    }

    const existingRequest = getInFlight(cacheKey);
    if(existingRequest) {
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
        
        setCache(cacheKey, response, 60000);
        return response.data;
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
