import { createContext, useEffect, useReducer, ReactNode, Dispatch, useContext } from 'react';
import { initialState, reducer } from '../store/reducer';
import { fetchAllDestinations, fetchDestinationActivities } from '@/services/apiService';
import { Action, State } from '@/types/types';
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

      // Fetch all data in parallel and extract the data property from Axios responses
      const [allDestinationsResponse] = await Promise.all([fetchAllDestinations()]);

      // Dispatch all data
      dispatch({ type: 'SET_ALL_DESTINATIONS', payload: allDestinationsResponse.data });
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

      const response = await fetchDestinationActivities(destinationName);
      dispatch({
        type: 'SET_ACTIVITIES',
        payload: {
          destinationName,
          activities: response.data,
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
