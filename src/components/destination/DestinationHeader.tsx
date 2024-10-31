import { MapPinIcon } from 'lucide-react';

import { Destination } from '@/types/types';
import { Button } from '../ui/button';

interface DestinationHeaderProps {
  destination: Destination;
  onTripCreationChange: (isOpen: boolean) => void;
}

function DestinationHeader({ destination, onTripCreationChange }: DestinationHeaderProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-green-900">{destination.destinationName}</h1>
        <div className="mt-1 flex items-center text-gray-600">
          <MapPinIcon className="mr-1 h-4 w-4" />
          <span>{destination.country}</span>
        </div>
      </div>
      <Button
        className="w-full bg-green-700 text-white hover:bg-green-800"
        onClick={() => onTripCreationChange(true)}
      >
        Plan a Trip
      </Button>
    </div>
  );
}

export default DestinationHeader;
