import { createContext, useState } from "react";
export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const [favorites, setFavorites] = useState([]);

  const contextValue = {
    currency,
    setCurrency,
    favorites,
    setFavorites,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
