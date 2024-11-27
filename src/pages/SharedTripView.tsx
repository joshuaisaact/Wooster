import { PublicLayout } from '@/components/layout/PublicLayout';
import { TripView } from '@/components/trip/TripView';
import { tripService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export function SharedTripView() {
  const { shareCode } = useParams();
  const { data: sharedTripResponse, isLoading } = useQuery({
    queryKey: ['shared-trip', shareCode],
    queryFn: () => tripService.getSharedTrip(shareCode!),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">Loading shared trip...</div>
      </div>
    );
  }

  if (!sharedTripResponse?.trip) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-xl bg-white/70 p-8 text-center shadow-lg dark:bg-green-800/30">
          <h2 className="text-xl font-semibold">Trip Not Found</h2>
          <p className="mt-2 text-gray-600 dark:text-green-100/70">
            This shared trip link may have expired or been removed.
          </p>
        </div>
      </div>
    );
  }

  const trip = sharedTripResponse.trip;

  return (
    <PublicLayout>
      <div className="space-y-6">
        <div className="rounded-lg bg-white/80 p-4 text-center shadow-sm dark:bg-green-800/30">
          <p className="text-sm text-muted-foreground">
            Viewing a shared trip from{' '}
            <Link
              to="/"
              className="font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
            >
              Wooster AI Travel
            </Link>
          </p>
        </div>
        <TripView trip={trip} destination={trip.destination} isSharedView />
      </div>
    </PublicLayout>
  );
}
