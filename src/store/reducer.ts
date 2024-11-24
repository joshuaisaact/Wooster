import { Action, State } from '@/types';

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
    case 'SET_ALL_DESTINATIONS':
      return { ...state, allDestinations: action.payload };
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
    case 'RESET_STATE':
      return {
        ...initialState,
        isLoading: false,
      };
    default:
      return state;
  }
}
