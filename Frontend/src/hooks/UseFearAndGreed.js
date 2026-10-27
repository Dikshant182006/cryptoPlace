import { useQuery } from "@tanstack/react-query";
import { fetchFearGreedIndex } from "../api/FearGreedApi.js";

export const useFearGreedIndex = () => {
  return useQuery({
    queryKey: ["fearGreedIndex"],
    queryFn: fetchFearGreedIndex,
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
};
