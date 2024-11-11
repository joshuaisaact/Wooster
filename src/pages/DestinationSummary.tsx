import { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import DestinationView from '@/components/destination/DestinationView';
import DestinationInsights from '@/components/destination/DestinationInsights';
import { MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DestinationActivitiesPage from './DestinationActivitiesPage';
import { useDestinationDetails } from '@/hooks/destination/useDestinationDetails';

function DestinationSummary() {
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || 'details';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { destination, destinationActivities, isLoadingActivities } =
    useDestinationDetails(destinationName);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    const newUrl = `/destinations/${destinationName}${tab !== 'details' ? `?tab=${tab}` : ''}`;
    window.history.pushState(null, '', newUrl);
  };

  // Only show loading when we don't have the destination at all
  if (!destination) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        {/* Your existing "Destination Not Found" UI */}
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
                onClick={() => handleTabClick('details')}
                className={`relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === 'details'
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                Details
              </button>
              <button
                type="button"
                onClick={() => navigate(`/destinations/${destinationName}/activities`)}
                className="relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium text-green-900 transition-colors hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40"
              >
                Activities
              </button>
              <button
                type="button"
                onClick={() => handleTabClick('insights')}
                className={`relative z-20 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeTab === 'insights'
                    ? 'bg-green-800 text-white dark:bg-green-700'
                    : 'text-green-900 hover:bg-white/50 dark:text-green-100 dark:hover:bg-green-800/40'
                }`}
              >
                Insights
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'details' && <DestinationView destination={destination} />}
            {activeTab === 'activities' &&
              (isLoadingActivities ? (
                <div className="flex justify-center py-8">
                  <div className="animate-pulse">Loading activities...</div>
                </div>
              ) : (
                <DestinationActivitiesPage />
              ))}
            {activeTab === 'insights' && (
              <DestinationInsights
                destinationName={destination.destinationName}
                activities={destinationActivities}
              />
            )}
          </div>
        </div>

        {/* Bottom Action
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
        </div> */}
      </div>
    </div>
  );
}

export default DestinationSummary;
