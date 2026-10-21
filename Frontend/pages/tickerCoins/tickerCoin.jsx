import React, { useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { useCoins } from "../../src/hooks/UseCoin";

const TickerCoin = ({ light }) => {
  const { currency } = useContext(CoinContext);

  const {
    data: coinData,
    isLoading,
    isError,
  } = useCoins(currency.name, 1, 15);

  const coinsList = Array.isArray(coinData)
    ? coinData
    : Array.isArray(coinData?.data)
    ? coinData.data
    : [];

  if (isLoading || isError || coinsList.length === 0) {
    return (
      <div
        className={`w-full h-10 overflow-hidden border-b fixed top-[68px] z-50 backdrop-blur-md transition-colors duration-200 flex items-center px-4 md:pl-24 ${
          light
            ? "bg-slate-50/90 border-slate-200/80 text-gray-500 shadow-xs"
            : "bg-slate-900/40 border-white/5 text-gray-400 backdrop-blur-xl shadow-xs"
        }`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="tracking-wide">Loading live market prices...</span>
        </div>
      </div>
    );
  }

  const tickerCoins = [...coinsList.slice(0, 15), ...coinsList.slice(0, 15)];

  return (
    <div
      className={`w-full h-10 overflow-hidden border-b fixed top-[68px] z-50 backdrop-blur-md transition-colors duration-200 flex items-center md:pl-24 ${
        light
          ? "bg-slate-50/90 border-slate-200/80 text-gray-900 shadow-xs"
          : "bg-slate-900/40 border-white/5 text-white backdrop-blur-xl shadow-xs"
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
            <span className={`text-sm ${light ? "text-gray-600" : "text-gray-300 font-medium"}`}>
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
