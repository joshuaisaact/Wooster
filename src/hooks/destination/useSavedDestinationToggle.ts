import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSavedDestinations } from './useSavedDestinations';
import { Destination } from '@/types';
import { destinationService } from '@/services';
import { queryKeys } from '@/lib/query/keys';
import { toast } from 'sonner';

export function useSaveDestinationToggle() {
  const { data: savedDestinations = [] } = useSavedDestinations();
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: async ({
      destination,
      isSaved,
    }: {
      destination: Destination;
      isSaved: boolean;
    }) => {
      if (isSaved) {
        await destinationService.unsave(destination.destinationId);
      } else {
        await destinationService.save(destination.destinationId);
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
    onError: (_err, _variables, context) => {
      if (context?.previousDestinations) {
        queryClient.setQueryData(queryKeys.destinations.saved(), context.previousDestinations);
      }
      toast.error('Failed to update saved destinations');
    },
    onSuccess: (_data, { isSaved }) => {
      toast.success(isSaved ? 'Destination removed from saved' : 'Destination saved successfully');
    },
  });

  const toggleSaveDestination = async (destination: Destination, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const isSaved = savedDestinations.some(
      (savedDest) => savedDest.destinationId === destination.destinationId,
    );

    await toggleMutation.mutateAsync({ destination, isSaved });
  };

  return {
    toggleSaveDestination,
    isDestinationSaved: (id: number) =>
      savedDestinations.some((savedDest) => savedDest.destinationId === id),
    isPending: toggleMutation.isPending,
    savedDestinations,
  };
}
