import { useParams, useNavigate } from 'react-router-dom';
import { TripView } from '@/components/trip/TripView';
import { useAppContext } from '@/hooks/useAppContext';
import { useTripData } from '@/hooks/trip/useTripData';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const { state } = useAppContext();
  const { isLoading, trips } = state;
  const { trip } = useTripData(tripId, trips);
  const navigate = useNavigate();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-muted-foreground animate-pulse text-lg">Loading trip details...</div>
      </div>
    );
  }

  // Trip not found state
  if (!trip) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white/70 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <MapPinIcon className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/95">
              Trip Not Found
            </h2>
            <p className="max-w-md text-center text-gray-600 dark:text-green-100/80">
              We couldn't find the trip you're looking for. It may have been removed or you may have
              used an invalid link.
            </p>
            <Button
              onClick={() => navigate('/trip-list')}
              className="mt-4 bg-blue-700 text-white hover:bg-blue-800"
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
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-green-400"
              onClick={() => navigate('/trips')}
            >
              ← Back to Trips
            </Button>
          </div>
        </div>

        {/* Trip Content */}
        <div className="rounded-xl shadow-lg backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <TripView trip={trip} destination={trip.destination} />
          </div>
        </div>
      </div>
    </div>
  );
}
