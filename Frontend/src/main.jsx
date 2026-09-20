import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CoinContextProvider from "../context/coinContext.jsx";
import { QueryProvider } from "./QueryProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CoinContextProvider>
        <QueryProvider>
        <App />
        </QueryProvider>
      </CoinContextProvider>
    </BrowserRouter>
  </StrictMode>
);
