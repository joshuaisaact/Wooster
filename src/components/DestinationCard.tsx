import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon } from 'lucide-react';
import { Destination } from '@/types/types';

interface DestinationProps {
  destination: Destination;
}

function DestinationCard({ destination }: DestinationProps) {
  const { destinationName, description, country, costLevel } = destination;

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card className="flex min-w-72 max-w-80 flex-col">
      <CardHeader>
        <CardTitle className="text-lg">{destinationName}</CardTitle>
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
            💰 {costLevel}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
