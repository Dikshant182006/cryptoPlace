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

  return (
     <div className={light ? "min-h-screen bg-white text-black" : "min-h-screen bg-black text-white"}>
      <ScrollToTop />
      <Navbar light={light} setLight={setLight} />
      {location.pathname !== "/signup" &&
      location.pathname !== "/login" && <TickerCoin />}
      <Routes>
        <Route path="/" element={<Home light={light} />} />
        <Route path="/coins/" element={<CryptoList light={light} />} />
        <Route path="/coin/:coinId" element={<Coin />} />
        <Route path="/signup" element={<SignUp light={light} />} />
        <Route path="/login" element={<Login light={light} />} />
        <Route path="/tracker" element={<Tracker light={light} />} />
        <Route path="/helpCenter" element={<HelpCenter light={light} />} />
        <Route path="/aboutus" element={<AboutUs light={light} />} />
        <Route path="/features" element={<Features />} />
        <Route path="/favorites/" element={<Favourite />} />
      </Routes>
      <Footer light={light} setLight={setLight} />
    </div>
  );
}

export default App;
