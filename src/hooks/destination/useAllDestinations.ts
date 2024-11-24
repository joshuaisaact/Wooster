import { AuthContext } from '@/context/AuthContext';
import { queryKeys } from '@/lib/query/keys';
import { destinationService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export function useAllDestinations() {
  const { isAuthReady } = useContext(AuthContext);

  return useQuery({
    queryKey: queryKeys.destinations.all(),
    queryFn: async () => {
      const response = await destinationService.getAll();
      return response.destinations;
    },
    enabled: isAuthReady,
    staleTime: 1000 * 60 * 5,
  });
}
