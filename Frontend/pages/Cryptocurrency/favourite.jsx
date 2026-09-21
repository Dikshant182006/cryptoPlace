import React, { useContext, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { NavLink } from "react-router-dom";
import { useGlobal } from "../../src/hooks/UseGlobal";
import { useCoins } from "../../src/hooks/UseCoin";
import CommonPagination from "../../src/components/Pagination/CommonPagination";

const Favourite = ({ light }) => {
  const { currency, favorites, setFavorites } = useContext(CoinContext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;
  const currentFavorites = favorites.slice(firstIndex, lastIndex);

  const {
    isLoading: isCoinsLoading,
    isError: isCoinsError,
    error: coinsError,
  } = useCoins(currency.name);

  const {
    data: wholeData = {},
    isLoading,
    isError,
    error,
  } = useGlobal(currency.name);

  const toggleFavourites = (item) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const formatNumber = (num) => {
    if (!num) return "0";
    if (num >= 1e12) return (num / 1e12).toFixed(0) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(0) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(0) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(0) + "K";
    return num;
  };

  if (isLoading || isCoinsLoading) {
    return (
      <div className="min-h-screen mt-40 flex justify-center items-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (isError || isCoinsError) {
    return (
      <div className="min-h-screen mt-40 flex justify-center items-center">
        <p className="text-xl text-red-500">
          Error: {error?.message || coinsError?.message}
        </p>
      </div>
    );
  }

  const textMain = light ? "text-black/70" : "text-white/60";

  return (
    <>
      <div className="min-h-screen mt-40">
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <p className={`text-center rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-medium py-1 px-4 ${textMain}`}>
              🚀 LIVE DATA
            </p>
            <h1 className="text-4xl flex justify-center m-3 font-bold text-center">
              Today's Crypto Prices by Market <br /> Cap
            </h1>
            <p className={`text-center text-2xl ${textMain}`}>
              The global crypto market cap is approximately $2.7T, with a 1.14%
              change <br /> in the last 24 hours. Daily trading volume stands
              near $113B, while Bitcoin holds a dominance of <br /> 56.8%.
            </p>
          </div>
        </div>

        <div className="market-cap flex flex-col md:flex-row gap-4 md:gap-7 justify-center mt-8 px-4">
          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              (wholeData?.market_cap_change_percentage_24h_usd ?? 0) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>Market Cap</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                {currency.symbol}
                {(
                  wholeData?.total_market_cap?.[currency.name] ??
                  wholeData?.total_market_cap?.usd ??
                  0
                )?.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/50 text-sm ${
                  (wholeData?.market_cap_change_percentage_24h_usd ?? 0) > 0
                    ? "bg-green-800"
                    : "bg-red-900"
                }`}
              >
                {(wholeData?.market_cap_change_percentage_24h_usd ?? 0) > 0 ? "▲" : "▼"}
                {Math.abs(
                  wholeData?.market_cap_change_percentage_24h_usd?.toFixed(2) ?? 0,
                )}
                %
              </span>
            </div>
          </div>

          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              (wholeData?.volume_change_percentage_24h_usd ?? 0) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>Volume 24h</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                {currency.symbol}
                {(
                  wholeData?.total_volume?.[currency.name] ??
                  wholeData?.total_volume?.usd ??
                  0
                )?.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/60 ${
                  (wholeData?.volume_change_percentage_24h_usd ?? 0) > 0
                    ? "bg-green-800"
                    : "bg-red-900"
                }`}
              >
                {(wholeData?.volume_change_percentage_24h_usd ?? 0) > 0 ? "▲" : "▼"}
                {wholeData?.volume_change_percentage_24h_usd?.toFixed(2) ?? "0.00"}%
              </span>
            </div>
          </div>

          <div
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${
              (wholeData?.market_cap_percentage?.btc ?? 0) > 0
                ? "bg-green-950"
                : "bg-red-950"
            }`}
          >
            <p>BTC Dominance</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="font-bold text-lg lg:text-xl text-white">
                {wholeData?.market_cap_percentage?.btc?.toFixed(1) ?? "0.0"}%
              </h2>

              <span className="w-fit bg-green-900 py-1 px-2 rounded-lg text-white text-sm">
                ▲0.5%
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-10 my-8 font-bold">
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

          <div className={`w-full rounded-2xl border border-white/10 overflow-hidden shadow-xl ${light ? "bg-white/80 border-black/10" : "bg-[#090909]"}`}>
            <div className="overflow-x-auto hide-scrollbar-x p-5">
              <div className={`grid min-w-[700px] grid-cols-[0.5fr_2fr_0.5fr_0.5fr_0.5fr_1fr_1fr_1fr] gap-4 pb-4 border-b ${light ? "border-black/10" : "border-white/10"} text-right font-medium text-xs sm:text-sm ${textMain}`}>
                <p>#</p>
                <p className="text-start">Name</p>
                <p>1h %</p>
                <p>24h %</p>
                <p>7d %</p>
                <p>Price</p>
                <p>Market Cap</p>
                <p>Volume 24h</p>
              </div>

              {favorites.length === 0 ? (
                <div className="py-16 text-center">
                  <p className={`text-base font-medium ${textMain}`}>
                    You have no favorites yet ⭐
                  </p>
                  <p className="text-xs text-gray-500 mt-1">Check items in CryptoCurrencies to add them here.</p>
                </div>
              ) : (
                currentFavorites.map((item) => (
                  <div
                    key={item.id}
                    className={`grid min-w-[700px] grid-cols-[0.5fr_2fr_0.5fr_0.5fr_0.5fr_1fr_1fr_1fr] text-right gap-4 py-3.5 items-center border-b ${light ? "border-black/5 hover:bg-black/5" : "border-white/5 hover:bg-white/5"} transition-colors rounded-lg px-1 text-xs sm:text-sm ${textMain}`}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <input
                        onChange={() => toggleFavourites(item)}
                        type="checkbox"
                        checked={favorites.some((fav) => fav.id === item.id)}
                        className="cursor-pointer accent-orange-500 rounded"
                      />
                      <p className={textMain}>{item.market_cap_rank}</p>
                    </div>
                    <div className="flex items-center gap-2 text-start">
                      <img src={item.image} alt={item.name || item.id} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full" />
                      <p className={`capitalize font-semibold ${light ? "text-gray-900" : "text-white"}`}>{item.id}</p>
                      <span className="text-xs uppercase opacity-70">
                        {item.symbol?.toUpperCase()}
                      </span>
                    </div>
                    <p
                      className={`font-semibold ${
                        item.price_change_percentage_1h_in_currency > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.price_change_percentage_1h_in_currency > 0 ? "▲" : "▼"}
                      {Math.abs(
                        item.price_change_percentage_1h_in_currency?.toFixed(2) ?? 0,
                      )}%
                    </p>
                    <p
                      className={`font-semibold ${
                        item.price_change_percentage_24h_in_currency > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.price_change_percentage_24h_in_currency > 0 ? "▲" : "▼"}
                      {Math.abs(
                        item.price_change_percentage_24h_in_currency?.toFixed(2) ?? 0,
                      )}%
                    </p>
                    <p
                      className={`font-semibold ${
                        item.price_change_percentage_7d_in_currency > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.price_change_percentage_7d_in_currency > 0 ? "▲" : "▼"}
                      {Math.abs(
                        item.price_change_percentage_7d_in_currency?.toFixed(2) ?? 0,
                      )}%
                    </p>
                    <p className={`font-semibold ${light ? "text-gray-900" : "text-white"}`}>
                      {currency.symbol}
                      {item.current_price?.toLocaleString()}
                    </p>
                    <p className={textMain}>
                      {currency.symbol}{formatNumber(item.market_cap)}
                    </p>
                    <p className={textMain}>
                      {currency.symbol}{formatNumber(item.total_volume)}
                    </p>
                  </div>
                ))
              )}
            </div>

            {favorites.length > itemsPerPage && (
              <CommonPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                totalItems={favorites.length}
                itemsPerPage={itemsPerPage}
                light={light}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favourite;
