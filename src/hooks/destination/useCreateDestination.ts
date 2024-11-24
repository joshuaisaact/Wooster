import { queryKeys } from '@/lib/query/keys';
import { destinationService } from '@/services';
import { Destination, DestinationResponse } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface CreateDestinationParams {
  destinationName: string;
}

export function useCreateDestination(onClose?: () => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const saveDestinationMutation = useMutation({
    mutationFn: destinationService.save,
  });

  return useMutation<DestinationResponse, Error, CreateDestinationParams>({
    mutationFn: async ({ destinationName }) => {
      const normalizedInput = destinationName.trim().toLowerCase().replace(/\s+/g, '-');

      // Check both caches
      const savedDestinations = queryClient.getQueryData<Destination[]>(
        queryKeys.destinations.saved(),
      );
      const allDestinations = queryClient.getQueryData<Destination[]>(queryKeys.destinations.all());

      // If it's in saved, we don't need to do anything
      const existingInSaved = savedDestinations?.find(
        (dest) => dest.normalizedName === normalizedInput,
      );
      if (existingInSaved) {
        throw new Error('You have already saved this destination');
      }

      // If it exists but isn't saved, save it
      const existingInAll = allDestinations?.find(
        (dest) => dest.normalizedName === normalizedInput,
      );
      if (existingInAll) {
        await saveDestinationMutation.mutateAsync(existingInAll.destinationId);

        // Update saved destinations cache
        queryClient.setQueryData<Destination[]>(queryKeys.destinations.saved(), (old = []) => [
          ...old,
          existingInAll,
        ]);

        // Return a response that matches the expected type
        return {
          message: 'Destination saved successfully',
          destination: existingInAll,
        };
      }

      // If it doesn't exist anywhere, create it
      try {
        const response = await destinationService.create(destinationName);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data;

          switch (errorData?.code) {
            case 'DESTINATION_REQUIRED':
              throw new Error('Please enter a destination name');

            case 'DESTINATION_ALREADY_SAVED':
              // This shouldn't happen now since we check cache first
              throw new Error('You have already saved this destination');

            case 'GENERATION_FAILED':
              throw new Error(
                'Unable to generate destination information. This might be due to an invalid location name or temporary service issues. Please try again.',
              );

            default:
              throw new Error(errorData?.error || 'Failed to create destination');
          }
        }
        throw error;
      }
    },
    onError: (error) => {
      console.error('Destination creation failed:', error);
    },
    onSuccess: (data) => {
      const newDestination = data.destination;

      // Only update all destinations cache if it's a new destination
      const allDestinations = queryClient.getQueryData<Destination[]>(queryKeys.destinations.all());
      if (!allDestinations?.some((d) => d.destinationId === newDestination.destinationId)) {
        queryClient.setQueryData<Destination[]>(queryKeys.destinations.all(), (oldDests = []) => [
          ...oldDests,
          newDestination,
        ]);
      }

      onClose?.();
      navigate(`/destinations/${newDestination.destinationName}`);
    },
  });
}
