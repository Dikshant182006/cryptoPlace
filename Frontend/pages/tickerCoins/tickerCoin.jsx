import React, { useContext } from "react";
import { CoinContext } from "../../context/coinContext";

const TickerCoin = () => {
  const { allCoin , currency } = useContext(CoinContext);

  const tickerCoins = [...allCoin.slice(0, 15), ...allCoin.slice(0, 15)];

  return (
    <div className="w-full overflow-hidden border-y border-white/10 bg-white/10 py-2 mb-2 fixed top-14">
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
            <span className="text-white text-sm font-medium">
              {item.symbol?.toUpperCase()}
            </span>
            <span className="text-gray-400 text-sm">
              {currency.symbol} {item.current_price?.toLocaleString()}
            </span>
            <span
              className={`text-xs ${
                item.price_change_percentage_24h >= 0
                  ? "text-green-400"
                  : "text-red-500"
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
