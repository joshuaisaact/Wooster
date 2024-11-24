import { queryKeys } from '@/lib/query/keys';
import { destinationService } from '@/services';
import { Destination } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export function useDeleteDestination() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (destinationId: number) => {
      if (!destinationId) {
        throw new Error('Invalid destination ID');
      }
      return destinationService.delete(destinationId);
    },

    onMutate: async (destinationId) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.destinations.all() });
      await queryClient.cancelQueries({ queryKey: queryKeys.destinations.saved() });

      // Snapshot current data
      const previousAllDestinations = queryClient.getQueryData<Destination[]>(
        queryKeys.destinations.all(),
      );
      const previousSavedDestinations = queryClient.getQueryData<Destination[]>(
        queryKeys.destinations.saved(),
      );

      // Optimistically update both lists
      if (previousAllDestinations) {
        queryClient.setQueryData<Destination[]>(
          queryKeys.destinations.all(),
          previousAllDestinations.filter((dest) => dest.destinationId !== destinationId),
        );
      }

      if (previousSavedDestinations) {
        queryClient.setQueryData<Destination[]>(
          queryKeys.destinations.saved(),
          previousSavedDestinations.filter((dest) => dest.destinationId !== destinationId),
        );
      }

      return { previousAllDestinations, previousSavedDestinations };
    },

    onError: (_error, _destinationId, context) => {
      // Rollback on error
      if (context?.previousAllDestinations) {
        queryClient.setQueryData(queryKeys.destinations.all(), context.previousAllDestinations);
      }
      if (context?.previousSavedDestinations) {
        queryClient.setQueryData(queryKeys.destinations.saved(), context.previousSavedDestinations);
      }
      toast.error('Failed to delete destination');
    },

    onSuccess: () => {
      toast.success('Destination deleted successfully');
      navigate('/destination-list');
    },
  });

  return mutation;
}
