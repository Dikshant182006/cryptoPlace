// This file is where we communicate with coinGreko
const axios = require('axios');
const { getCache, setCache } = require('../cache/cacheStore');

const getCoins = async (currency, page, perPage) => {
    // Cache ka address/data name
    const cacheKey = `coins:${currency}:${page}:${perPage}`;
    const cachedData = getCache(cacheKey);

    if(cachedData) {
        console.log("CACHE HIT:", cacheKey);
        return cachedData;
    }

    console.log("CACHE MISS", cacheKey);

    const response = await axios.get(
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
    )

    setCache(cacheKey, response.data, 30000);
    return response.data;
}

const getGlobal = async (currency) => {

    const cacheKey = `global:${currency}`;
    const cacheData = getCache(cacheKey);

    if(cacheData) {
        console.log("Global Cache Hit:", cacheKey);
        return cacheData;
    }

    console.log("CACHE MISS", cacheKey);

    const response = await axios.get(
        "https://api.coingecko.com/api/v3/global",
        {
            params: {
                vs_currency: currency
            }
        }
    )

    setCache(cacheKey, response.data, 60000);
    return response.data;
}

const getCoinDetails = async (id) => {
    const cacheKey = `coinDetails:${id}`;
    const cacheData = getCache(cacheKey);

    if(cacheData) {
        console.log("Coin Details Hit:", cacheKey);
        return cacheData;
    }

    const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
    )

    setCache(cacheKey, response.data, 60000);
    return response.data;
}

const getCoinChart = async (id, currency, days, interval) => {
    const cacheKey = `chartDetails:${id}`;
    const cacheData = getCache(cacheKey);

    if(cacheData) {
        console.log("Chart Details Hit: ", cacheKey);
        return cacheData;
    }

    console.log("Chart Details Miss");

    const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
            params: {
                vs_currency: currency, // It dynamically passes usd, inr, eur
                days,
                interval,
            },
        }
    )

    setCache(cacheKey, response.data, 60000);
    return response.data;
}

const getFavoriteCoins = async (favoriteIds, currency) => {

    const cacheKey = `favoriteCoins:${favoriteIds}`;
    const cacheData = getCache(cacheKey);

    if(cacheData) {
        console.log("Chart Details hit:", cacheKey);
        return cacheData;
    }

    const response = await axios.get(
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
    );

    setCache(cacheKey, response.data, 60000);
    return response.data;
}

module.exports = {
    getCoins,
    getGlobal,
    getCoinDetails,
    getCoinChart,
    getFavoriteCoins,
};
