import { useEffect, useState } from 'react';
import { Trip } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { fetchTrip } from '@/services/apiService';
import { useAppContext } from '../useAppContext';

export function useTripData(tripId: string | undefined, trips: Trip[]) {
  const { dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // First try to find the trip in the existing trips array
  const tripFromState = tripId ? trips.find((t) => t.tripId === tripId) : undefined;

  console.log('useTripData state:', {
    tripId,
    tripFromState,
    isLoading,
    tripsLength: trips.length,
  });

  useEffect(() => {
    async function loadTrip() {
      if (!tripId || tripFromState?.destination) {
        console.log('Skipping fetch:', { tripId, hasDestination: !!tripFromState?.destination });
        return;
      }

      console.log('Starting fetch for tripId:', tripId);
      setIsLoading(true);
      setError(null);

      try {
        const tripData = await fetchTrip(supabase, tripId);
        console.log('Fetched trip data:', tripData);

        dispatch({ type: 'ADD_TRIP', payload: tripData });
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching trip:', err);
        setError(err instanceof Error ? err.message : 'Failed to load trip');
        setIsLoading(false);
      }
    }

    loadTrip();
  }, [tripId, tripFromState, dispatch]);

  // Add some defensive checks
  if (!tripId) {
    console.log('No tripId provided');
    return { trip: undefined, destination: null, isLoading, error };
  }

  if (isLoading) {
    console.log('Currently loading trip data');
    return { trip: undefined, destination: null, isLoading, error };
  }

  if (error) {
    console.log('Error in trip data:', error);
    return { trip: undefined, destination: null, isLoading, error };
  }

  console.log('Returning trip data:', tripFromState);

  return {
    trip: tripFromState,
    destination: tripFromState?.destination ?? null,
    isLoading,
    error,
  };
}
