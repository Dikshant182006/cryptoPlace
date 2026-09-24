// Bridge between the react and fetchCoins

import { useQuery } from "@tanstack/react-query";
import { fetchCoins } from "../api/CoinApi";

export const useCoins = (
  currency,
  page = 1,
  perPage = 6,
) => {
  return useQuery({
    queryKey: ["coins", currency, page, perPage],
    queryFn: () => fetchCoins(
      currency,
      page,
      perPage,
    ),
  });
};
