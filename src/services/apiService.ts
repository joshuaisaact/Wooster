import { api } from '@/lib/axios';

// Destinations endpoints
export const fetchDestinations = () => {
  return api.get('/saved-destinations');
};

export const fetchAllDestinations = () => {
  return api.get('/destinations');
};

export const fetchDestinationActivities = (destinationName: string) => {
  return api.get(`/destination/${encodeURIComponent(destinationName)}/activities`);
};

export const saveDestination = (destinationId: number) => {
  return api.post(`/saved-destinations/${destinationId}`);
};

export const unsaveDestination = (destinationId: number) => {
  return api.delete(`/saved-destinations/${destinationId}`);
};

export const createDestination = (destinationName: string) => {
  return api.post('/destinations', { destination: destinationName });
};

export const deleteDestination = (destinationId: number) => {
  return api.delete(`/destinations/${destinationId}`);
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
