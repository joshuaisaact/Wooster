import { createContext, useEffect, useReducer, ReactNode, Dispatch, useContext } from 'react';
import { initialState, reducer } from '../store/reducer';
import { fetchTrips, fetchDestinations } from '@/services/apiService';
import { Action, State } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext'; // Import AuthContext

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<
  | {
      state: State;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  const auth = useContext(AuthContext); // Get auth context
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    ...initialState,
    pageAnimationStates: {
      dashboard: false,
      trips: false,
      destinations: false,
      explore: false,
    },
  });

  async function loadTripsAndDestinationsData() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch trips and dispatch the data
      const tripsData = await fetchTrips(supabase);
      dispatch({ type: 'SET_TRIPS', payload: tripsData });

      // Fetch destinations and dispatch the data
      const destinationsData = await fetchDestinations(supabase);
      dispatch({ type: 'SET_DESTINATIONS', payload: destinationsData });
    } catch (error) {
      console.error('Error loading trips or destinations:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (auth?.session) {
      loadTripsAndDestinationsData();
    }
  }, [auth?.session]); // Add auth.session as dependency

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}
