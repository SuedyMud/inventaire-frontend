import React from 'react'
import {createRoot} from "react-dom/client";
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()
const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="student-projet-2223.eu.auth0.com"
    clientId="23dT9oUENIA4Todeng1rMvchPN6y9WXm"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
      <React.StrictMode>
          <QueryClientProvider client={queryClient}>
              <App />
              {/*<ReactQueryDevtools />*/}
          </QueryClientProvider>

      </React.StrictMode>
  </Auth0Provider>,
);
