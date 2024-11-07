import { createContext, useEffect, useReducer, ReactNode, Dispatch, useContext } from 'react';
import { initialState, reducer } from '../store/reducer';
import {
  fetchTrips,
  fetchDestinations,
  fetchAllDestinations,
  fetchDestinationActivities,
} from '@/services/apiService';
import { Action, State } from '@/types/types';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './AuthContext';

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<
  | {
      state: State;
      dispatch: Dispatch<Action>;
      loadDestinationActivities: (destinationName: string) => Promise<void>;
    }
  | undefined
>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  const auth = useContext(AuthContext);
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
    ...initialState,
    pageAnimationStates: {
      dashboard: false,
      trips: false,
      destinations: false,
      explore: false,
    },
  });

  async function loadInitialData() {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch all data in parallel
      const [tripsData, savedDestinationsData, allDestinationsData] = await Promise.all([
        fetchTrips(supabase),
        fetchDestinations(supabase),
        fetchAllDestinations(supabase),
      ]);

      // Dispatch all data
      dispatch({ type: 'SET_TRIPS', payload: tripsData });
      dispatch({ type: 'SET_SAVED_DESTINATIONS', payload: savedDestinationsData });
      dispatch({ type: 'SET_ALL_DESTINATIONS', payload: allDestinationsData });
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  const loadDestinationActivities = async (destinationName: string) => {
    try {
      // Check if we already have the activities for this destination
      if (state.activities?.[destinationName]) {
        return;
      }

      dispatch({ type: 'SET_LOADING', payload: true });

      const activities = await fetchDestinationActivities(supabase, destinationName);
      dispatch({
        type: 'SET_ACTIVITIES',
        payload: {
          destinationName,
          activities: activities,
        },
      });
    } catch (error) {
      console.error(`Error loading activities for ${destinationName}:`, error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Load all data when user is authenticated
  useEffect(() => {
    if (auth?.session) {
      loadInitialData();
    }
  }, [auth?.session]);

  return (
    <AppContext.Provider value={{ state, dispatch, loadDestinationActivities }}>
      {children}
    </AppContext.Provider>
  );
}
