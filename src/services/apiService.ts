import { api } from '@/lib/axios';

// Destinations endpoints
export const fetchAllDestinations = () => {
  return api.get('/destinations');
};

export const fetchDestinationActivities = (destinationName: string) => {
  return api.get(`/destination/${encodeURIComponent(destinationName)}/activities`);
};

export const createDestination = (destinationName: string) => {
  return api.post('/destinations', { destination: destinationName });
};

// Trips endpoints
export const fetchTrips = () => {
  return api.get('/trips');
};

export const fetchTrip = (tripId: string) => {
  return api.get(`/trips/${tripId}`);
};

export const createTrip = (tripData: {
  days: number;
  location: string;
  startDate: string | null;
  selectedCategories?: string[];
}) => {
  return api.post('/trips', tripData);
};

export const deleteTrip = (tripId: string) => {
  return api.delete(`/trips/${tripId}`);
};
