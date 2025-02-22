import { QueryClient } from "@tanstack/react-query";

export const client = new QueryClient({
  defaultOptions: {
    mutations: {},
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
