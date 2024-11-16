import { useParams, useNavigate } from 'react-router-dom';
import { TripView } from '@/components/trip/TripView';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';
import { useTrip } from '@/lib/query/trips';

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const navigate = useNavigate();

  const { data: trip, isLoading, isError, error } = useTrip(tripId);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="animate-pulse text-base text-muted-foreground sm:text-lg">
          Loading trip details...
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:space-y-4 sm:rounded-xl sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/50 sm:h-12 sm:w-12">
              <MapPinIcon className="h-5 w-5 text-red-500 sm:h-6 sm:w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white/95 sm:text-xl">
              Error Loading Trip
            </h2>
            <p className="max-w-md text-center text-sm text-gray-600 dark:text-green-100/70 sm:text-base">
              {error instanceof Error ? error.message : 'Failed to load trip details'}
            </p>
            <Button
              onClick={() => navigate('/trips')}
              className="mt-2 bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 sm:mt-4"
            >
              View All Trips
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Trip not found state
  if (!trip) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-8">
          <div className="flex flex-col items-center justify-center space-y-3 rounded-lg bg-white/70 p-4 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20 sm:space-y-4 sm:rounded-xl sm:p-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/50 sm:h-12 sm:w-12">
              <MapPinIcon className="h-5 w-5 text-red-500 sm:h-6 sm:w-6" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white/95 sm:text-xl">
              Trip Not Found
            </h2>
            <p className="max-w-md text-center text-sm text-gray-600 dark:text-green-100/70 sm:text-base">
              We couldn't find the trip you're looking for. It may have been removed or you may have
              used an invalid link.
            </p>
            <Button
              onClick={() => navigate('/trips')}
              className="mt-2 bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 sm:mt-4"
            >
              View All Trips
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main content for valid trip
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-6 md:py-8">
        {/* Header */}
        <div className="sm:mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="px-2 py-1 text-sm text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-green-400 sm:px-4 sm:py-2 sm:text-base"
              onClick={() => navigate('/trips')}
            >
              ← Back to Trips
            </Button>
          </div>
        </div>

        {/* Trip Content */}
        <div className="rounded-lg shadow-lg backdrop-blur-sm sm:rounded-xl">
          <div className="sm:p-6 md:p-8">
            <TripView trip={trip} destination={trip.destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
