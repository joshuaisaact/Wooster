import { Destination } from '@/types/types';
import { Map } from '../shared/map';
import DestinationHeader from './DestinationHeader';
import DestinationDetails from './DestinationDetails';
import DeleteDestinationButton from './DeleteDestinationButton';
import { useState } from 'react';
import { MapPinIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import CreateTrip from '../shared/CreateTrip';

interface DestinationViewProps {
  destination: Destination;
}

function DestinationView({ destination }: DestinationViewProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);

  const hasMapCoordinates = destination.latitude && destination.longitude;

  return (
    <div className={cn('grid gap-8 transition-all duration-300', tripCreationOpen ? 'mr-96' : '')}>
      <div className="grid gap-8 md:grid-cols-2">
        {/* Map Section */}
        <div className="overflow-hidden rounded-xl bg-white/70 shadow-lg backdrop-blur-sm">
          {hasMapCoordinates ? (
            <Map
              latitude={destination.latitude}
              longitude={destination.longitude}
              className="h-[400px] w-full"
              isInteractive={true}
              showZoomControls={true}
            />
          ) : (
            <div className="flex h-[400px] w-full flex-col items-center justify-center space-y-3 bg-white/50 px-4 text-center">
              <div className="rounded-full bg-gray-100 p-3">
                <MapPinIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <p className="text-gray-600">No map available for this destination.</p>
                <p className="mt-1 text-sm text-gray-500">
                  Coordinates haven't been set for this location.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="divide-y divide-gray-100 rounded-xl bg-white/70 shadow-lg backdrop-blur-sm">
          <div className="p-6 md:p-8">
            <DestinationHeader
              destination={destination}
              onTripCreationChange={setTripCreationOpen}
            />
          </div>

          <div className="p-6 md:p-8">
            <DestinationDetails destination={destination} />
          </div>

          <div className="bg-gray-50/50 p-6 md:p-8">
            <div className="flex justify-end">
              <DeleteDestinationButton destinationId={destination.destinationId} />
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Additional content section */}
      <div className="rounded-xl bg-white/70 p-6 shadow-lg backdrop-blur-sm md:p-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-green-900">
            About {destination.destinationName}
          </h2>
          <p className="leading-relaxed text-gray-600">{destination.description}</p>
          {/* Add more destination details here */}
        </div>
      </div>

      {tripCreationOpen && (
        <div className="fixed right-0 top-0 h-full w-96 overflow-y-auto border-l border-gray-100 bg-white/80 p-6 shadow-xl backdrop-blur-sm">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-900">Plan Your Trip</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTripCreationOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <CreateTrip location={destination} onClose={() => setTripCreationOpen(false)} />
            <div className="mt-auto text-center">
              <img
                src="/wooster-on-maps-no-bg.png"
                alt="Wooster"
                className="mx-auto w-32 opacity-80"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DestinationView;
