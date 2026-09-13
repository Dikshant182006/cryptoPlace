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
  const { setCurrency } = useContext(CoinContext);
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
        className={`flex items-center p-2 px-5 w-full fixed top-0 left-0 z-50 transition
${light ? "bg-white text-black" : "bg-neutral-900 text-white"}`}
      >
        <div className="flex justify-between w-[60vw]">
          <div onClick={handleHandburg} className="md:hidden text-2xl">
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
            <img
              onClick={handleSetting}
              className="cursor-pointer w-6"
              src={setting}
              alt="setting"
              className={`hover:scale-110 transition ${invert}`}
            />
          </div>

          {settingOpen && (
            <div className="bg-gradient-to-b from-[#2c2c2c] to-[#121212] mt-0.5 rounded-b-2xl absolute top-14 right-67 w-[15%] h-15">
              <div className="text-white/60 p-4 flex justify-between items-center">
                <h2>Theme</h2>
                <label className="relative items-center flex cursor-pointer bg-gray-800 rounded-2xl">
                  <input
                    onChange={handleChange}
                    checked={light}
                    type="checkbox"
                    className="sr-only peer"
                  />

                  <div className="w-10 bg-gray-700 h-6 rounded-full flex justify-center items-center text-black peer-checked:translate-x-6 transition">
                    🌙
                  </div>
                </label>
              </div>
            </div>
          )}

          <div className="currency-box md:flex gap-5 hidden">
            <select
              className={`cursor-pointer bg-[#1f1f1f] px-3 justify-center rounded-lg hover:bg-gray-900 ${navBg}`}
              onChange={currencyHandler}
            >
              <option value="usd" className="bg-black">
                USD
              </option>
              <option value="inr" className="bg-black">
                INR
              </option>
              <option value="eur" className="bg-black">
                EUR
              </option>
            </select>

            {
              user ? (
                <div className="flex items-center">
                <span className="w-40">Welcome, {user.firstname}</span>
                <button onClick={handleLogout} className="px-6 py-2 rounded-xl backdrop-blur-md text-white border border-white/20 text-center cursor-pointer">Logout</button>
                </div>
              ) : (
                <>
                <Link
              to="/login"
              className="px-6 py-2 rounded-xl backdrop-blur-md text-white border border-white/20 text-center"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 w-[11vw] py-2 rounded-xl bg-orange-600 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 transition-all duration-300 text-center"
            >
              Get Started
            </Link>
            </>
              )
            }
          </div>
        </div>

        {menuOpen && (
          <div className="absolute top-14 left-0 w-[70%] h-screen bg-neutral-900 shadow-xl p-5 flex flex-col gap-10 md:hidden">
            <NavLink
              to={"/tracker"}
              className={({ isActive }) =>
                isActive
                  ? "text-orange-400 cursor-pointer bg-neutral-800 rounded-lg p-1 hover:bg-orange-400 hover:text-black text-sm px-4 font-bold w-[35vw]"
                  : "cursor-pointer bg-neutral-800 rounded-lg p-1 hover:bg-orange-400 hover:text-black text-sm px-4 text-white/60 font-bold w-[35vw]"
              }
            >
              Portfolio Tracker
            </NavLink>
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-300 w-[12vw]" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/coins/"}
              className={({ isActive }) =>
                isActive ? "border-b-2 border-orange-300 w-[30vw]" : ""
              }
            >
              CryptoCurrencies
            </NavLink>
            <img
              onClick={handleSetting}
              className="cursor-pointer w-10 hover:scale-110 transition"
              src={setting}
            />

            <div className="currency-box md:flex gap-5 hidden">
              <select
                className="cursor-pointer bg-[#1f1f1f] px-3 justify-center rounded-lg hover:bg-gray-900"
                onChange={currencyHandler}
              >
                <option value="usd">USD</option>
                <option value="inr">INR</option>
                <option value="eur">EUR</option>
              </select>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-orange-600 backdrop-blur-md text-white border border-white/20 hover:bg-orange-500 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
      <hr className="border border-zinc-800" />
    </>
  );
}

export default Navbar;
