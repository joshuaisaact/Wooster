import { useAppContext } from '@/hooks/useAppContext';
import { createDestination } from '@/services/apiService';
import axios from 'axios';

interface CreateDestinationParams {
  destinationName: string;
}

export function useCreateDestination(onClose?: () => void) {
  const { dispatch, state } = useAppContext();

  const handleCreateDestination = async (params: CreateDestinationParams) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Use the same normalization logic as your backend
      const normalizedInput = params.destinationName.trim().toLowerCase().replace(/\s+/g, '-');

      // Check if destination exists in current state using normalizedName field
      const existingInState = state.savedDestinations?.find(
        (dest) => dest.normalizedName === normalizedInput,
      );

      if (existingInState) {
        throw new Error('You have already saved this destination');
      }

      const response = await createDestination(params.destinationName);
      const newDestination = response.data.destination;
      dispatch({ type: 'ADD_NEW_DESTINATION', payload: newDestination });
      onClose?.();
      return newDestination;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          throw new Error('This destination already exists in our database');
        }
        throw new Error(error.response?.data?.error || 'Failed to create destination');
      }
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    handleCreateDestination,
  };
}
