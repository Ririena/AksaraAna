import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import Navbars from "./components/Navigation/Navbars";
import FAB from "./components/Action/FAB.jsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <ChakraProvider>
        <Navbars />
        <App />
        <FAB />
      </ChakraProvider>
    </NextUIProvider>
  </React.StrictMode>
);
