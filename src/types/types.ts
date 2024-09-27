export interface Trip {
  trip_id: string;
  destination_name: string;
  num_days: number;
  start_date: string;
  itinerary: ItineraryItem[];
}

export interface ActivityProps {
  name: string;
  description: string;
  location: string;
  price: string;
}

export interface ItineraryItem {
  day: number;
  activities: ActivityProps[];
}

export interface Destination {
  destination_id: number;
  destination_name: string;
  latitude: number;
  longitude: number;
  description: string;
  country: string;
  created_at: string;
  best_time_to_visit: string;
  average_temperature_low: string;
  average_temperature_high: string;
  popular_activities: string;
  travel_tips: string;
  nearby_attractions: string;
  transportation_options: string;
  accessibility_info: string;
  official_language: string;
  currency: string;
  local_cuisine: string;
  cost_level: string;
  safety_rating: string;
  cultural_significance: string;
}

export interface Activity {
  activity_id: number;
  activity_name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
}

// State type
export interface State {
  trips: Trip[];
  destinations: Destination[];
  isLoading: boolean;
  globeInstance: object | null;
  points: { lat: number; lng: number; name: string }[];
}

// Reducer Action types
export type Action =
  | { type: 'SET_DESTINATIONS'; payload: Destination[] }
  | { type: 'SET_TRIPS'; payload: Trip[] }
  | { type: 'ADD_TRIP'; payload: Trip }
  | { type: 'REMOVE_TRIP'; payload: string }
  | { type: 'ADD_DESTINATION'; payload: Destination }
  | { type: 'REMOVE_DESTINATION'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_GLOBE_INSTANCE'; payload: object | null } // New action for setting globe instance
  | { type: 'SET_POINTS'; payload: { lat: number; lng: number; name: string }[] }; // New action for points
