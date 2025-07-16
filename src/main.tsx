import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react';
import App from "./App";

import { feltTheme } from "./theme";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={feltTheme}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{ redirect_uri: window.location.origin }}
            useCookiesForTransactions={true}
          >
            <App />
          </Auth0Provider>
        </ThemeProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
