import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon } from 'lucide-react';
import { Destination } from '@/types/types';

interface DestinationProps {
  destination: Destination;
  onDeleteDestination: (destination: Destination) => Promise<void>;
}

function DestinationCard({ destination, onDeleteDestination }: DestinationProps) {
  const { destination_name, description, country, cost_level } = destination;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card className="flex w-80 flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{destination_name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="mb-4">
          <p className="text-muted-foreground flex-1 overflow-y-auto text-sm">
            {truncateText(description, 150)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="flex items-center gap-1">
            <MapPinIcon className="h-3 w-3" />
            <span className="truncate">{country}</span>
          </Badge>
          <Badge variant="secondary" className="mt-auto flex items-center gap-1">
            💰 {cost_level}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
