import React from 'react'
import {createRoot} from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {BrowserRouter} from "react-router-dom";


const queryClient = new QueryClient()
const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    useRefreshTokens={true}
    authorizationParams={{
      redirect_uri: window.location.origin,
        audience:import.meta.env.VITE_AUTH0_AUDIENCE,
    }}
  >
      <React.StrictMode>
          <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>

              <ReactQueryDevtools />
          </QueryClientProvider>

      </React.StrictMode>
  </Auth0Provider>,
);
