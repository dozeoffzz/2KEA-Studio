import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import "./index.css";
import App from "./App.jsx";
import { GlobalStyles } from "./styles/GlobalStyle.jsx";
import { Theme } from "./styles/theme.js";

const rootElement = document.getElementById("root");

let modalRoot = document.getElementById("modal-root");
if (!modalRoot) {
  modalRoot = document.createElement("div");
  modalRoot.setAttribute("id", "modal-root");
  document.body.appendChild(modalRoot);
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <GlobalStyles />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
);
