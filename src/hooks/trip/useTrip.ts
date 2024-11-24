import { useTrips } from './useTrips';

export function useTrip(tripId: string | undefined) {
  const { data: trips, isLoading, error, isError, status } = useTrips();

  const trip = tripId ? trips?.find((t) => t.tripId === tripId) : undefined;

  return {
    data: trip ? { message: 'Trip fetched successfully', trip } : undefined,
    isLoading,
    isError,
    error,
    status,
  };
}
