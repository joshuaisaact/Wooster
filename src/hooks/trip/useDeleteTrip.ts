import { queryKeys } from '@/lib/query/keys';
import { tripService } from '@/services';
import { Trip } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tripService.delete,
    onMutate: async (tripId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.trips.all() });

      // Snapshot current data
      const previousTrips = queryClient.getQueryData<Trip[]>(queryKeys.trips.all());

      // Optimistically update
      if (previousTrips) {
        queryClient.setQueryData<Trip[]>(
          queryKeys.trips.all(),
          previousTrips.filter((trip) => trip.tripId !== tripId),
        );
      }

      return { previousTrips };
    },
    onError: (_error, _tripId, context) => {
      // Rollback on error
      if (context?.previousTrips) {
        queryClient.setQueryData(queryKeys.trips.all(), context.previousTrips);
      }
      toast.error('Failed to delete trip');
    },
    onSuccess: () => {
      toast.success('Trip deleted successfully');
    },
  });
}
