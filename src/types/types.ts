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
  activity_name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  price: string;
}
