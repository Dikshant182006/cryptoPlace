import { useState } from "react";
import Navbar from "./navbar/navbar.jsx";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home.jsx";
import Coin from "../pages/Coin/Coin.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Login from "../pages/login/Login.jsx";
import Footer from "./Footer/Footer.jsx";
import CryptoList from "../pages/Cryptocurrency/CryptoList.jsx";
import Tracker from "../pages/CrytoTracker/Tracker.jsx";
import HelpCenter from "./Footer/HelpCenter.jsx";
import AboutUs from "./Footer/AboutUs.jsx";
import Features from "./Footer/Features.jsx";
import Favourite from "../pages/Cryptocurrency/favourite.jsx";
import TickerCoin from "../pages/tickerCoins/tickerCoin.jsx";
import ScrollToTop from "../modules/shared/CommonSidebarForTop.jsx";
import { useLocation } from "react-router-dom";

function App() {
  const [light, setLight] = useState(false);
  const location = useLocation();

  const isAuthLocation = location.pathname === "/" || location.pathname === "/login";

  return (
     <div
       className={`${
         light ? "bg-white text-black" : "bg-black text-white"
       } ${
         isAuthLocation 
           ? "h-screen overflow-y-auto lg:overflow-hidden no-scrollbar"
           : "min-h-screen"
       }`}
     >
      <ScrollToTop />
      {!isAuthLocation && (
        <>
        <Navbar light={light} setLight={setLight} />
        <TickerCoin light={light} setLight={setLight} />
        </>
      )}

      <Routes>
        <Route path="/" element={<SignUp light={light} />} />
        <Route path="/login" element={<Login light={light} />} />
        <Route path="/home" element={<Home light={light} />} />
        <Route path="/coins/" element={<CryptoList light={light} />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/tracker" element={<Tracker light={light} />} />
        <Route path="/helpCenter" element={<HelpCenter light={light} />} />
        <Route path="/aboutus" element={<AboutUs light={light} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/favorites/" element={<Favourite light={light} />} />
      </Routes>

      {!isAuthLocation && (
      <Footer light={light} setlight={setLight} />
      )}
    </div>
  );
}

export default App;
