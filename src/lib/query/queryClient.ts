import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Default query options
      staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
      retry: 2, // Number of retries on failure
      refetchOnWindowFocus: true,
    },
    mutations: {
      // Default mutation options
      retry: 1,
    },
  },
});
