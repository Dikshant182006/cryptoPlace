import { useQuery } from "@tanstack/react-query"
import { fetchGlobal } from "../api/CoinApi"

export const useGlobal = (currency) => {
    return useQuery({
        queryKey: ["global", currency],
        queryFn: () => fetchGlobal(currency)
    })
}
