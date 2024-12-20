import { Trip } from '@/types';

export const getSoonestTrip = (trips: Trip[]): Trip | null => {
  const today = new Date();
  const upcomingTrips = trips
    .filter((trip) => new Date(trip.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  return upcomingTrips[0] || null;
};

export function sortTripsByDate(trips: Trip[]): Trip[] {
  return [...trips].sort((a, b) => {
    const dateA = new Date(a.startDate).getTime();
    const dateB = new Date(b.startDate).getTime();
    return dateA - dateB;
  });
}

export function filterTripsByStatus(trips: Trip[]): {
  upcomingTrips: Trip[];
  pastTrips: Trip[];
} {
  const now = new Date();

  return {
    upcomingTrips: trips.filter((trip) => new Date(trip.startDate) >= now),
    pastTrips: trips.filter((trip) => new Date(trip.startDate) < now),
  };
}

export function searchTrips(trips: Trip[], searchQuery: string): Trip[] {
  if (!searchQuery.trim()) return trips;

  const searchLower = searchQuery.toLowerCase();

  return trips.filter((trip) => {
    if (!trip) return false;

    const destination = trip.destination || {};
    const title = trip.title || '';
    const destinationName = destination.destinationName || '';
    const country = destination.country || '';
    const startDate = trip.startDate ? new Date(trip.startDate).toLocaleDateString() : '';

    return (
      destinationName.toLowerCase().includes(searchLower) ||
      title.toLowerCase().includes(searchLower) ||
      country.toLowerCase().includes(searchLower) ||
      startDate.toLowerCase().includes(searchLower)
    );
  });
}
