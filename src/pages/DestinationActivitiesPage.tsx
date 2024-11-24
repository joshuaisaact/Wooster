import { useNavigate, useParams } from 'react-router-dom';

import DestinationActivities from '@/components/destination/DestinationActivities';
import { Button } from '@/components/ui/button';

import { useDestinationDetails } from '@/hooks/destination/useDestinationDetails';
import { useAllDestinations } from '@/hooks/destination/useAllDestinations';

function DestinationActivitiesPage() {
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();
  const navigate = useNavigate();

  const { data: allDestinations = [] } = useAllDestinations();
  const destination = allDestinations.find((dest) => dest.destinationName === destinationName);
  const { destinationActivities, isLoadingActivities, isError } =
    useDestinationDetails(destinationName);

  if (isLoadingActivities) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
          Loading activities...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="text-lg text-red-600 dark:text-red-400">Failed to load activities</div>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <div className="text-lg text-gray-600 dark:text-green-100/70">Destination not found</div>
        <button
          onClick={() => navigate('/destination-list')}
          className="text-sm text-gray-600 hover:text-gray-900 dark:text-green-100/70 dark:hover:text-white"
        >
          ← Back to Destinations
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full">
      <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-6 md:py-8">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="px-2 py-1 text-sm text-gray-600 hover:text-green-700 dark:text-green-100/70 dark:hover:text-green-400 sm:px-4 sm:py-2 sm:text-base"
            onClick={() => navigate('/destination-list')}
          >
            ← Back to Destinations
          </Button>
        </div>
      </div>
      <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
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
              activities={destinationActivities || []}
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
