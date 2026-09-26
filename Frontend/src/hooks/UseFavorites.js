import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addFavorite, getFavorites, removeFavorite } from "../api/FavoriteApi";

// GET favorites
export const useFavorites = () => {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: getFavorites,
    });
}

// POST favorites
export const useAddFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addFavorite,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        }
    })
}

// Delete favorites
export const useRemoveFavorite = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: removeFavorite,
    })

    onSuccess: () => {
        queryClient.invalidateQueries({
            queryKey: ["favorites"],
        })
    }
}
