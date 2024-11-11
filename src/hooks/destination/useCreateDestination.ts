import { useAppContext } from '@/hooks/useAppContext';
import { createDestination } from '@/services/apiService';

interface CreateDestinationParams {
  destinationName: string;
}

export function useCreateDestination(onClose?: () => void) {
  const { dispatch } = useAppContext();

  const handleCreateDestination = async (params: CreateDestinationParams) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const response = await createDestination(params.destinationName);
      const newDestination = response.data;
      dispatch({ type: 'ADD_NEW_DESTINATION', payload: newDestination });
      onClose?.();
      return newDestination;
    } catch (error) {
      console.error('Error creating destination:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return {
    handleCreateDestination,
  };
}
