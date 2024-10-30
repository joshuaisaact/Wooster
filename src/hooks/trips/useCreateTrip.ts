import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import { createTrip } from '@/services/apiService';

interface CreateTripData {
  days: number;
  location: string;
  startDate: Date | undefined;
}

export function useCreateTrip(onClose?: () => void) {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const handleCreateTrip = async (data: CreateTripData) => {
    if (!data.location) {
      throw new Error('Location is required');
    }

    dispatch({ type: 'SET_LOADING', payload: true });

    const formattedData = {
      userId: 'e92ad976-973d-406d-92d4-34b6ef182e1a', // TODO: Replace with auth
      days: data.days,
      location: data.location,
      start_date: data.startDate ? data.startDate.toISOString() : null,
      itinerary: [],
    };

    try {
      const result = await createTrip(formattedData);
      dispatch({ type: 'ADD_TRIP', payload: result.trip });

      if (result.trip?.tripId) {
        onClose?.();
        navigate(`/trips/${result.trip.tripId}`);
      }
    } catch (error) {
      console.error('Error creating trip:', error);
      throw error;
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return { handleCreateTrip };
}
