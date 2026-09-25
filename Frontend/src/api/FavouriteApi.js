import { API_URL } from "../config"

export const getFavorites = async () => {
    const response = await fetch(`${API_URL}/api/favorites`, {
        credentials: "include",  // Login Cookie
    });

    if(!response.ok) {
        throw new Error("Failed to fetch favorites");
    }

    return response.json();
}

export const addFavorite = async (coinId) => {
    const response = await fetch(`${API_URL}/api/favorites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
            coinId,
        }),
    })

    if(!response.ok) {
        throw new Error("Failed to add Favorite");
    }

    return response.json();
}

export const removeFavorite = async (coinId) => {
    const resfponse = await fetch(
        `${API_URL}/api/favorites/${coinId}`,
        {
            method: "DELETE",
            credentials: "include",
        }
    );

    if(!response.ok) {
        throw new Error("Failed to remove favorites");
    }
}
