import { useAppContext } from '@/hooks/useAppContext';
import { createDestination } from '@/services/apiService';
import { supabase } from '@/lib/supabase';

interface CreateDestinationParams {
  destinationName: string;
}

export function useCreateDestination(onClose?: () => void) {
  const { dispatch } = useAppContext();

  const handleCreateDestination = async (params: CreateDestinationParams) => {
    console.log('Creating destination:', params); // Debug log

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const newDestination = await createDestination(supabase, params.destinationName);
      dispatch({ type: 'ADD_DESTINATION', payload: newDestination });
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
