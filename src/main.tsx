import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { chakraTheme } from "./config/chakraTheme";
import { AuthProvider } from "./context/AuthProvider";
import { routesCreateBrowserRoute } from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme} resetCSS>
      <AuthProvider>
        <RouterProvider router={routesCreateBrowserRoute} />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
