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
      const newDestination = await createDestination(params.destinationName);
      dispatch({ type: 'ADD_DESTINATION', payload: newDestination });
      onClose?.();
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