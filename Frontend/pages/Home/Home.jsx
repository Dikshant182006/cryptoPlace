import { useContext, useState, useEffect } from "react";
import { CoinContext } from "../../context/coinContext";
import chatgpt from "../../src/assets/chatgpt.svg";
import gemini from "../../src/assets/gemini.svg";
import claude from "../../src/assets/claude.svg";
import useDebounce from "../../modules/shared/Hooks/useDebounceHook";
import { useCoins } from "../../src/hooks/UseCoin";
import { Pagination, DataTable, FearGreedIndex } from "../../src/components";

const EMPTY_COINS = [];

const Home = ({ light }) => {
  const { currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentCoins = displayCoin.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(displayCoin.length / itemsPerPage);

  const {
    data: coinData,
    isLoading,
    isError,
    error,
  } = useCoins(currency.name, 1, 50);

  const allCoin = coinData?.data ?? EMPTY_COINS;

  const [tableSearch, setTableSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeframe, setTimeframe] = useState("24h");
  const [wordIndex, setWordIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const debouncedSearch = useDebounce(tableSearch, 900);

  const ANIMATED_WORDS = [
    "Real-Time Intelligence",
    "Live Market Data",
    "Deep Insights",
    "Smart Alerts",
  ];

  const L1_SYMBOLS = ["btc", "eth", "sol", "bnb", "ada", "avax", "dot", "near", "trx", "atom", "apt", "sui"];
  const DEFI_SYMBOLS = ["uni", "aave", "link", "mkr", "crv", "ldo", "snx", "inj", "pendle", "sushi", "cake"];

  const CATEGORIES = [
    { id: "all", label: "All Coins" },
    { id: "gainers", label: "Gainers 🚀" },
    { id: "losers", label: "Losers 📉" },
    { id: "l1", label: "Layer 1" },
    { id: "defi", label: "DeFi" },
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
      header: timeframe === "7d" ? "7D Change" : "24H Change",
      width: "1fr",
      headerClassName: "text-right",
      cellClassName: "text-right",
      render: (item) => {
        const val = item.price_change_percentage_24h ?? 0;
        const isPositive = val > 0;
        return (
          <p
            className={`font-semibold ${isPositive ? "text-green-500" : "text-red-500"
              }`}
          >
            {isPositive ? "▲" : "▼"}{" "}
            {Math.abs(Math.floor(val * 100) / 100)}%
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

  // Filter and sort displayCoin
  useEffect(() => {
    let coins = [...allCoin];

    if (debouncedSearch.trim().length >= 2) {
      const q = tableSearch.toLowerCase().trim();
      coins = coins.filter(
        (coin) =>
          coin.name.toLowerCase().includes(q) ||
          coin.symbol.toLowerCase().includes(q)
      );
    }

    if (selectedCategory === "gainers") {
      coins.sort((a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0));
    } else if (selectedCategory === "losers") {
      coins.sort((a, b) => (a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0));
    } else if (selectedCategory === "l1") {
      coins = coins.filter((c) => L1_SYMBOLS.includes(c.symbol?.toLowerCase()));
    } else if (selectedCategory === "defi") {
      coins = coins.filter((c) => DEFI_SYMBOLS.includes(c.symbol?.toLowerCase()));
    }

    setDisplayCoin(coins);
  }, [allCoin, debouncedSearch, selectedCategory]);

  if (isLoading) return <p className="p-8 text-center text-gray-400">Loading market assets...</p>;
  if (isError) return <p className="p-8 text-center text-red-500">Error: {error.message} </p>;

  // Open ChatGpt
  const handleChat = () => {
    const prompt = "Best crypto Tracker";
    const encoded = encodeURIComponent(prompt);

    const url = `https://chatgpt.com/?q=${encoded}`;
    window.open(url, "_blank");
  };

  // Open Gemini
  const handleGemini = () => {
    const url = "https://aistudio.google.com/";
    window.open(url);
  };

  // Open Claude
  const handleClaude = () => {
    const url = "https://claude.ai/";
    window.open(url);
  };

  const textMain = light ? "text-black/80" : "text-white/50";

  return (
    <div className="home py-2">
      <div className="home p-2 relative">
        {/* Ambient atmospheric glows */}
        <div className="absolute left-0 top-0 w-[40vw] h-[65vh] bg-purple-600/15 blur-[140px] pointer-events-none" />
        <div className="absolute right-0 top-10 w-[30vw] h-[50vh] bg-indigo-600/10 blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 lg:gap-12 my-4 lg:my-6">
            {/* Left side: hero info and stats */}
            <div className="hero flex flex-col items-start text-left flex-1">
              <div className={`mb-3 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md text-xs font-medium inline-flex items-center gap-2 shadow-sm shadow-purple-500/10 hover:border-purple-500/50 transition-colors ${light ? "text-purple-700" : "text-purple-300"}`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                </span>
                <span>🚀 Real-Time Market Intelligence</span>
              </div>

              <h1 className="font-extrabold text-3xl sm:text-4xl lg:text-[46px] text-left leading-[1.12] tracking-tight">
                Explore Crypto Markets
                <br />
                <span className={`font-normal text-2xl sm:text-3xl ${textMain}`}>with </span>
                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]" style={{
                  transition: "opacity 0.35s ease, transform 0.35s ease",
                  opacity: animating ? 0 : 1,
                  display: "inline-block",
                }}>{ANIMATED_WORDS[wordIndex]}</span>
              </h1>

              {/* Utility Macro Metrics replacing generic marketing text */}
              <div className="flex flex-wrap items-center gap-2 pt-3 pb-1">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${light
                  ? "bg-white/90 border-slate-200 text-slate-700 shadow-sm"
                  : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.07]"
                  }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]"></span>
                  <span className={light ? "text-slate-500" : "text-slate-400"}>BTC Dom:</span>
                  <span className={`font-bold ${light ? "text-slate-900" : "text-white"}`}>54.2%</span>
                </span>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${light
                  ? "bg-white/90 border-slate-200 text-slate-700 shadow-sm"
                  : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.07]"
                  }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.6)]"></span>
                  <span className={light ? "text-slate-500" : "text-slate-400"}>24h Vol:</span>
                  <span className={`font-bold ${light ? "text-slate-900" : "text-white"}`}>$84.2B</span>
                </span>

                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${light
                  ? "bg-white/90 border-slate-200 text-slate-700 shadow-sm"
                  : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.07]"
                  }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"></span>
                  <span className={light ? "text-slate-500" : "text-slate-400"}>Gas:</span>
                  <span className={`font-bold ${light ? "text-slate-900" : "text-white"}`}>18 Gwei</span>
                </span>
              </div>

              {/* Stat Cards with micro-interactions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 w-full max-w-xl text-left">
                <div className={`p-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-default group ${light
                  ? "bg-white/80 border-black/5 hover:border-black/15 shadow-sm hover:shadow-md"
                  : "bg-white/[0.03] border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.06] hover:shadow-[0_8px_25px_rgba(168,85,247,0.12)] backdrop-blur-md"
                  }`}>
                  <p className="text-purple-400 font-extrabold text-2xl tracking-tight group-hover:scale-105 transition-transform origin-left">10,000+</p>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">Cryptocurrencies</p>
                </div>

                <div className={`p-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-default group ${light
                  ? "bg-white/80 border-black/5 hover:border-black/15 shadow-sm hover:shadow-md"
                  : "bg-white/[0.03] border-white/[0.08] hover:border-orange-500/30 hover:bg-white/[0.06] hover:shadow-[0_8px_25px_rgba(249,115,22,0.12)] backdrop-blur-md"
                  }`}>
                  <p className="text-orange-400 font-extrabold text-2xl tracking-tight group-hover:scale-105 transition-transform origin-left">$2.5T+</p>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">Market Cap</p>
                </div>

                <div className={`p-3.5 rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 cursor-default group ${light
                  ? "bg-white/80 border-black/5 hover:border-black/15 shadow-sm hover:shadow-md"
                  : "bg-white/[0.03] border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.06] hover:shadow-[0_8px_25px_rgba(16,185,129,0.12)] backdrop-blur-md"
                  }`}>
                  <div className="flex items-center gap-2 group-hover:scale-105 transition-transform origin-left">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <p className="text-emerald-400 font-extrabold text-2xl tracking-tight">Live</p>
                  </div>
                  <p className="text-gray-400 text-xs mt-0.5 font-medium">Price Updates</p>
                </div>
              </div>
            </div>

            {/* Right side: Fear & Greed Index */}
            <div className="w-full lg:w-auto flex justify-center lg:justify-end shrink-0">
              <FearGreedIndex light={light} />
            </div>
          </div>
        </div>
      </div>

      {/* Market Overview Section Header & DataTable */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-4 sm:mt-6 mb-8">
        {/* Header & Instant Category Pills */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 px-1">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className={`text-xl sm:text-2xl font-bold tracking-tight ${light ? "text-gray-900" : "text-white"}`}>
                Market Overview
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Live Feed
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
              Real-time assets sorted by market cap and performance
            </p>
          </div>

          {/* Instant Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/20 font-semibold"
                    : light
                      ? "bg-white/80 border border-slate-200 text-slate-700 hover:bg-slate-100"
                      : "bg-white/[0.04] border border-white/10 text-slate-300 hover:bg-white/[0.08] hover:text-white"
                    }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Mini Table Search & Timeframe Switcher directly above the table */}
        <div className="flex items-center justify-between gap-3 mb-3 px-1">
          {/* Mini-filter Search */}
          <div className="relative flex-1 max-w-xs">
            <svg
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none ${light ? "text-slate-400" : "text-slate-500"
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Filter coins in table..."
              className={`w-full pl-9 pr-3 py-1.5 rounded-xl text-xs transition-all border outline-none ${light
                ? "bg-white border-slate-200 text-slate-800 placeholder-slate-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/20"
                : "bg-white/[0.04] border-white/10 text-white placeholder-slate-500 focus:border-orange-500/50 focus:bg-white/[0.07] focus:ring-1 focus:ring-orange-500/20"
                }`}
            />
            {tableSearch && (
              <button
                onClick={() => setTableSearch("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Timeframe Switcher */}
          <div
            className={`flex items-center p-0.5 rounded-xl border text-xs font-medium ${light ? "bg-slate-100 border-slate-200" : "bg-white/[0.03] border-white/10"
              }`}
          >
            <button
              onClick={() => setTimeframe("24h")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${timeframe === "24h"
                ? light
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "bg-white/15 text-white shadow-xs font-semibold"
                : light
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              24h
            </button>
            <button
              onClick={() => setTimeframe("7d")}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${timeframe === "7d"
                ? light
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "bg-white/15 text-white shadow-xs font-semibold"
                : light
                  ? "text-slate-500 hover:text-slate-900"
                  : "text-slate-400 hover:text-white"
                }`}
            >
              7d
            </button>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={currentCoins}
          light={light}
          rowKey={(item) => item.id}
          getRowLink={(item) => `/coin/${item.id}`}
          footer={
            <Pagination
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

      <div className="mt-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className={`border-t ${light ? "border-black/5" : "border-white/10"}`}></div>
        <div className="text-center w-full pt-12 pb-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            All-In-One Crypto Tracker to Manage Your <br className="hidden sm:inline" /> Portfolio More
            Efficiently
          </h2>
          <p className={`${textMain} text-sm sm:text-base`}>
            We’re the only platform on the market that supports all <br className="hidden sm:inline" /> major
            crypto platforms.
          </p>
        </div>
      </div>

      <div className="cryptoAi my-12 max-w-7xl mx-auto px-4 sm:px-6">
        <div
          className={`rounded-3xl w-full py-14 px-6 sm:px-12 text-center relative overflow-hidden ${light ? "border border-purple-200/60 shadow-xl" : ""
            }`}
          style={{
            background: light
              ? "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 50%, #fdf4ff 100%)"
              : "linear-gradient(135deg, #13111c 0%, #0e0c18 60%, #161020 100%)",
          }}
        >
          {/* Clean ambient backlights instead of floating sticker badges */}
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-indigo-500/10 blur-3xl pointer-events-none" />

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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
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
                className={`flex items-center gap-2 px-5 py-3 rounded-xl cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${light ? "hover:bg-white shadow-sm" : "hover:bg-white/15"
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
