import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./i18n";
import App from "./App";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CategoryProvider } from "./contexts/CategoryContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <LanguageProvider>
          <CategoryProvider>
            <App />
          </CategoryProvider>
        </LanguageProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>
);