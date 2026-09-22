import React, { useContext, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { NavLink } from "react-router-dom";
import Favourite from "./favourite";
import { useGlobal } from "../../src/hooks/UseGlobal";
import { useCoins } from "../../src/hooks/UseCoin";
import CommonPagination from "../../src/components/Pagination/CommonPagination";
import DataTable from "../../src/components/DataTable/DataTable";

const CryptoList = ({ light }) => {
  const { currency, favorites, setFavorites } = useContext(CoinContext);
  const [currentPage, setCurrentPage] = useState(1);

  const textMain = light ? "text-black/70" : "text-white/60";

  const {
    data: allCoin = [],
  } = useCoins(currency.name);

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(0) + "T";
    if (num >= 1e9) return (num / 1e9).toFixed(0) + "B";
    if (num >= 1e6) return (num / 1e6).toFixed(0) + "M";
    if (num >= 1e3) return (num / 1e3).toFixed(0) + "K";
    return num;
  };

  const columns = [
    {
      key: "market_cap_rank",
      header: "#",
      width: "0.5fr",
    },
    {
      key: "name",
      header: "Name",
      width: "2fr",
      headerClassName: "text-start",
      cellClassName: "text-start",
      render: (item) => (
        <div className="flex items-center gap-2 text-start">
          <img
            src={item.image}
            alt={item.name}
            className="w-6 h-6 sm:w-7 sm:h-7 rounded-full"
          />

          <p
            className={`capitalize font-semibold ${light ? "text-gray-900" : "text-white"
              }`}
          >
            {item.id}
          </p>

          <span className="text-xs uppercase opacity-70">
            {item.symbol}
          </span>
        </div>
      ),
    },
    {
      key: "price_change_percentage_1h_in_currency",
      header: "1h %",
      width: "0.5fr",
      render: (item) => {
        const value = item.price_change_percentage_1h_in_currency;

        return (
          <p
            className={`font-semibold ${value > 0 ? "text-green-500" : "text-red-500"
              }`}
          >
            {value > 0 ? "▲" : "▼"}
            {Math.abs(value?.toFixed(2) ?? 0)}%
          </p>
        );
      },
    },
    {
      key: "price_change_percentage_24h_in_currency",
      header: "24h %",
      width: "0.5fr",
      render: (item) => {
        const value = item.price_change_percentage_24h_in_currency;

        return (
          <p
            className={`font-semibold ${value > 0 ? "text-green-500" : "text-red-500"
              }`}
          >
            {value > 0 ? "▲" : "▼"}
            {Math.abs(value?.toFixed(2) ?? 0)}%
          </p>
        );
      },
    },
    {
      key: "price_change_percentage_7d_in_currency",
      header: "7d %",
      width: "0.5fr",
      render: (item) => {
        const value = item.price_change_percentage_7d_in_currency;

        return (
          <p
            className={`font-semibold ${value > 0 ? "text-green-500" : "text-red-500"
              }`}
          >
            {value > 0 ? "▲" : "▼"}
            {Math.abs(value?.toFixed(2) ?? 0)}%
          </p>
        );
      },
    },
    {
      key: "current_price",
      header: "Price",
      width: "1fr",
      render: (item) => (
        <p className={`font-semibold ${textMain}`}>
          {currency.symbol}
          {item.current_price?.toLocaleString()}
        </p>
      ),
    },
    {
      key: "market_cap",
      header: "Market Cap",
      width: "1fr",
      render: (item) => (
        <p>
          {currency.symbol}
          {formatNumber(item.market_cap)}
        </p>
      ),
    },
    {
      key: "total_volume",
      header: "Volume 24h",
      width: "1fr",
      render: (item) => (
        <p>
          {currency.symbol}
          {formatNumber(item.total_volume)}
        </p>
      ),
    },
  ];

  const itemsPerPage = 6;

  const coins = allCoin;
  const totalPages = Math.ceil(coins.length / itemsPerPage);

  const firstIndex = (currentPage - 1) * itemsPerPage;
  const lastIndex = firstIndex + itemsPerPage;

  const currentCoins = coins.slice(firstIndex, lastIndex);

  const toggleFavourites = (item) => {
    if (favorites.some((fav) => fav.id === item.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== item.id));
    } else {
      setFavorites([...favorites, item]);
    }
  };

  const {
    data: wholeData = [],
    isLoading,
    isError,
    error,
  } = useGlobal(currency.name);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      <div className="min-h-screen mt-40">
        <div className="flex justify-center items-center ">
          <div className="flex flex-col items-center">
            <p className={`text-center rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-medium p-2 ${textMain}`}>
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
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${wholeData.market_cap_change_percentage_24h_usd.toFixed(2) > 0
              ? "bg-green-950"
              : "bg-red-950"
              }`}
          >
            <p>Market Cap</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                {currency.symbol}
                {(
                  wholeData.total_market_cap[currency.name] ??
                  wholeData.total_market_cap.usd
                )?.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/50 text-sm ${wholeData.market_cap_change_percentage_24h_usd.toFixed(2) > 0
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
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${wholeData.volume_change_percentage_24h_usd.toFixed(2) > 0
              ? "bg-green-950"
              : "bg-red-950"
              }`}
          >
            <p>Volume 24h</p>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center mt-2">
              <h2 className="text-lg lg:text-xl font-bold text-white break-all">
                {currency.symbol}
                {(
                  wholeData.total_volume[currency.name] ??
                  wholeData.total_volume.usd
                )?.toLocaleString()}
              </h2>

              <span
                className={`w-fit py-1 px-1.5 rounded-lg text-white/60 ${wholeData.volume_change_percentage_24h_usd.toFixed(2) > 0
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
            className={`w-full md:w-[30vw] lg:w-[27vw] min-h-[120px] text-white/70 rounded-lg p-4 ${wholeData.market_cap_percentage.btc.toFixed(1) > 0
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

        <div className="max-w-7xl mx-auto px-4 pb-10">
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

          <DataTable
            columns={columns}
            data={currentCoins}
            light={light}
            rowKey={(item) => item.id}
            selectable
            onSelect={toggleFavourites}
            isSelected={(item) =>
              favorites.some((fav) => fav.id === item.id)
            }
          />

          <CommonPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={coins.length}
            itemsPerPage={itemsPerPage}
            light={light}
          />
        </div>
      </div>
    </>
  );
};

export default CryptoList;
