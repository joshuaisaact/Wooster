import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../useAppContext';
import { deleteDestination as apiDeleteDestination } from '@/services/apiService';
import { toast } from 'sonner';

export function useDeleteDestination() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deleteDestination = async (destinationId: number) => {
    if (!destinationId) {
      console.error('No destination ID found');
      toast.error('Invalid destination ID');
      return;
    }

    setIsLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiDeleteDestination(destinationId);
      dispatch({ type: 'REMOVE_DESTINATION', payload: destinationId });
      navigate('/destination-list');
      toast.success('Destination deleted successfully');
    } catch (error) {
      console.error('Error deleting destination:', error instanceof Error ? error.message : error);
      toast.error('Failed to delete destination');
    } finally {
      setIsLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { deleteDestination, isLoading };
}
