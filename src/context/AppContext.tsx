import { createContext, useEffect, useReducer, ReactNode, Dispatch } from 'react';
import { initialState, reducer } from '../store/reducer';
import { fetchTrips, fetchDestinations } from '@/services/apiService';
import { Action, State } from '@/types/types';
import { supabase } from '@/lib/supabase';

interface AppProviderProps {
  children: ReactNode; // Explicitly typing children as ReactNode
}

// Creating a context with the correct types for state and dispatch
export const AppContext = createContext<
  | {
      state: State;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

// Creating the provider component
export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function loadTripsAndDestinationsData() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch trips and dispatch the data
      const tripsData = await fetchTrips(supabase);
      dispatch({ type: 'SET_TRIPS', payload: tripsData });

      // Fetch destinations and dispatch the data
      const destinationsData = await fetchDestinations();
      dispatch({ type: 'SET_DESTINATIONS', payload: destinationsData });
    } catch (error) {
      console.error('Error loading trips or destinations:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  // useEffect to fetch the data once on application mount.
  useEffect(function () {
    loadTripsAndDestinationsData();
  }, []);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
