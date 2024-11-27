import { queryKeys } from '@/lib/query/keys';
import { tripService } from '@/services';
import { Trip } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUpdateTrip(tripId: string, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedTrip: Partial<Trip>) => tripService.update(tripId, updatedTrip),
    onMutate: async (updatedTrip) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.trips.all() });

      // Snapshot current data
      const previousTrips = queryClient.getQueryData<Trip[]>(queryKeys.trips.all());

      // Optimistically update
      if (previousTrips) {
        queryClient.setQueryData<Trip[]>(
          queryKeys.trips.all(),
          previousTrips.map((trip) =>
            trip.tripId === tripId ? { ...trip, ...updatedTrip } : trip,
          ),
        );
      }

      return { previousTrips };
    },
    onError: (_error, _updatedTrip, context) => {
      // Rollback on error
      if (context?.previousTrips) {
        queryClient.setQueryData(queryKeys.trips.all(), context.previousTrips);
      }
      toast.error('Failed to update trip');
    },
    onSuccess: () => {
      toast.success('Trip updated successfully');
      onSuccess?.();
    },
  });
}
