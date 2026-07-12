import React, { useContext, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { NavLink } from "react-router-dom";

const Favourite = () => {
  const { currency, wholeData, allCoin, favorites, setFavorites } = useContext(CoinContext);
  const [rating, setrating] = useState(0);

  const toggleFavourites = (item) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(0) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(0) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(0) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(0) + "K";
    return num;
  };

  if (!wholeData) {
    return <div className="text-center h-screen flex items-center justify-center text-5xl">Loading...</div>;
  }

  return (
    <>
      <div className="min-h-screen mt-40">
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <p className="w-[10vw] text-center rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 text-sm font-medium py-1">
              🚀 LIVE DATA
            </p>
            <h1 className="text-4xl flex justify-center m-3 font-bold text-center">
              Today's Crypto Prices by Market <br /> Cap
            </h1>
            <p className="text-center text-2xl text-white/60">
              The global crypto market cap is approximately $2.7T, with a 1.14%
              change <br /> in the last 24 hours. Daily trading volume stands
              near $113B, while Bitcoin holds a dominance of <br /> 56.8%.
            </p>
          </div>
        </div>

        <div className="market-cap flex flex-col md:flex-row gap-4 md:gap-7 justify-center mt-8 px-4">
          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              wholeData.market_cap_change_percentage_24h_usd.toFixed(2) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>Market Cap</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                ${wholeData.total_market_cap.usd.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/50 text-sm ${
                  wholeData.market_cap_change_percentage_24h_usd.toFixed(2) > 0
                    ? "bg-green-800"
                    : "bg-red-900"
                }`}
              >
                {wholeData.market_cap_change_percentage_24h_usd > 0 ? "▲" : "▼"}
                {Math.abs(
                  wholeData.market_cap_change_percentage_24h_usd.toFixed(2),
                )}
                %
              </span>
            </div>
          </div>

          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              wholeData.volume_change_percentage_24h_usd.toFixed(2) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>Volume 24h</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                ${wholeData.total_volume.usd.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/60 ${
                  wholeData.volume_change_percentage_24h_usd.toFixed(2) > 0
                    ? "bg-green-800"
                    : "bg-red-900"
                }`}
              >
                {wholeData.volume_change_percentage_24h_usd > 0 ? "▲" : "▼"}
                {wholeData.volume_change_percentage_24h_usd.toFixed(2)}%
              </span>
            </div>
          </div>

          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              wholeData.market_cap_percentage.btc.toFixed(1) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>BTC Dominance</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="font-bold text-lg lg:text-xl text-white">
                {wholeData.market_cap_percentage.btc.toFixed(1)}%
              </h2>

              <span className="w-fit bg-green-900 py-1 px-2 rounded-lg text-white text-sm">
                ▲0.5%
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto hide-scrollbar-x">
          <div className="flex gap-10 m-10 font-bold">
            <NavLink
              to={"/coins/"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-400 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              CryptoCurrencies
            </NavLink>
            <NavLink
              to={"/favorites/"}
              className={({ isActive }) =>
                isActive
                  ? "border-b-2 border-orange-400 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Favorites
            </NavLink>
          </div>
          <div className="table m-auto my-10 pb-5 min-h-[20vh] w-[95vw] bg-[#090909] rounded-xl pt-5 text-white/50 pr-5 overflow-x-auto ">
            <div className="grid min-w-[240vw] sm:min-w-[70vw] grid-cols-[0.5fr_2fr_0.5fr_0.5fr_0.5fr_1fr_1fr_1fr] gap-10 mb-10 text-right">
              <p>#</p>
              <p className="text-start">Name</p>
              <p>1h %</p>
              <p>24h %</p>
              <p>7d %</p>
              <p>Price</p>
              <p>Market Cap</p>
              <p>Volume 24h</p>
            </div>

            { favorites.length === 0? 
            ( <div className="w-[80vw]">
            <p className="flex w-[97vw] justify-center">You have no favorites yet ⭐</p>
            </div>
            ) :
             (favorites.map((item) => (
              <div 
                key={item.id}
                className="text-white grid grid-cols-[0.5fr_2fr_0.5fr_0.5fr_0.5fr_1fr_1fr_1fr] text-right min-w-[200vw] sm:min-w-[70vw] gap-10 mt-4"
              >
                <div className="flex justify-between ml-5">
                  <input
                    onChange={() => toggleFavourites(item)}
                    type="checkbox"
                    checked={favorites.some((fav) => fav.id === item.id)}
                  />
                  <p>{item.market_cap_rank}</p>
                </div>
                <div className="flex items-center gap-2">
                  <img src={item.image} className="w-7" />
                  <p className="capitalize text-white font-bold">{item.id}</p>
                  <span className="text-white/70">
                    {item.symbol.toUpperCase()}
                  </span>
                </div>
                <p
                  className={`text-sm 
                  ${
                    item.price_change_percentage_1h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-600"
                  }
                `}
                >
                  {item.price_change_percentage_1h_in_currency > 0 ? "▲" : "▼"}
                  {Math.abs(
                    item.price_change_percentage_1h_in_currency?.toFixed(2),
                  ) ?? "0.0"}
                </p>
                <p
                  className={` text-sm
                  ${
                    item.price_change_percentage_24h_in_currency > 0
                      ? "text-green-500"
                      : "text-red-600"
                  } `}
                >
                  {item.price_change_percentage_24h_in_currency > 0 ? "▲" : "▼"}
                  {Math.abs(
                    item.price_change_percentage_24h_in_currency?.toFixed(2),
                  ) ?? "0.0"}
                </p>
                <p
                  className={`text-sm
                  ${
                    item.price_change_percentage_7d_in_currency > 0
                      ? "text-green-500"
                      : "text-red-600"
                  } `}
                >
                  {item.price_change_percentage_7d_in_currency > 0 ? "▲" : "▼"}
                  {Math.abs(
                    item.price_change_percentage_7d_in_currency?.toFixed(2),
                  ) ?? "0.0"}
                </p>
                <p>
                  {currency.symbol}
                  {item.current_price}
                </p>
                <p>{formatNumber(item.market_cap)}</p>
                <p>{formatNumber(item.total_volume)}</p>
              </div>)
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
