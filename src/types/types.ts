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
