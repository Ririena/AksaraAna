import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbars from "./components/Navigation/Navbars";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <Navbars />
      <App />
    </NextUIProvider>
  </React.StrictMode>
);
