import { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CoinContext } from "../../../context/coinContext";
import axios from "axios";
import logo from "../../assets/logo.svg";
import { API_URL } from "../../config";

const Sidebar = ({ light, setLight, user, setUser }) => {
  const { currency, setCurrency } = useContext(CoinContext);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();

  const currencyHandler = (val) => {
    const currencyMap = {
      usd: "$",
      inr: "₹",
      eur: "€",
    };

    setCurrency({
      name: val,
      symbol: currencyMap[val] || "$",
    });
  };

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/logout`, {
        withCredentials: true,
      });
      if (setUser) setUser(null);
      setLogoutDialogOpen(false);
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

  const navItems = [
    {
      to: "/home",
      label: "Home",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      to: "/coins/",
      label: "CryptoCurrencies",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 6v12M15 9.5a3.5 3.5 0 0 0-5 0c0 2 5 2 5 4.5a3.5 3.5 0 0 1-5 0" />
        </svg>
      ),
    },
    {
      to: "/tracker",
      label: "Portfolio Tracker",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="20" x2="12" y2="10" />
          <line x1="18" y1="20" x2="18" y2="4" />
          <line x1="6" y1="20" x2="6" y2="16" />
        </svg>
      ),
    },
    {
      to: "/favorites/",
      label: "Watchlist",
      icon: (
        <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Toggle Button (cleanly placed in top header row on mobile, never dangling at bottom) */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className={`fixed left-3 top-4 z-[65] md:hidden p-2 rounded-xl border shadow-lg transition-all active:scale-95 ${light
            ? "bg-white border-gray-200 text-gray-800"
            : "bg-[#111322] border-white/10 text-white"
            }`}
          title="Open Navigation Menu"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      )}

      {/* Mobile Overlay Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] md:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen z-[75] transition-all duration-300 flex flex-col justify-between border-r shadow-2xl ${light
          ? "bg-white/95 border-gray-200 text-gray-800 backdrop-blur-xl"
          : "bg-[#0d0e17]/95 border-white/[0.08] text-gray-200 backdrop-blur-2xl"
          } ${collapsed ? "w-[72px]" : "w-[270px]"} ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Top Header / Brand */}
        <div className="p-4 border-b border-inherit">
          <div className="flex items-center justify-between">
            {/* Click Cryptoplace to toggle collapse/expand */}
            <div
              onClick={() => setCollapsed((prev) => !prev)}
              className="flex items-center gap-3 overflow-hidden cursor-pointer select-none group w-full"
              title={collapsed ? "Click to expand sidebar" : "Click to collapse sidebar"}
            >
              <img
                src={logo}
                alt="logo"
                className="w-9 h-9 shrink-0 group-hover:scale-105 transition-transform"
              />
              {!collapsed && (
                <div className="flex flex-col min-w-0">
                  <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-orange-400 via-amber-400 to-purple-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                    Cryptoplace
                  </span>
                </div>
              )}
            </div>

            {/* Close button (mobile) */}
            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Navigation */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Navigation
              </p>
            )}
            <nav className="space-y-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                      ? light
                        ? "bg-orange-500/10 text-orange-600 font-semibold shadow-xs"
                        : "bg-gradient-to-r from-orange-500/15 via-orange-500/5 to-transparent text-orange-300 font-semibold"
                      : light
                        ? "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        : "text-gray-400 hover:bg-white/[0.05] hover:text-white"
                    } ${collapsed ? "justify-center" : ""}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  {({ isActive }) => (
                    <>
                      {/* Active State Indicator: Tiny subtle vertical glow accent line */}
                      {isActive && (
                        <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-gradient-to-b from-orange-400 to-amber-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                      )}

                      <span className="transition-transform group-hover:scale-110">
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="flex-1 tracking-tight">{item.label}</span>
                      )}
                      {!collapsed && item.badge && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-black shadow-sm">
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Currency Selection */}
          {!collapsed ? (
            <div>
              <p className="px-3 mb-2 text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                Currency
              </p>
              <div
                className={`grid grid-cols-3 gap-1.5 p-1 rounded-xl border ${light ? "bg-gray-100 border-gray-200" : "bg-white/[0.04] border-white/10"
                  }`}
              >
                {["usd", "inr", "eur"].map((curr) => {
                  const active = currency?.name === curr;
                  return (
                    <button
                      key={curr}
                      onClick={() => currencyHandler(curr)}
                      className={`py-1.5 text-xs font-bold rounded-lg uppercase transition-all cursor-pointer ${active
                        ? light
                          ? "bg-white text-orange-600 shadow-sm"
                          : "bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold shadow-md shadow-orange-500/20"
                        : light
                          ? "text-gray-600 hover:text-black"
                          : "text-gray-400 hover:text-white"
                        }`}
                    >
                      {curr}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  const next = currency?.name === "usd" ? "inr" : currency?.name === "inr" ? "eur" : "usd";
                  currencyHandler(next);
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs uppercase border cursor-pointer transition-all ${light
                  ? "bg-gray-100 border-gray-200 text-orange-600"
                  : "bg-white/[0.05] border-white/10 text-orange-400 hover:border-orange-500/40"
                  }`}
                title={`Currency: ${currency?.name?.toUpperCase()} (click to cycle)`}
              >
                {currency?.symbol || "$"}
              </button>
            </div>
          )}
        </div>

        {/* Bottom Rail: Pinned Clean Flex Container (Settings, Theme, Profile) */}
        <div className="p-3 pb-4 border-t border-inherit shrink-0 space-y-2">
          {/* Theme Quick Toggle */}
          <button
            onClick={() => setLight(!light)}
            className={`w-full flex items-center justify-between p-2 rounded-xl border transition-all text-xs font-semibold cursor-pointer ${light
              ? "bg-gray-100/90 border-gray-200 hover:bg-gray-200 text-gray-800"
              : "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] text-gray-300"
              } ${collapsed ? "justify-center p-2" : ""}`}
            title={light ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm">{light ? "☀️" : "🌙"}</span>
              {!collapsed && <span>{light ? "Light Mode" : "Dark Mode"}</span>}
            </div>
            {!collapsed && (
              <span className="text-[10px] text-gray-400 uppercase font-mono tracking-wider">
                Toggle
              </span>
            )}
          </button>

          {/* User Profile / Logout */}
          {user ? (
            <div
              className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${light
                ? "bg-gray-50 border-gray-200 text-gray-900"
                : "bg-white/[0.03] border-white/[0.08] text-white"
                } ${collapsed ? "justify-center" : "justify-between"}`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full shrink-0 bg-gradient-to-tr from-orange-400 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                  {user.firstname?.[0]?.toUpperCase() || "U"}
                </div>
                {!collapsed && (
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold truncate">
                      {user.firstname}
                    </span>
                    <span className="text-[10px] text-gray-400 truncate">
                      {user.email || "Active User"}
                    </span>
                  </div>
                )}
              </div>

              {!collapsed && (
                <button
                  onClick={() => setLogoutDialogOpen(true)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-500/10 cursor-pointer transition"
                  title="Sign Out"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className={`flex items-center justify-center gap-2 w-full py-2 px-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${light
                ? "bg-orange-500 text-white hover:bg-orange-600 shadow-xs"
                : "bg-gradient-to-r from-orange-500 to-purple-600 text-white hover:opacity-90 shadow-sm"
                }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {!collapsed && <span>Sign In</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      {logoutDialogOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl transition-all border ${light
              ? "bg-white text-gray-900 border-gray-200"
              : "bg-[#131625] text-white border-white/10"
              }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>

            <h2 className="text-xl font-bold tracking-tight">Confirm Logout</h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Are you sure you want to log out of Cryptoplace?
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setLogoutDialogOpen(false)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${light
                  ? "border-gray-300 hover:bg-gray-100 text-gray-700"
                  : "border-white/10 hover:bg-white/10 text-gray-300"
                  }`}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-red-500 hover:bg-red-600 text-white transition-all shadow-lg shadow-red-500/20"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
