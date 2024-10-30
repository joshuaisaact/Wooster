import { Destination } from '@/types/types';
import Map from '../Map';
import DestinationHeader from './DestinationHeader';
import DestinationDetails from './DestinationDetails';
import DeleteDestinationButton from './DeleteDestinationButton';
import { useState } from 'react';

interface DestinationViewProps {
  destination: Destination;
}

function DestinationView({ destination }: DestinationViewProps) {
  const [tripCreationOpen, setTripCreationOpen] = useState(false);

  return (
    <div className={`grid gap-6 transition-all duration-300 ${tripCreationOpen ? 'mr-96' : ''}`}>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-[400px] w-full">
          {destination.latitude && destination.longitude ? (
            <Map
              latitude={destination.latitude}
              longitude={destination.longitude}
              className="h-full w-full rounded-lg"
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border">
              <p>No map available for this destination.</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <DestinationHeader destination={destination} onTripCreationChange={setTripCreationOpen} />
          <DestinationDetails destination={destination} />
          <div className="flex justify-end">
            <DeleteDestinationButton destinationId={destination.destinationId} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationView;
