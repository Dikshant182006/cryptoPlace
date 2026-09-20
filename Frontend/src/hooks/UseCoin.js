import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api/CoinApi";

export const useCoins = (currency) => {
  return useQuery({
    queryKey: ["coins", currency],
    queryFn: () => fetchCoins(currency),
  });
};
