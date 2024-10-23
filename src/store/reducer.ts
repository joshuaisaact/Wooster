import { Action, Destination, State, Trip as Triptype } from '@/types/types';

export const initialState: State = {
  destinations: [] as Destination[],
  trips: [] as Triptype[],
  isLoading: false,
};

export function reducer(state: typeof initialState = initialState, action: Action) {
  switch (action.type) {
    case 'SET_DESTINATIONS':
      return {
        ...state,
        destinations: action.payload,
      };
    case 'SET_TRIPS':
      return {
        ...state,
        trips: action.payload,
      };
    case 'ADD_TRIP':
      return {
        ...state,
        trips: [...state.trips, action.payload],
      };
    case 'REMOVE_TRIP':
      return {
        ...state,
        trips: state.trips.filter((trip: Triptype) => trip.tripId !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'ADD_DESTINATION':
      return {
        ...state,
        destinations: [...state.destinations, action.payload],
      };
    default:
      return state;
  }
}
