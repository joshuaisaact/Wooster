import { Trip, Destination } from '@/types/types';

export function useTripData(
  tripId: string | undefined,
  trips: Trip[],
  destinations: Destination[],
) {
  const trip = trips.find((t) => t.tripId === tripId);
  const destination = destinations.find((d) => d.destinationName === trip?.destinationName);
  return { trip, destination };
}

export function useShare() {
  const shareTrip = async (destinationName: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out my trip to ${destinationName}!`,
          url,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard');
    }
  };

  return { shareTrip };
}
