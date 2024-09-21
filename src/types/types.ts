export interface Trip {
  id: string;
  destination: string;
  num_days: number;
  date: string;
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
}
