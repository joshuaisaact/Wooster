import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchDestinations, saveDestination, unsaveDestination } from '@/services/apiService';
import { queryKeys } from './keys';
import { Destination } from '@/types/types';
import { toast } from 'sonner';

interface MutationContext {
  previousDestinations: Destination[] | undefined;
}

export function useSavedDestinations() {
  return useQuery({
    queryKey: queryKeys.destinations.saved(),
    queryFn: async () => {
      const response = await fetchDestinations();
      return response.data;
    },
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
