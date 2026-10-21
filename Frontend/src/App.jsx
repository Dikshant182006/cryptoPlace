import { useEffect, useState } from "react";
import Navbar from "./navbar/navbar.jsx";
import { Sidebar } from "./components";
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
import ProtectedRoute from "./components/ProtectedRoutes/ProtectedRoutes.jsx";
import { useLocation } from "react-router-dom";
import { API_URL } from "./config.js";
import axios from "axios";

function App() {
  const [light, setLight] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const location = useLocation();
  console.log("APP COMPONENT RENDERS");

  const isAuthLocation = location.pathname === "/" || location.pathname === "/signup";
  useEffect(() => {
    axios.get(`${API_URL}/api/profile`, {
      withCredentials: true,
    }).then((res) => {
      setUser(res.data);
    }).catch(() => {
      setUser(null);
    }).finally(() => {
      setAuthLoading(false);
    })
  }, []);

  useEffect(() => {
    if (light) {
      document.body.style.backgroundColor = "#ffffff";
      document.body.style.color = "#000000";
    } else {
      document.body.style.backgroundColor = "#000000";
      document.body.style.color = "#ffffff";
    }
  }, [light]);

  return (
    <div
      className={`${light ? "bg-white text-black" : "bg-black text-white"
        } ${isAuthLocation
          ? "h-screen overflow-y-auto lg:overflow-hidden no-scrollbar"
          : "min-h-screen"
        }`}
    >
      <ScrollToTop />
      {!isAuthLocation && (
        <>
          <Navbar light={light} setLight={setLight} user={user} setUser={setUser} />
          <Sidebar light={light} setLight={setLight} user={user} setUser={setUser} />
          <TickerCoin light={light} setLight={setLight} />
        </>
      )}

      <main className={!isAuthLocation ? "pt-[108px] md:pl-[72px]" : ""}>
        <Routes>
          <Route path="/signup" element={<SignUp light={light} />} />
          <Route path="/" element={<Login light={light} user={user} setUser={setUser} />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute user={user} authLoading={authLoading} />}>
            <Route path="/home" element={<Home light={light} />} />
            <Route path="/coins/" element={<CryptoList light={light} />} />
            <Route path="/coin/:coinId" element={<Coin />} />
            <Route path="/tracker" element={<Tracker light={light} />} />
            <Route path="/helpCenter" element={<HelpCenter light={light} />} />
            <Route path="/aboutus" element={<AboutUs light={light} />} />
            <Route path="/features" element={<Features />} />
            <Route path="/favorites/" element={<Favourite light={light} />} />
          </Route>
        </Routes>
      </main>

      {!isAuthLocation && (
        <div className="md:pl-[72px]">
          <Footer light={light} setlight={setLight} />
        </div>
      )}
    </div>
  );
}

export default App;
