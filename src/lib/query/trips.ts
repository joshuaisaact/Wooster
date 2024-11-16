import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTrips, fetchTrip, createTrip, deleteTrip } from '@/services/apiService';
import { queryKeys } from './keys';
import { Trip } from '@/types/types';
import { toast } from 'sonner';

// Get all trips
export function useTrips() {
  return useQuery({
    queryKey: queryKeys.trips.all,
    queryFn: async () => {
      const response = await fetchTrips();
      return response.data;
    },
  });
}

// Get single trip
export function useTrip(tripId: string | undefined) {
  return useQuery({
    queryKey: tripId ? queryKeys.trips.detail(tripId) : [],
    queryFn: async () => {
      if (!tripId) {
        throw new Error('Trip ID is undefined');
      }
      const response = await fetchTrip(tripId);
      return response.data.trip; // Access the 'trip' property from the response data
    },
    enabled: !!tripId,
    retry: 3,
    retryDelay: 1000,
    staleTime: 1000 * 60 * 5,
  });
}

// Create trip
export function useCreateTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTrip,
    onSuccess: (newTrip) => {
      queryClient.setQueryData<Trip[]>(queryKeys.trips.all, (oldTrips = []) => [
        ...oldTrips,
        newTrip.data,
      ]);
      toast.success('Trip created successfully');
    },
    onError: (error) => {
      toast.error('Failed to create trip');
      console.error('Error creating trip:', error);
    },
  });
}

// Delete trip
export function useDeleteTrip() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTrip,
    onMutate: async (tripId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.trips.all });

      // Snapshot current data
      const previousTrips = queryClient.getQueryData<Trip[]>(queryKeys.trips.all);

      // Optimistically update
      if (previousTrips) {
        queryClient.setQueryData<Trip[]>(
          queryKeys.trips.all,
          previousTrips.filter((trip) => trip.tripId !== tripId),
        );
      }

      return { previousTrips };
    },
    onError: (_error, _tripId, context) => {
      // Rollback on error
      if (context?.previousTrips) {
        queryClient.setQueryData(queryKeys.trips.all, context.previousTrips);
      }
      toast.error('Failed to delete trip');
    },
    onSuccess: () => {
      toast.success('Trip deleted successfully');
    },
  });
}

// Combined hook for common use cases
export function useTripActions() {
  const { data: trips = [], isLoading } = useTrips();
  const createTripMutation = useCreateTrip();
  const deleteTripMutation = useDeleteTrip();

  return {
    trips,
    isLoading,
    createTrip: createTripMutation.mutate,
    deleteTrip: deleteTripMutation.mutate,
    isPending: createTripMutation.isPending || deleteTripMutation.isPending,
  };
}
