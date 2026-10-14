import { useState } from "react";
import { CoinContext } from "./coinContext.js";

const CoinContextProvider = (props) => {
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const [favorites, setFavorites] = useState([]);

  const contextValue = {
    favorites,
    setFavorites,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;