import { Action, State, Trip as TripType } from '@/types/types';

export const initialState: State = {
  isLoading: false,
  trips: [],
  savedDestinations: [],
  allDestinations: [],
  activities: {},
  pageAnimationStates: {
    dashboard: false,
    trips: false,
    destinations: false,
    explore: false,
  },
};

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'SET_SAVED_DESTINATIONS':
      return { ...state, savedDestinations: action.payload };
    case 'SET_ALL_DESTINATIONS':
      return { ...state, allDestinations: action.payload };
    case 'SET_TRIPS':
      return {
        ...state,
        trips: action.payload,
      };
    case 'SET_ACTIVITIES':
      return {
        ...state,
        activities: {
          ...state.activities,
          [action.payload.destinationName]: action.payload.activities,
        },
      };
    case 'CLEAR_ACTIVITIES':
      return {
        ...state,
        activities: {},
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
    case 'ADD_SAVED_DESTINATION':
      return {
        ...state,
        savedDestinations: [...state.savedDestinations, action.payload],
      };
    case 'REMOVE_SAVED_DESTINATION':
      return {
        ...state,
        savedDestinations: state.savedDestinations.filter(
          (destination) => destination.destinationId !== action.payload,
        ),
      };
    case 'ADD_NEW_DESTINATION':
      return {
        ...state,
        allDestinations: [...state.allDestinations, action.payload],
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
    case 'RESET_STATE':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}
