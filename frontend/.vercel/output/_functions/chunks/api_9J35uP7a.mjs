import { jsx } from 'react/jsx-runtime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import axios from 'axios';

function QueryProvider({ children }) {
  const [client] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1e3 * 60 * 5,
        retry: 1
      }
    }
  }));
  return /* @__PURE__ */ jsx(QueryClientProvider, { client, children });
}

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});
api.interceptors.request.use((config) => {
  if (typeof document !== "undefined") {
    const token = document.cookie.split("; ").find((row) => row.startsWith("auth_token="))?.split("=")[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export { QueryProvider as Q, api as a };
