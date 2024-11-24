import { useNavigate } from 'react-router-dom';
import { Trip, TripResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tripService } from '@/services';
import { queryKeys } from '@/lib/query/keys';

interface CreateTripData {
  days: number;
  location: string;
  startDate: Date | undefined;
  selectedCategories: string[] | undefined;
}

export function useCreateTrip(onClose?: () => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation<TripResponse, Error, CreateTripData>({
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

      const response = await tripService.create(formattedData);
      return response;
    },
    onSuccess: (data) => {
      // Update trips cache
      queryClient.setQueryData<Trip[]>(queryKeys.trips.all(), (oldTrips = []) => [
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
