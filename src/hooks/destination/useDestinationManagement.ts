import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../useAppContext';
import { deleteTrip as apiDeleteTrip } from '@/services/apiService';

export function useTripManagement() {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const deleteTrip = async (tripId: string) => {
    if (!tripId) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      await apiDeleteTrip(tripId);
      dispatch({ type: 'REMOVE_TRIP', payload: tripId });
      navigate('/trips');
    } catch (error) {
      console.error('Error deleting trip:', error instanceof Error ? error.message : error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { deleteTrip };
}
