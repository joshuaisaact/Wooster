import { Activity } from './activities';
import { Destination } from './destinations';

export interface Trip {
  tripId: string;
  destination: Destination;
  numDays: number;
  startDate: string;
  itinerary: ItineraryItem[];
}

export interface CreateTripData {
  days: number;
  location: string;
  startDate: Date | null;
  selectedCategories?: string[];
}

export interface TripResponse {
  trip: Trip;
}

export interface TripsResponse {
  trips: Trip[];
}

export interface ItineraryItem {
  day: number;
  activities: Activity[];
}

export interface CreateTripParams {
  days: number;
  location: string;
  startDate: string | null;
  selectedCategories?: string[];
}
