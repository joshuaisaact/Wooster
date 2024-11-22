import { useQueryClient, useIsFetching } from '@tanstack/react-query';
import { useEffect } from 'react';
import { fetchDestinations, fetchTrips } from '@/services/apiService';
import { queryKeys } from '@/lib/query/keys';

interface LoadingBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LoadingBoundary({ children, fallback }: LoadingBoundaryProps) {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  useEffect(() => {
    const prefetchCriticalData = async () => {
      try {
        await Promise.all([
          queryClient.prefetchQuery({
            queryKey: queryKeys.destinations.saved(),
            queryFn: async () => {
              const response = await fetchDestinations();
              return response.data;
            },
            staleTime: 1000 * 60 * 5, // 5 minutes
          }),
          queryClient.prefetchQuery({
            queryKey: queryKeys.trips.all,
            queryFn: async () => {
              const response = await fetchTrips();
              return response.data;
            },
            staleTime: 1000 * 60 * 5,
          }),
        ]);
      } catch (error) {
        console.error('Failed to prefetch data:', error);
      }
    };

    prefetchCriticalData();
  }, [queryClient]);

  if (isFetching) {
    return (
      fallback || (
        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
          <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
            Loading your adventures...
          </div>
        </div>
      )
    );
  }

  return children;
}
