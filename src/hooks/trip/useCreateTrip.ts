import { useNavigate } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import { createTrip } from '@/services/apiService';
import { supabase } from '@/lib/supabase';
import { Trip } from '@/types/types';

interface CreateTripData {
  days: number;
  location: string;
  startDate: Date | undefined;
  selectedCategories: string[] | undefined;
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
      days: data.days,
      location: data.location,
      startDate: data.startDate ? data.startDate.toISOString() : null,
      selectedCategories: data.selectedCategories,
    };

    try {
      const result = await createTrip(supabase, formattedData);

      const newTrip: Trip = {
        tripId: result.trip.tripId,
        destination: result.trip.destination,
        numDays: result.trip.numDays,
        startDate: result.trip.startDate,
        itinerary: result.trip.itinerary || [],
      };

      dispatch({ type: 'ADD_TRIP', payload: newTrip });

      if (newTrip.tripId) {
        onClose?.();
        navigate(`/trips/${newTrip.tripId}`, { replace: true });
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
