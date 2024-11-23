import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchTrips, createTrip, deleteTrip } from '@/services/apiService';
import { queryKeys } from './keys';
import { Trip } from '@/types/types';
import { toast } from 'sonner';
import { CreateTripData, CreateTripResponse } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import { useContext, useMemo } from 'react';
import { AuthContext } from '@/context/AuthContext';

// Get all trips
export function useTrips() {
  const { isAuthReady } = useContext(AuthContext);

  return useQuery({
    queryKey: queryKeys.trips.all,
    queryFn: async () => {
      const response = await fetchTrips();
      const trips: Trip[] = response.data.trips;

      return trips;
    },
    enabled: isAuthReady,
  });
}
// Get single trip
export function useTrip(tripId: string | undefined) {
  const { data: trips, isLoading, error, isError, status } = useTrips();

  const trip = useMemo(
    () => (tripId ? trips?.find((t) => t.tripId === tripId) : undefined),
    [trips, tripId],
  );

  return {
    data: trip ? { message: 'Trip fetched successfully', trip } : undefined,
    isLoading,
    isError,
    error,
    status,
  };
}

// Create trip

export function useCreateTrip(onClose?: () => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<CreateTripResponse, Error, CreateTripData>({
    mutationFn: async (data) => {
      if (!data.location) {
        throw new Error('Location is required');
      }

      const formattedData = {
        days: data.days,
        location: data.location,
        startDate: data.startDate ? data.startDate.toISOString() : null,
        selectedCategories: data.selectedCategories,
      };

      const response = await createTrip(formattedData);
      return response.data;
    },
    onSuccess: (data) => {
      // Update trips cache
      queryClient.setQueryData<Trip[]>(queryKeys.trips.all, (oldTrips = []) => [
        ...oldTrips,
        data.trip,
      ]);

      // Handle navigation and cleanup
      if (data.trip.tripId) {
        onClose?.();
        navigate(`/trips/${data.trip.tripId}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error('Error creating trip:', error);
    },
  });

  return mutation;
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
