import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon } from 'lucide-react';
import { PlanTripButton } from './PlanTripButton';
import { Destination } from '@/types/types';

interface DestinationHeaderProps {
  destination: Destination;
  onTripCreationChange: (isOpen: boolean) => void;
}

function DestinationHeader({ destination, onTripCreationChange }: DestinationHeaderProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">{destination.destinationName}</CardTitle>
          <PlanTripButton
            destination={destination}
            onCreateTripOpen={(isOpen) => onTripCreationChange(isOpen)}
          />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            <span>{destination.country}</span>
          </Badge>
          <Badge variant="secondary">💰 {destination.costLevel}</Badge>
          <Badge variant="secondary">🛡️ {destination.safetyRating}</Badge>
        </div>
        <p className="text-muted-foreground mt-2">{destination.description}</p>
      </CardHeader>
    </Card>
  );
}

export default DestinationHeader;
