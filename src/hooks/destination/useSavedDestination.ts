import { useAppContext } from '@/hooks/useAppContext';
import { saveDestination, unsaveDestination } from '@/services/apiService';
import { toast } from 'sonner';
import { Destination } from '@/types/types';

export function useSaveDestination() {
  const { state, dispatch } = useAppContext();

  const toggleSaveDestination = async (destination: Destination, e?: React.MouseEvent) => {
    e?.stopPropagation();

    const isSaved = state.savedDestinations.some(
      (d) => d.destinationId === destination.destinationId,
    );

    try {
      if (isSaved) {
        // Ensure we're passing a number
        dispatch({
          type: 'REMOVE_SAVED_DESTINATION',
          payload: destination.destinationId,
        });

        await unsaveDestination(destination.destinationId);
        toast.success('Removed from saved destinations');
      } else {
        dispatch({
          type: 'ADD_SAVED_DESTINATION',
          payload: destination,
        });

        await saveDestination(destination.destinationId);
        toast.success('Added to saved destinations');
      }
    } catch (error) {
      console.error('Error saving destination:', error);
      toast.error('Error saving destination');
      throw error;
    }
  };

  const isDestinationSaved = (destinationId: number) =>
    state.savedDestinations.some((d) => d.destinationId === destinationId);

  return {
    toggleSaveDestination,
    isDestinationSaved,
  };
}
