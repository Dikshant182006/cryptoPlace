import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import { useCoins } from "../hooks/UseCoin";
import axios from "axios";
import logo from "../assets/logo.svg";
import useDebounce from "../../modules/shared/Hooks/useDebounceHook";
import { API_URL } from "../config";

function Navbar({ light, setLight, user, setUser }) {
  const { currency, setCurrency } = useContext(CoinContext);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const searchInputRef = useRef(null);
  const profileRef = useRef(null);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  // Fetch coins for command-bar search
  const { data: coinsData } = useCoins(currency?.name || "usd", 1, 100);
  const allCoins = Array.isArray(coinsData?.data) ? coinsData.data : Array.isArray(coinsData) ? coinsData : [];
  const debouncedHook = useDebounce(searchQuery, 900);

  // Filtered search results
  const searchResults = debouncedHook.trim().length >= 2
    ? allCoins.filter(
      (c) =>
        c.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symbol?.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6)
    : [];

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Global Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }
      if (e.key === "Escape") {
        setSearchFocused(false);
        setProfileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside listener for dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Format date and time for profile dropdown
  let hours = currentTime.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = String(hours % 12 || 12).padStart(2, "0");
  const minutes = String(currentTime.getMinutes()).padStart(2, "0");

  const currencyHandler = (e) => {
    const value = e.target.value;
    const currencyMap = {
      usd: "$",
      inr: "₹",
      eur: "€",
    };

    setCurrency({
      name: value,
      symbol: currencyMap[value] || "$",
    });
  };

  const handleToggleTheme = () => {
    setLight((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/logout`, {
        withCredentials: true,
      });
      if (setUser) setUser(null);
      setLogoutDialogOpen(false);
      setProfileOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    if (!logoutDialogOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setLogoutDialogOpen(false);
      if (e.key === "Enter") handleLogout();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [logoutDialogOpen]);

  const handleSelectCoin = (coinId) => {
    setSearchQuery("");
    setSearchFocused(false);
    navigate(`/coin/${coinId}`);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[68px] z-60 backdrop-blur-xl transition-colors duration-200 border-b flex items-center ${light
          ? "bg-white/95 border-gray-200 text-gray-900 shadow-sm"
          : "bg-[#0b0e17]/95 border-white/[0.08] text-white shadow-lg"
          }`}
      >
        <div className="relative w-full h-full px-3 sm:px-6 md:pl-24 flex items-center justify-between gap-3 sm:gap-6">
          {/* LEFT: Logo Branding & Crypto Market Status */}
          <div className="flex items-center gap-2.5 shrink-0 z-10">
            <Link
              to="/home"
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              title="Cryptoplace Home"
            >
              <img
                src={logo}
                alt="Cryptoplace Logo"
                className="w-7 h-7 sm:w-8 sm:h-8 group-hover:scale-105 transition-transform"
              />
              <span className="font-extrabold text-sm sm:text-base tracking-tight bg-gradient-to-r from-orange-400 via-amber-400 to-purple-400 bg-clip-text text-transparent hidden sm:inline-block">
                Cryptoplace
              </span>
            </Link>

            {/* Live Market Status Badge */}
            <div
              className={`hidden xl:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${light
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Live 24/7</span>
            </div>
          </div>

          {/* CENTER: Inline Command-Bar Global Search (Replaced center clutter) */}
          <div
            ref={searchContainerRef}
            className="relative flex-1 max-w-lg mx-auto hidden sm:block z-20"
          >
            <div
              className={`relative flex items-center w-full rounded-2xl border transition-all duration-200 ${light
                ? "bg-gray-100/90 border-gray-300 text-gray-900 focus-within:bg-white focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 shadow-xs"
                : "bg-white/[0.04] border-white/10 text-white focus-within:bg-white/[0.07] focus-within:border-orange-500/60 focus-within:ring-2 focus-within:ring-orange-500/20 shadow-inner"
                }`}
            >
              <span className="pl-3.5 pr-2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search coin, pair, or contract... [Ctrl + K]"
                className="w-full py-2 bg-transparent text-xs sm:text-sm outline-none placeholder:text-gray-500"
              />
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 mr-2 text-gray-400 hover:text-white text-xs cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              ) : (
                <div className="pr-3 flex items-center gap-1 shrink-0 pointer-events-none">
                  <kbd
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${light
                      ? "bg-white border-gray-300 text-gray-500"
                      : "bg-white/10 border-white/10 text-gray-400"
                      }`}
                  >
                    Ctrl K
                  </kbd>
                </div>
              )}
            </div>

            {/* Instant Search Results Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div
                className={`absolute left-0 right-0 top-full mt-2 rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl z-50 ${light
                  ? "bg-white/95 border-gray-200 text-gray-900 shadow-gray-300/40"
                  : "bg-[#101322]/98 border-white/10 text-white shadow-black/80"
                  }`}
              >
                <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  Matching Cryptocurrencies
                </div>
                <div className="space-y-1">
                  {searchResults.map((coin) => (
                    <div
                      key={coin.id}
                      onClick={() => handleSelectCoin(coin.id)}
                      className={`flex items-center justify-between px-3 py-2 rounded-xl cursor-pointer transition ${light
                        ? "hover:bg-gray-100 text-gray-900"
                        : "hover:bg-white/[0.06] text-white"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="w-5 h-5 rounded-full"
                        />
                        <span className="font-semibold text-xs sm:text-sm">
                          {coin.name}
                        </span>
                        <span className="text-[11px] font-mono text-gray-400 uppercase">
                          {coin.symbol}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold">
                          {currency.symbol}
                          {coin.current_price?.toLocaleString()}
                        </span>
                        <span
                          className={`ml-2 text-[11px] font-semibold ${coin.price_change_percentage_24h >= 0
                            ? "text-emerald-400"
                            : "text-red-400"
                            }`}
                        >
                          {coin.price_change_percentage_24h >= 0 ? "+" : ""}
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: Controls & Profile Dropdown */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 z-10 ml-auto">
            {/* Currency Selector */}
            <div className="relative">
              <select
                className={`cursor-pointer px-2.5 py-1.5 rounded-xl text-xs font-bold uppercase transition border ${light
                  ? "bg-gray-100 text-gray-900 border-gray-300 hover:bg-gray-200"
                  : "bg-neutral-800 text-white border-white/10 hover:bg-neutral-700"
                  }`}
                onChange={currencyHandler}
                value={currency?.name || "usd"}
                title="Select Currency"
              >
                <option value="usd" className={light ? "bg-white text-black" : "bg-neutral-900 text-white"}>
                  USD ($)
                </option>
                <option value="inr" className={light ? "bg-white text-black" : "bg-neutral-900 text-white"}>
                  INR (₹)
                </option>
                <option value="eur" className={light ? "bg-white text-black" : "bg-neutral-900 text-white"}>
                  EUR (€)
                </option>
              </select>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={handleToggleTheme}
              className={`p-1.5 sm:p-2 rounded-xl border cursor-pointer transition-all active:scale-95 flex items-center justify-center ${light
                ? "bg-gray-100 border-gray-300 text-amber-500 hover:bg-gray-200"
                : "bg-neutral-800 border-white/10 text-yellow-300 hover:bg-neutral-700"
                }`}
              title={light ? "Switch to Dark Mode" : "Switch to Light Mode"}
              aria-label="Toggle theme"
            >
              {light ? "☀️" : "🌙"}
            </button>

            {/* User Profile Avatar with Personalization Dropdown */}
            {user ? (
              <div ref={profileRef} className="relative">
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-2xl border transition-all active:scale-95 cursor-pointer ${light
                    ? "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-900"
                    : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-white"
                    }`}
                  title="User Account & Personalization"
                >
                  <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-gradient-to-tr from-orange-500 via-amber-400 to-purple-600 text-white flex items-center justify-center text-xs font-black uppercase shadow-sm">
                    {user.firstname?.[0] || "U"}
                  </div>
                  <span className="hidden md:inline-block text-xs font-bold tracking-tight">
                    {user.firstname}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""
                      }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Subtle User Personalization Dropdown Menu */}
                {profileOpen && (
                  <div
                    className={`absolute right-0 top-full mt-2 w-64 rounded-2xl border p-3 shadow-2xl backdrop-blur-2xl z-50 transition-all ${light
                      ? "bg-white/95 border-gray-200 text-gray-900 shadow-gray-300/40"
                      : "bg-[#111425]/98 border-white/15 text-white shadow-black/80"
                      }`}
                  >
                    {/* Greeting Header */}
                    <div className="px-2 py-2 border-b border-inherit mb-2">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-orange-400">
                        <span>👋</span>
                        <span>Good Morning</span>
                      </div>
                      <p className="font-extrabold text-sm truncate mt-0.5">
                        {user.firstname} {user.lastname || ""}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {user.email || "crypto.trader@cryptoplace.io"}
                      </p>
                      <div className="mt-2 text-[10px] text-gray-400 font-mono flex items-center justify-between">
                        <span>Session Local Time</span>
                        <span className="text-gray-300 font-semibold">
                          {displayHours}:{minutes} {ampm}
                        </span>
                      </div>
                    </div>

                    {/* Quick navigation */}
                    <div className="space-y-1 text-xs">
                      <Link
                        to="/tracker"
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition ${light ? "hover:bg-gray-100" : "hover:bg-white/[0.06]"
                          }`}
                      >
                        <svg className="w-4 h-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="12" y1="20" x2="12" y2="10" />
                          <line x1="18" y1="20" x2="18" y2="4" />
                          <line x1="6" y1="20" x2="6" y2="16" />
                        </svg>
                        <span>Portfolio Tracker</span>
                      </Link>

                      <Link
                        to="/favorites/"
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition ${light ? "hover:bg-gray-100" : "hover:bg-white/[0.06]"
                          }`}
                      >
                        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        <span>Watchlist</span>
                      </Link>

                      <Link
                        to="/helpCenter"
                        onClick={() => setProfileOpen(false)}
                        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition ${light ? "hover:bg-gray-100" : "hover:bg-white/[0.06]"
                          }`}
                      >
                        <svg className="w-4 h-4 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                          <line x1="12" y1="17" x2="12.01" y2="17" />
                        </svg>
                        <span>Help & Support</span>
                      </Link>
                    </div>

                    {/* Divider and Logout */}
                    <div className="pt-2 mt-2 border-t border-inherit">
                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          setLogoutDialogOpen(true);
                        }}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 cursor-pointer transition"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                          <polyline points="16 17 21 12 16 7" />
                          <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:inline-block px-3.5 py-1.5 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white transition shadow-sm"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Logout Confirmation Dialog Modal */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl transition-all ${light
              ? "bg-white text-gray-900 border border-gray-200"
              : "bg-neutral-900 text-white border border-white/10"
              }`}
          >
            <h2 className="text-xl font-bold">Confirm Logout</h2>
            <p className="mt-3 text-sm opacity-75">
              Are you sure you want to log out of Cryptoplace?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className="rounded-lg border border-gray-400 px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-500/10 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold cursor-pointer text-white hover:bg-red-700 transition"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
