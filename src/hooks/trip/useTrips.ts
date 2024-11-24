import { AuthContext } from '@/context/AuthContext';
import { queryKeys } from '@/lib/query/keys';
import { tripService } from '@/services';
import { Trip } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';

export function useTrips() {
  const { isAuthReady } = useContext(AuthContext);

  return useQuery({
    queryKey: queryKeys.trips.all(),
    queryFn: async () => {
      const response = await tripService.getAll();
      const trips: Trip[] = response.trips;

      return trips;
    },
    enabled: isAuthReady,
  });
}
