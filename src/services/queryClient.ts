import { QueryClient } from "@tanstack/react-query";

// Shared React Query client with sensible defaults for caching and retries.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
