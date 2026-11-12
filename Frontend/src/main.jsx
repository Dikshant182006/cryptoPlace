import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import CoinContextProvider from "../context/coinContext.jsx";
import { QueryProvider } from "./QueryProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <CoinContextProvider>
          <QueryProvider>
            <App />
          </QueryProvider>
        </CoinContextProvider>
      </BrowserRouter>
      </ GoogleOAuthProvider>
      </StrictMode>
);
