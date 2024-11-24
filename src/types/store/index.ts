import { Activity } from '../api/activities';
import { Destination } from '../api/destinations';
import { Trip } from '../api/trips';

export interface State {
  trips: Trip[];
  savedDestinations: Destination[];
  allDestinations: Destination[];
  activities: {
    [destinationName: string]: Activity[];
  };
  isLoading: boolean;
  pageAnimationStates: {
    dashboard: boolean;
    trips: boolean;
    destinations: boolean;
    explore: boolean;
  };
}

export type Action =
  | { type: 'SET_SAVED_DESTINATIONS'; payload: Destination[] }
  | { type: 'SET_ALL_DESTINATIONS'; payload: Destination[] }
  | { type: 'SET_TRIPS'; payload: Trip[] }
  | { type: 'ADD_TRIP'; payload: Trip }
  | { type: 'REMOVE_TRIP'; payload: string }
  | { type: 'REMOVE_SAVED_DESTINATION'; payload: number }
  | { type: 'ADD_NEW_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_DESTINATION'; payload: number }
  | { type: 'ADD_SAVED_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_SAVED_DESTINATION'; payload: string }
  | { type: 'SET_ACTIVITIES'; payload: { destinationName: string; activities: Activity[] } }
  | { type: 'CLEAR_ACTIVITIES' }
  | { type: 'SET_LOADING'; payload: boolean }
  | {
      type: 'SET_PAGE_ANIMATED';
      payload: {
        page: keyof State['pageAnimationStates'];
        hasAnimated: boolean;
      };
    }
  | { type: 'RESET_ANIMATIONS' }
  | { type: 'RESET_STATE' };
