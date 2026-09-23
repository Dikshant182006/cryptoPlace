import { useContext, useState, useEffect } from "react";
import { CoinContext } from "../../context/coinContext";
import chatgpt from "../../src/assets/chatgpt.svg";
import gemini from "../../src/assets/gemini.svg";
import claude from "../../src/assets/claude.svg";
import useDebounce from "../../modules/shared/Hooks/useDebounceHook";
import { useCoins } from "../../src/hooks/UseCoin";
import CommonPagination from "../../src/components/Pagination/CommonPagination";
import DataTable from "../../src/components/DataTable/DataTable";

const Home = ({ light, setLight }) => {
  const { currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCoins = displayCoin.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(displayCoin.length/itemsPerPage);

  const {
    data: allCoin = [],
    isLoading,
    isError,
    error,
  } = useCoins(currency.name);
  
  const [input, setInput] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const debounceValue = useDebounce(input);

  const ANIMATED_WORDS = [
    "Real-Time Intelligence",
    "Live Market Data",
    "Deep Insights",
    "Smart Alerts",
  ];

  const columns = [
    {
      key: "market_cap_rank",
      header: "#",
      width: "0.5fr",
      headerClassName: "text-start",
      cellClassName: "text-start",
      render: (item) => <p className={light ? "text-black/70" : "text-white/70"}>{item.market_cap_rank}</p>,
    },
    {
      key: "name",
      header: "Coins",
      width: "2fr",
      headerClassName: "text-start",
      cellClassName: "text-start",
      render: (item) => (
        <div className="flex items-center gap-2 text-start">
          <img src={item.image} alt={item.name} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full" />
          <p className={`font-semibold text-sm sm:text-base ${light ? "text-gray-900" : "text-white"}`}>
            {item.name} - <span className="lowercase">{item.symbol}</span>
          </p>
        </div>
      ),
    },
    {
      key: "current_price",
      header: "Price",
      width: "1fr",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (item) => (
        <p className={`font-semibold ${light ? "text-gray-900" : "text-white"}`}>
          {currency.symbol}
          {item.current_price?.toLocaleString()}
        </p>
      ),
    },
    {
      key: "price_change_percentage_24h",
      header: "24H Change",
      width: "1fr",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (item) => {
        const isPositive = item.price_change_percentage_24h > 0;
        return (
          <p
            className={`font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {isPositive ? "▲" : "▼"}{" "}
            {Math.abs(Math.floor(item.price_change_percentage_24h * 100) / 100)}%
          </p>
        );
      },
    },
    {
      key: "market_cap",
      header: "Market Cap",
      width: "1.5fr",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (item) => (
        <p className={`font-semibold ${light ? "text-gray-900" : "text-white"}`}>
          {currency.symbol}
          {item.market_cap?.toLocaleString()}
        </p>
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ANIMATED_WORDS.length);
        setAnimating(false);
      }, 350);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (debounceValue === "") {
      setDisplayCoin(allCoin);
      return;
    }

    const filteredCoins = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(debounceValue.toLowerCase())
    )

    setDisplayCoin(filteredCoins);
  }, [debounceValue, allCoin]);

  if(isLoading) return <p>Loading...</p>;
  if(isError) return <p>Error: {error.message} </p>

  // To handle the input
  const handleInput = (e) => {
    setInput(e.target.value);
  };

  // Open ChatGpt
  const handleChat = (e) => {
    const prompt = "Best crypto Tracker";
    const encoded = encodeURIComponent(prompt);

    const url = `https://chatgpt.com/?q=${encoded}`;
    window.open(url, "_blank");
  };

  // Open Gemini
  const handleGemini = (e) => {
    const url = "https://aistudio.google.com/";
    window.open(url);
  };

  // Open Claude
  const handleClaude = (e) => {
    const prompt = "Best crypto Tracker";
    const encoded = encodeURIComponent(prompt);

    const url = "https://claude.ai/";
    window.open(url);
  };

  const textMain = light ? "text-black/80" : "text-white/50";
  const textSub = light ? "text-black" : "text-white";
  const changeBac = light ? "bg-white text-black" : "bg-black";

  return (
    <div className="home py-2 mt-18 ">
      <div className="home p-2 relative">
        <div className="absolute left-1/2 -translate-x-1/2 w-[30vw] h-[60vh] bg-purple-600/15 blur-[120px]" />
        <div>
          <div className="hero flex flex-col justify-center items-center my-10 relative z-10">
            <div className="flex flex-col items-center ">
              <div className={`mb-2 px-4 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-sm font-medium ${textMain}`}>
                🚀 Real-Time Crypto Data
              </div>

              <div className="hero flex flex-col justify-center items-center">
                <h2 className="font-bold text-[46px] text-center leading-tight">
                  Explore Crypto Markets
                  <br />
                  <span className={`font-normal text-[32px] ${textMain}`}>with</span>
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-purple-500 bg-clip-text text-transparent" style={{
                    transition: "opacity 0.35s ease, transform 0.35s ease",
                    opacity: animating ? 0 : 1,
                  }}>{ANIMATED_WORDS[wordIndex]}</span>
                </h2>

                <p className="text-center leading-7 w-full sm:w-[80%] lg:w-[35vw] py-3 text-gray-400">
                  Welcome to the world's largest cryptocurrency marketplace.
                  Sign up to explore more about cryptos.
                </p>

                <form
                  className={`flex items-center backdrop-blur-md border rounded-full shadow-lg focus-within:ring-2 focus-within:ring-purple-400 transition-all ${
                    light ? "bg-black/5 border-black/10" : "bg-white/10 border-white/20"
                  }`}
                >
                  <span className="pl-4 text-gray-400 text-lg ">🔍</span>
                  <input
                    onChange={handleInput}
                    value={input}
                    required
                    type="text"
                    placeholder="Search crypto..."
                    className={`flex-1 px-4 py-3 bg-transparent placeholder-gray-400 outline-none text-sm ${textMain}`}
                  />

                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-full m-1 hover:opacity-90 transition cursor-pointer"
                  >
                    Search
                  </button>
                </form>

                <div className="flex flex-col gap-4 mt-10 sm:flex-row sm:gap-8 sm:mt-6 text-center">
                  <div className={`px-6 py-3 rounded-xl ${light ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"}`}>
                    <p className="text-purple-400 font-bold text-xl">10,000+</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Cryptocurrencies
                    </p>
                  </div>
                  <div className={`px-6 py-3 rounded-xl ${light ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"}`}>
                    <p className="text-orange-400 font-bold text-xl">$2.5T+</p>
                    <p className="text-gray-400 text-xs mt-1">Market Cap</p>
                  </div>
                  <div className={`px-6 py-3 rounded-xl ${light ? "bg-black/5 border border-black/10" : "bg-white/5 border border-white/10"}`}>
                    <p className="text-green-400 font-bold text-xl">Live</p>
                    <p className="text-gray-400 text-xs mt-1">Price Updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:mt-10 mt-5 mb-6">
        <DataTable
          columns={columns}
          data={currentCoins}
          light={light}
          rowKey={(item) => item.id}
          getRowLink={(item) => `/coin/${item.id}`}
          footer={
            <CommonPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={displayCoin.length}
              itemsPerPage={itemsPerPage}
              light={light}
            />
          }
        />
      </div>

      <div className="mt-15">
        <p className={`border w-[90vw] m-auto ${light ? "border-gray-200" : "border-gray-900"}`}></p>
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold m-2">
            All-In-One Crypto Tracker to Manage Your <br /> Portfolio More
            Efficiently
          </h2>
          <p className={textMain}>
            We’re the only platform on the market that supports all <br /> major
            crypto platforms.
          </p>
        </div>
      </div>

      <div className="cryptoAi my-15">
        <div
          className={`m-auto rounded-3xl w-[90vw] py-14 px-12 text-center relative overflow-hidden ${
            light ? "border border-purple-200/60 shadow-xl" : ""
          }`}
          style={{
            background: light
              ? "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf4ff 100%)"
              : "linear-gradient(135deg, #13111c 0%, #0e0c18 60%, #161020 100%)",
          }}
        >
          {/* Floating icons */}
          {[
            { emoji: "✅", bg: light ? "rgba(16,185,129,0.14)" : "rgba(16,185,129,0.18)", border: light ? "rgba(16,185,129,0.35)" : "rgba(16,185,129,0.3)", top: "18%", left: "4%", size: 52, dur: 3.8, delay: 0 },
            { emoji: "🔥", bg: light ? "rgba(251,146,60,0.14)" : "rgba(251,146,60,0.18)", border: light ? "rgba(251,146,60,0.35)" : "rgba(251,146,60,0.3)", top: "48%", left: "3%", size: 48, dur: 4.5, delay: 0.6 },
            { emoji: "❓", bg: light ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.18)", border: light ? "rgba(139,92,246,0.35)" : "rgba(139,92,246,0.3)", top: "72%", left: "5%", size: 46, dur: 5.2, delay: 1.2 },
            { emoji: "⭐", bg: light ? "rgba(234,179,8,0.14)" : "rgba(234,179,8,0.18)", border: light ? "rgba(234,179,8,0.35)" : "rgba(234,179,8,0.3)", top: "18%", right: "4%", size: 52, dur: 4.1, delay: 0.3 },
            { emoji: "✨", bg: light ? "rgba(139,92,246,0.14)" : "rgba(139,92,246,0.35)", border: light ? "rgba(139,92,246,0.35)" : "rgba(139,92,246,0.3)", top: "48%", right: "3%", size: 48, dur: 3.6, delay: 0.9 },
            { emoji: "🧡", bg: light ? "rgba(251,146,60,0.14)" : "rgba(251,146,60,0.18)", border: light ? "rgba(251,146,60,0.35)" : "rgba(251,146,60,0.3)", top: "72%", right: "5%", size: 46, dur: 4.8, delay: 1.5 },
          ].map((item, index) => (
            <div
              key={index}
              className="absolute flex items-center justify-center rounded-2xl"
              style={{
                width: item.size,
                height: item.size,
                background: item.bg,
                border: `1px solid ${item.border}`,
                boxShadow: light ? "0 4px 12px rgba(0,0,0,0.06)" : "none",
                fontSize: item.size * 0.45,
                top: item.top,
                left: item.left,
                right: item.right,
                animation: `aiFloat ${item.dur}s ease-in-out ${item.delay}s infinite`,
              }}
            >
              {item.emoji}
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10">
            <h2 className={`font-bold text-4xl mb-3 leading-tight ${light ? "text-gray-900" : "text-white"}`}>
              Unsure What's the Best Crypto Tracker?
            </h2>
            <p className={`text-base mb-8 leading-relaxed ${light ? "text-gray-600" : "text-white/45"}`}>
              Don't take our word for it. Click a button to<br />
              prompt "Best crypto tracker?".
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
              <div
                onClick={handleChat}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
                }`}
                style={{
                  background: light ? "rgba(255, 255, 255, 0.9)" : "rgba(255,255,255,0.07)",
                  border: light ? "1px solid rgba(139, 92, 246, 0.25)" : "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <img src={chatgpt} alt="chatgpt" className={`w-4 h-4 ${light ? "" : "invert"}`} />
                <span className={`text-sm font-medium ${light ? "text-gray-800" : "text-white"}`}>Ask ChatGPT</span>
              </div>
              <div
                onClick={handleGemini}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
                }`}
                style={{
                  background: light ? "rgba(255, 255, 255, 0.9)" : "rgba(255,255,255,0.07)",
                  border: light ? "1px solid rgba(139, 92, 246, 0.25)" : "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <img src={gemini} alt="gemini" className="w-4 h-4" />
                <span className={`text-sm font-medium ${light ? "text-gray-800" : "text-white"}`}>Ask Gemini</span>
              </div>
              <div
                onClick={handleClaude}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${
                  light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
                }`}
                style={{
                  background: light ? "rgba(255, 255, 255, 0.9)" : "rgba(255,255,255,0.07)",
                  border: light ? "1px solid rgba(139, 92, 246, 0.25)" : "1px solid rgba(255,255,255,0.14)",
                }}
              >
                <img src={claude} alt="claude" className="w-4 h-4" />
                <span className={`text-sm font-medium ${light ? "text-gray-800" : "text-white"}`}>Ask Claude</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
