export interface Trip {
  tripId: string;
  destination: Destination;
  numDays: number;
  startDate: string;
  itinerary: ItineraryItem[];
}

export interface TripResponse {
  message: string;
  trip: Trip;
}

export interface CreateTripData {
  days: number;
  location: string;
  startDate: Date | null;
  selectedCategories?: string[];
}

export interface CreateTripResponse {
  message: string;
  trip: Trip;
}

export interface CreateDestinationParams {
  destinationName: string;
}

export interface CreateDestinationResponse {
  message: string;
  destination: Destination;
}

export type TripTab = 'summary' | number;

export interface ActivityProps {
  name: string;
  description: string;
  location: string;
  price: string;
}

export interface ItineraryItem {
  day: number;
  activities: Activity[];
}

export interface Destination {
  destinationId: number;
  destinationName: string;
  latitude: number;
  longitude: number;
  description: string;
  country: string;
  created_at: string;
  bestTimeToVisit: string;
  averageTemperatureLow: string;
  averageTemperatureHigh: string;
  popularActivities: string;
  travelTips: string;
  normalizedName: string;
  nearbyAttractions: string;
  transportationOptions: string;
  accessibilityInfo: string;
  officialLanguage: string;
  currency: string;
  localCuisine: string;
  costLevel: string;
  safetyRating: string;
  culturalSignificance: string;
}

export interface Activity {
  activityId: number;
  activityName: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  startTime: string;
  endTime: string;
  category: string;
  price: string;
  duration: string;
  difficulty: string;
  bestTime: string;
}

// State type
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

// Reducer Action types
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

export type SortOption = 'name' | 'costLevel' | 'safetyRating';
