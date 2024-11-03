import { Action, State, Trip as TripType } from '@/types/types';

export const initialState: State = {
  destinations: [],
  trips: [],
  isLoading: false,
  pageAnimationStates: {
    dashboard: false,
    trips: false,
    destinations: false,
    explore: false,
  },
};

export function reducer(state: State = initialState, action: Action): State {
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
        trips: state.trips.filter((trip: TripType) => trip.tripId !== action.payload),
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_PAGE_ANIMATED':
      return {
        ...state,
        pageAnimationStates: {
          ...state.pageAnimationStates,
          [action.payload.page]: action.payload.hasAnimated,
        },
      };
    case 'RESET_ANIMATIONS':
      return {
        ...state,
        pageAnimationStates: {
          dashboard: false,
          trips: false,
          destinations: false,
          explore: false,
        },
      };
    default:
      return state;
  }
}
