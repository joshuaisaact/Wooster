import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createDestination,
  fetchDestinations,
  saveDestination,
  unsaveDestination,
} from '@/services/apiService';
import { queryKeys } from './keys';
import { CreateDestinationParams, CreateDestinationResponse, Destination } from '@/types/types';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

interface MutationContext {
  previousDestinations: Destination[] | undefined;
}

interface ErrorResponse {
  error: string;
  code?: string;
  details?: string;
}

export function useSavedDestinations() {
  const { isAuthReady } = useContext(AuthContext);

  return useQuery({
    queryKey: queryKeys.destinations.saved(),
    queryFn: async () => {
      const response = await fetchDestinations();
      return response.data.savedDestinations;
    },
    enabled: isAuthReady,
  });
}

export function useToggleSaveDestination() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      destination,
      isSaved,
    }: {
      destination: Destination;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        await unsaveDestination(destination.destinationId);
      } else {
        await saveDestination(destination.destinationId);
      }
    },
    onMutate: async ({ destination, isSaved }) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.destinations.saved(),
      });

      const previousDestinations = queryClient.getQueryData<Destination[]>(
        queryKeys.destinations.saved(),
      );

      if (previousDestinations) {
        queryClient.setQueryData<Destination[]>(
          queryKeys.destinations.saved(),
          isSaved
            ? previousDestinations.filter((d) => d.destinationId !== destination.destinationId)
            : [...previousDestinations, destination],
        );
      }

      return { previousDestinations };
    },
    onError: (_err, _variables, context: MutationContext | undefined) => {
      if (context?.previousDestinations) {
        queryClient.setQueryData(queryKeys.destinations.saved(), context.previousDestinations);
      }
      toast.error('Failed to update saved destinations');
    },
    onSuccess: (_data, { isSaved }) => {
      toast.success(isSaved ? 'Destination removed from saved' : 'Destination saved successfully');
    },
  });
}

export function useSaveDestinationActions() {
  const { data: savedDestinations = [] } = useSavedDestinations();
  const toggleMutation = useToggleSaveDestination();

  const toggleSaveDestination = async (destination: Destination, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const isSaved = savedDestinations.some(
      (savedDest: Destination) => savedDest.destinationId === destination.destinationId,
    );

    try {
      await toggleMutation.mutateAsync({ destination, isSaved });
    } catch (error) {
      console.error('Error toggling destination save:', error);
      throw error;
    }
  };

  return {
    toggleSaveDestination,
    isDestinationSaved: (id: number) =>
      savedDestinations.some((savedDest: Destination) => savedDest.destinationId === id),
    isPending: toggleMutation.isPending,
    savedDestinations,
  };
}

export function useCreateDestination(onClose?: () => void) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<CreateDestinationResponse, Error, CreateDestinationParams>({
    mutationFn: async ({ destinationName }) => {
      const normalizedInput = destinationName.trim().toLowerCase().replace(/\s+/g, '-');

      // Check if destination exists in current state using normalizedName field
      const savedDestinations = queryClient.getQueryData<Destination[]>(
        queryKeys.destinations.saved(),
      );

      const existingInState = savedDestinations?.find(
        (dest) => dest.normalizedName === normalizedInput,
      );

      if (existingInState) {
        throw new Error('You have already saved this destination');
      }

      try {
        const response = await createDestination(destinationName);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const errorData = error.response?.data as ErrorResponse;

          switch (errorData?.code) {
            case 'DESTINATION_REQUIRED':
              throw new Error('Please enter a destination name');

            case 'DESTINATION_ALREADY_SAVED':
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
      // Update destinations cache
      queryClient.setQueryData<Destination[]>(queryKeys.destinations.all, (old = []) => [
        ...old,
        data.destination,
      ]);

      onClose?.();
      navigate(`/destinations/${data.destination.destinationName}`);
    },
  });
}
