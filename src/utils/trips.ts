import { Trip } from '@/types/types';

export const getSoonestTrip = (trips: Trip[]): Trip | null => {
  const today = new Date();
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return upcomingTrips[0] || null;
};
