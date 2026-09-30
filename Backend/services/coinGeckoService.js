// This file is where we communicate with coinGreko
const axios = require('axios');

const getCoins = async (currency, page, perPage) => {
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
    return response.data;
}

const getGlobal = async (currency) => {

    const response = await axios.get(
        "https://api.coingecko.com/api/v3/global",
        {
            params: {
                vs_currency: currency
            }
        }
    )
    return response.data;
}

const getCoinDetails = async (id) => {
    const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
    )

    return response.data;
}

const getCoinChart = async (id, currency, days, interval) => {
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

    return response.data;
}

const getFavoriteCoins = async (favoriteIds, currency) => {
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

    return response.data;
}

module.exports = {
    getCoins,
    getGlobal,
    getCoinDetails,
    getCoinChart,
    getFavoriteCoins,
};
