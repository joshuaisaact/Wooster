import { Destination, Trip as Triptype } from '@/types/types';

export type Action =
  | { type: 'SET_DESTINATIONS'; payload: Destination[] }
  | { type: 'SET_TRIPS'; payload: Triptype[] }
  | { type: 'ADD_TRIP'; payload: Triptype }
  | { type: 'REMOVE_TRIP'; payload: string }
  | { type: 'ADD_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_DESTINATION'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

export const initialState = {
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
        trips: state.trips.filter((trip: Triptype) => trip.trip_id !== action.payload),
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
