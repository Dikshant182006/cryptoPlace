import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { CoinContext } from "../../context/coinContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import setting from "../assets/setting.svg";
import { useLocation } from "react-router-dom";
import { API_URL } from "../config";

function Navbar({ light, setLight }) {
  const { currency, setCurrency } = useContext(CoinContext);
  // set the menu in the mobile
  const [menuOpen, setMenuOpen] = useState(false);
  // set the toggle in the laptop and mobile black and dark color
  const [settingOpen, setSettingOpen] = useState(false);
  // Create a user
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/api/profile`, {
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
    }).catch(() => {
      setUser(null);
    })
  }, [location])
  
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

  const handleHandburg = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSetting = () => {
    setSettingOpen(!settingOpen);
  };

  const handleChange = () => {
    setLight((prev) => !prev);
  };

  const handleLogout = async () => {
    try{
      await axios.get(`${API_URL}/api/logout`, {
        withCredentials: true,
      });
      navigate('/login');
    } catch(error) {
      console.log(error);
    }
  }

  const navBg = light ? "bg-gray-200" : "bg-neutral-800";
  const navText = light ? "text-black/60" : "text-white/60";
  const invert = light ? "invert" : "";

  return (
    <>
      <div
        className={`flex items-center p-2 px-5 w-full fixed top-0 left-0 z-60 transition
${light ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
      >
        <div className="flex justify-between w-[60vw]">
          <div onClick={handleHandburg} className="md:hidden text-2xl cursor-pointer">
            ☰
          </div>
          <div className="flex items-center gap-2 text-center">
            <img
              src={logo}
              alt="logo"
              className="cursor-pointer w-9 h-9 hover:scale-110 transition"
            />
            <Link to={"/"} className="font-bold cursor-pointer text-lg">
              Cryptoplace
            </Link>
          </div>
        </div>

        <div className="md:flex items-center hidden justify-between w-full mx-20">
          <div className="md:flex hidden items-center justify-between w-[50vw] mx-5">
            <NavLink
              to={"/tracker"}
              className={({ isActive }) =>
                isActive
                  ? `${navBg} text-orange-400 cursor-pointer rounded-lg p-1 hover:bg-orange-400 hover:text-black text-sm px-4 font-bold`
                  : `${navBg} ${navText} cursor-pointer rounded-lg p-1 hover:bg-orange-400 hover:text-black text-sm px-4 font-bold`
              }
            >
              Portfolio Tracker
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-300" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/coins/"}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-300" : ""
              }
            >
              CryptoCurrencies
            </NavLink>
            
            <div className="relative">
              <img
                onClick={handleSetting}
                src={setting}
                alt="setting"
                className={`cursor-pointer w-6 hover:scale-110 transition ${invert}`}
              />
              {settingOpen && (
                <div
                  className={`mt-2 rounded-2xl absolute top-8 -right-12 w-44 p-3.5 shadow-2xl backdrop-blur-md transition-all z-50 ${
                    light
                      ? "bg-white border border-gray-200 text-gray-900 shadow-purple-500/10"
                      : "bg-gradient-to-b from-[#2c2c2c] to-[#121212] border border-white/10 text-white/90"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-sm">Theme</h2>
                    <label
                      className={`relative items-center flex cursor-pointer rounded-full p-0.5 transition ${
                        light ? "bg-gray-200" : "bg-gray-800"
                      }`}
                    >
                      <input
                        onChange={handleChange}
                        checked={light}
                        type="checkbox"
                        className="sr-only peer"
                      />

                      <div
                        className={`w-9 h-6 rounded-full flex justify-center items-center text-xs transition-all peer-checked:translate-x-4 ${
                          light
                            ? "bg-white text-amber-500 shadow-sm"
                            : "bg-gray-700 text-yellow-300"
                        }`}
                      >
                        {light ? "☀️" : "🌙"}
                      </div>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="currency-box md:flex items-center gap-5 hidden">
            <select
              className={`cursor-pointer px-3 py-1.5 justify-center rounded-lg text-sm font-medium transition ${
                light
                  ? "bg-gray-100 text-gray-900 border border-gray-300 hover:bg-gray-200"
                  : "bg-[#1f1f1f] text-white hover:bg-gray-900"
              }`}
              onChange={currencyHandler}
              value={currency?.name || "usd"}
            >
              <option value="usd" className={light ? "bg-white text-black" : "bg-black text-white"}>
                USD
              </option>
              <option value="inr" className={light ? "bg-white text-black" : "bg-black text-white"}>
                INR
              </option>
              <option value="eur" className={light ? "bg-white text-black" : "bg-black text-white"}>
                EUR
              </option>
            </select>

            {user ? (
              <div className="flex items-center gap-3">
                <span className={`text-sm font-medium ${light ? "text-gray-900" : "text-white"}`}>
                  Welcome, {user.firstname}
                </span>
                <button
                  onClick={handleLogout}
                  className={`px-5 py-1.5 rounded-xl backdrop-blur-md border text-sm font-medium text-center cursor-pointer transition ${
                    light
                      ? "text-gray-900 border-gray-300 hover:bg-gray-100"
                      : "text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`px-5 py-1.5 rounded-xl backdrop-blur-md border text-sm font-medium text-center transition ${
                    light
                      ? "text-gray-900 border-gray-300 hover:bg-gray-100"
                      : "text-white border-white/20 hover:bg-white/10"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-1.5 rounded-xl bg-orange-600 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 transition-all duration-300 text-sm font-medium text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {menuOpen && (
          <div
            className={`absolute top-14 left-0 w-[75%] h-screen shadow-2xl p-5 flex flex-col gap-8 md:hidden transition z-50 ${
              light ? "bg-white text-black border-r border-gray-200" : "bg-neutral-900 text-white"
            }`}
          >
            <NavLink
              to={"/tracker"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 cursor-pointer bg-neutral-800 rounded-lg p-2 text-sm px-4 font-bold w-full"
                  : `cursor-pointer rounded-lg p-2 text-sm px-4 font-bold w-full ${
                      light ? "bg-gray-100 text-gray-700" : "bg-neutral-800 text-white/70"
                    }`
              }
            >
              Portfolio Tracker
            </NavLink>
            <NavLink
              to={"/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-400 font-bold pb-1" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/coins/"}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-400 font-bold pb-1" : ""
              }
            >
              CryptoCurrencies
            </NavLink>

            {/* Theme toggle in mobile */}
            <div className="flex items-center justify-between py-2 border-t border-b border-gray-500/20">
              <span className="font-semibold text-sm">Theme</span>
              <label
                className={`relative items-center flex cursor-pointer rounded-full p-0.5 ${
                  light ? "bg-gray-200" : "bg-gray-800"
                }`}
              >
                <input
                  onChange={handleChange}
                  checked={light}
                  type="checkbox"
                  className="sr-only peer"
                />
                <div
                  className={`w-9 h-6 rounded-full flex justify-center items-center text-xs transition-all peer-checked:translate-x-4 ${
                    light ? "bg-white text-amber-500 shadow-sm" : "bg-gray-700 text-yellow-300"
                  }`}
                >
                  {light ? "☀️" : "🌙"}
                </div>
              </label>
            </div>

            <div className="currency-box flex flex-col gap-4">
              <select
                className={`cursor-pointer px-3 py-2 rounded-lg text-sm ${
                  light ? "bg-gray-100 text-black border border-gray-300" : "bg-[#1f1f1f] text-white"
                }`}
                onChange={currencyHandler}
                value={currency?.name || "usd"}
              >
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
              </select>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-orange-600 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 transition-all duration-300 text-center font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
      <hr className={`border transition ${light ? "border-gray-200" : "border-zinc-800"}`} />
    </>
  );
}

export default Navbar;
