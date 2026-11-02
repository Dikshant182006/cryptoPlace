import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import LineChart from "../../src/linkChart/LineChart";
import { API_URL } from "../../src/config";

const Coin = () => {
  const { coinId } = useParams();

  const [coinDetails, setCoinDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);

  const navigate = useNavigate();
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        navigate(-1);
      }
    }

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    }
  }, [navigate]);

  useEffect(() => {
    let ignore = false;

    async function fetchCoinDetails() {
      try {
        const response = await fetch(`${API_URL}/api/coins/${coinId}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setCoinDetails(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Coin details error:", error.message);
        }
      }
    }

    async function fetchHistoricalData() {
      try {
        const response = await fetch(
          `${API_URL}/api/coins/${coinId}/chart?currency=${currency.name}&days=10&interval=daily`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setHistoricalData(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Historical data error:", error.message);
        }
      }
    }

    fetchCoinDetails();
    fetchHistoricalData();

    return () => {
      ignore = true;
    };
  }, [coinId, currency.name]);

  if (coinDetails && historicalData) {
    return (
      /* h-[calc(100vh-90px)] fills the screen below your navbar. 
         Adjust 90px to match your actual navbar height if needed. */
      <div className="coin flex flex-col h-[calc(100vh-90px)] w-full overflow-hidden p-4">
        {/* Header Info */}
        <div className="coin-name flex flex-col items-center gap-2 shrink-0">
          <img src={coinDetails.image.large} className="w-14 h-14" alt={coinDetails.name} />
          <p className="font-bold text-xl text-white">
            {coinDetails.name} ({coinDetails.symbol.toUpperCase()})
          </p>
        </div>

        {/* Chart container grows to consume all leftover screen space */}
        <div className="w-full flex-1 min-h-0 py-2">
          <LineChart historicalData={historicalData} />
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
