import { useState } from 'react';
import { Trip } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { fetchTrip } from '@/services/apiService';
import { useAppContext } from '../useAppContext';

export function useTripData(tripId: string | undefined, trips: Trip[]) {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // If we don't have a tripId, return early
  if (!tripId) {
    return { trip: undefined, destination: null, isLoading: false, error: null };
  }

  // First try to find the trip in the existing trips array
  const tripFromState = trips.find((t) => t.tripId === tripId);

  // If we don't have the trip in state and aren't already loading AND haven't marked it as not found
  if (!tripFromState?.destination && !isLoading && !notFound && !error) {
    setIsLoading(true);
    fetchTrip(supabase, tripId)
      .then((tripData) => {
        if (!tripData) {
          setNotFound(true);
        } else {
          dispatch({ type: 'ADD_TRIP', payload: tripData });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching trip:', err);
        setError(err instanceof Error ? err.message : 'Failed to load trip');
        setIsLoading(false);
      });
  }

  return {
    trip: tripFromState,
    destination: tripFromState?.destination ?? null,
    isLoading,
    error,
    notFound: notFound || (!!error && error.includes('not found')), // include API not found errors
  };
}
