import { useParams } from 'react-router-dom';
import DestinationView from '@/components/destination/DestinationView';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';
import { MapPinIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

function DestinationSummary() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();
  const navigate = useNavigate();

  const destination = destinations.find(
    (dest: Destination) => dest.destinationName === destinationName,
  );

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-b from-green-50/50 to-white/50">
        <div className="text-muted-foreground animate-pulse text-lg">
          Loading destination details...
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-[calc(100vh-4rem)] w-full">
        <div className="container mx-auto px-4 py-6 md:py-8 lg:py-12">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-xl bg-white/70 p-8 shadow-lg backdrop-blur-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <MapPinIcon className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Destination Not Found</h2>
            <p className="max-w-md text-center text-gray-600">
              We couldn't find the destination you're looking for. It might have been removed or you
              may have used an invalid link.
            </p>
            <Button
              onClick={() => navigate('/destination-list')}
              className="mt-4 bg-green-700 text-white hover:bg-green-800"
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
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-green-700"
              onClick={() => navigate('/destination-list')}
            >
              ← Back to Destinations
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <DestinationView destination={destination} />
          </div>
        </div>

        {/* Optional: Bottom Action */}
        <div className="mt-6 text-center">
          <Button
            className="bg-green-700 text-white hover:bg-green-800"
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

export default DestinationSummary;
