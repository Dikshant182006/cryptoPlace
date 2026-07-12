import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../src/linkChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();

  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  const { currency } = useContext(CoinContext);

  const displayCoinDetail = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCoinDetails(data);
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  const displayHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.log("Fetch error:", error.message);
    }
  };

  useEffect(() => {
    displayCoinDetail();
    displayHistoricalData();
  }, [currency.name, coinId]);

  if (coinDetails && historicalData) {
    return (
      <div className="coin pt-24">
        <div className="coin-name flex flex-col items-center gap-3 h-screen">
          <img src={coinDetails.image.large} className="w-24" />
          <p className="font-bold text-2xl">
            {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
          </p>
          <div className="coin-chart">
            <LineChart historicalData={historicalData} />
          </div>

          <div className="coin-info">
            <ul className="flex">
              <li>Crypto Market Rank </li>
              <li>{coinDetails.market_cap_rank}</li>
            </ul>
            <ul className="flex">
              <li>Current Price</li>
              <li>{coinDetails.symbol} {coinDetails.market_data.current_price[currency.name].toLocaleString()}</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="spinner flex justify-center items-center h-[77vh]">
      <div className="spin border-2 p-5 rounded-3xl mr-5"></div>
    </div>
  );
};

export default Coin;