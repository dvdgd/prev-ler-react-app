import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { chakraTheme } from "./config/chakraTheme";
import { queryClient } from "./config/tanStackQueryClient";
import { AuthProvider } from "./context/AuthProvider";
import { routesCreateBrowserRoute } from "./routes/Router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme} resetCSS>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routesCreateBrowserRoute} />
        </AuthProvider>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>
);
