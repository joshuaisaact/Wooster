import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../useAppContext';
import { deleteTrip as apiDeleteTrip } from '@/services/apiService';
import { toast } from 'sonner';

export function useDeleteTrip() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const deleteTrip = async (tripId: string) => {
    if (!tripId) return;

    setIsLoading(true);
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiDeleteTrip(tripId);
      dispatch({ type: 'REMOVE_TRIP', payload: tripId });
      navigate('/trips');
      toast.success('Trip deleted successfully');
    } catch (error) {
      console.error('Error deleting trip:', error instanceof Error ? error.message : error);
      toast.error('Failed to delete trip');
    } finally {
      setIsLoading(false);
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { deleteTrip, isLoading };
}
