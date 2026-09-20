import { API_URL } from "../config"

export const fetchCoins = async (currency) => {
    const response = await fetch(
        `${API_URL}/api/coins?currency=${currency}`
    );

    if(!response.ok) {
        throw new Error("Failed to fetch coin");
    }

    return response.json();
}

export const fetchGlobal = async (currency) => {
    const response = await fetch(
        `${API_URL}/api/global?.currency=${currency}`
    )

    if(!response.ok) {
        throw new Error("Failed to fetch global data: ${response.status}");
    }

    const data = await response.json();
    return data.data || data;
}
