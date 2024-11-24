import { AuthContext } from '@/context/AuthContext';
import { queryKeys } from '@/lib/query/keys';
import { destinationService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export function useSavedDestinations() {
  const { isAuthReady } = useContext(AuthContext);

  return useQuery({
    queryKey: queryKeys.destinations.saved(),
    queryFn: async () => {
      const response = await destinationService.getAllSaved();
      return response.savedDestinations;
    },
    enabled: isAuthReady,
  });
}
