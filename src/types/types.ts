export interface Trip {
  tripId: string;
  destinationName: string;
  numDays: number;
  startDate: string;
  itinerary: ItineraryItem[];
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
}

// State type
export interface State {
  trips: Trip[];
  destinations: Destination[];
  isLoading: boolean;
}

// Reducer Action types
export type Action =
  | { type: 'SET_DESTINATIONS'; payload: Destination[] }
  | { type: 'SET_TRIPS'; payload: Trip[] }
  | { type: 'ADD_TRIP'; payload: Trip }
  | { type: 'REMOVE_TRIP'; payload: string }
  | { type: 'ADD_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_DESTINATION'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean };

export type SortOption = 'name' | 'costLevel' | 'safetyRating';
