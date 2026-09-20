import React, { useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { useCoins } from "../../src/hooks/UseCoin";

const TickerCoin = ({ light }) => {
  const { currency } = useContext(CoinContext);

   const {
      data: allCoin = [],
      isLoading,
      isError,
      error,
    } = useCoins(currency.name);

  const tickerCoins = [...allCoin.slice(0, 15), ...allCoin.slice(0, 15)];

  if(isLoading) return null;
  if(isError) return null;

  return (
    <div
      className={`w-full overflow-hidden border-y py-2 fixed top-14 z-50 backdrop-blur-md transition ${
        light
          ? "bg-white/80 border-gray-200 text-black shadow-sm"
          : "bg-black/30 border-white/10 text-white"
      }`}
    >
      <div
        className="flex gap-10 w-max"
        style={{ animation: "tickerScroll 30s linear infinite" }}
      >
        {tickerCoins.map((item, index) => (
          <div key={index} className="flex items-center gap-2 shrink-0">
            <img
              src={item.image}
              alt="itemImage"
              className="w-5 h-5 rounded-full"
            />
            <span className={`text-sm font-medium ${light ? "text-gray-900" : "text-white"}`}>
              {item.symbol?.toUpperCase()}
            </span>
            <span className={`text-sm ${light ? "text-gray-600" : "text-gray-400"}`}>
              {currency.symbol} {item.current_price?.toLocaleString()}
            </span>
            <span
              className={`text-xs font-semibold ${
                item.price_change_percentage_24h >= 0
                  ? (light ? "text-green-600" : "text-green-400")
                  : (light ? "text-red-600" : "text-red-500")
              }`}
            >
              {item.price_change_percentage_24h >= 0 ? "▲" : "▼"}
              {Math.abs(
                Math.floor(item.price_change_percentage_24h * 100) / 100,
              )}
              %
            </span>
          </div>
        ))}
        <style>{`@keyframes tickerScroll {
      0% {transform: translateX(0);}
      100% {transform: translateX(-70%);}
      }`}</style>
      </div>
    </div>
  );
};

export default TickerCoin;
