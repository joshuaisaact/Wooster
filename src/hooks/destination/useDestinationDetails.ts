import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query/keys';
import { destinationService } from '@/services';
import { useAllDestinations } from './useAllDestinations';

export function useDestinationDetails(destinationName: string | undefined) {
  // Get all destinations
  const { data: allDestinations = [], isLoading: isLoadingDestinations } = useAllDestinations();

  // Find the specific destination
  const destination = destinationName
    ? allDestinations.find((dest) => dest.destinationName === destinationName)
    : undefined;

  // Fetch activities for the destination
  const activitiesQuery = useQuery({
    queryKey: queryKeys.destinations.activities(destinationName || ''),
    queryFn: async () => {
      if (!destinationName) return [];
      const response = await destinationService.getActivities(destinationName);
      return response.activities;
    },
    enabled: !!destinationName,
  });

  return {
    destination,
    destinationActivities: activitiesQuery.data || [],
    isLoadingActivities: activitiesQuery.isLoading,
    isLoading: isLoadingDestinations, // Only show loading for initial destination fetch
    isError: !destination || activitiesQuery.isError,
    error: activitiesQuery.error,
  };
}
