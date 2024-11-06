import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';
import DestinationActivities from '@/components/destination/DestinationActivities';
import { Button } from '@/components/ui/button';
import { MapPinIcon } from 'lucide-react';
import { useEffect } from 'react';

function DestinationActivitiesPage() {
  const { state, loadDestinationActivities } = useAppContext();
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();
  const { isLoading, destinations, activities } = state;
  const navigate = useNavigate();

  const destination = destinations.find((dest) => dest.destinationName === destinationName);
  const existingActivities = destinationName ? activities[destinationName] : null;

  useEffect(() => {
    const loadActivities = async () => {
      if (destinationName && !existingActivities) {
        await loadDestinationActivities(destinationName);
      }
    };

    loadActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || destinations.length === 0) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-green-50/50 to-white/50 dark:from-green-950/50 dark:to-green-900/50">
        <div className="text-muted-foreground animate-pulse text-lg dark:text-green-100/70">
          Loading destination details...
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/50">
              <MapPinIcon className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/95">
              Destination Not Found
            </h2>
            <p className="max-w-md text-center text-gray-600 dark:text-green-100/70">
              We couldn't find the destination you're looking for. It might have been removed or you
              may have used an invalid link.
            </p>
            <Button
              onClick={() => navigate('/destination-list')}
              className="mt-4 bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            >
              View All Destinations
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
        {/* Main Content */}
        <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm dark:bg-green-800/30 dark:shadow-green-900/20">
          {/* Tabs */}
          <div className="relative z-10 border-b border-gray-200 p-4 dark:border-green-700/30">
            <div className="flex w-full justify-between rounded-lg bg-white/70 p-1 dark:bg-green-800/30">
              <button
                type="button"
                onClick={() => navigate(`/destinations/${destinationName}`)}
                className="relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium text-green-900 transition-colors hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40"
              >
                Details
              </button>
              <button
                type="button"
                className="relative z-20 flex-1 rounded-md bg-green-800 px-3 py-1.5 text-sm font-medium text-white dark:bg-green-700"
              >
                Activities
              </button>
              <button
                type="button"
                onClick={() => navigate(`/destinations/${destinationName}?tab=insights`)}
                className="relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium text-green-900 transition-colors hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40"
              >
                Insights
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            <DestinationActivities
              destinationName={destination.destinationName}
              activities={existingActivities || []}
            />
          </div>
        </div>

        {/* Bottom Action */}
        <div className="mt-6 text-center">
          <Button
            className="bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
            onClick={() =>
              navigate('/trips', {
                state: { selectedDestination: destination },
              })
            }
          >
            Plan a Trip to {destination.destinationName}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DestinationActivitiesPage;
