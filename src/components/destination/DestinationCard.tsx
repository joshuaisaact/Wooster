// components/destination/DestinationCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer } from 'lucide-react';
import { Destination } from '@/types/types';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  const {
    destinationName = 'Unnamed Destination',
    description = '',
    country = 'Unknown Location',
    costLevel = 'N/A',
    safetyRating = 'N/A',
    bestTimeToVisit = 'N/A',
    averageTemperatureLow,
    averageTemperatureHigh,
  } = destination || {};

  return (
    <Card className="group h-full overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="border-b bg-gray-50/50 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold">{destinationName}</CardTitle>
            <div className="mt-1 flex items-center gap-2">
              <MapPinIcon className="text-muted-foreground h-3 w-3" />
              <span className="text-muted-foreground text-sm">{country}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary" className="text-xs">
              💰 {costLevel}
            </Badge>
            <Badge variant={getSafetyBadgeVariant(safetyRating)} className="text-xs">
              🛡️ {safetyRating}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4">
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {description || 'No description available'}
        </p>

        <div className="mt-auto flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs">{bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="text-muted-foreground h-4 w-4" />
            <span className="text-muted-foreground text-xs">
              {averageTemperatureLow}°-{averageTemperatureHigh}°F
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getSafetyBadgeVariant(rating: string): 'default' | 'secondary' | 'destructive' {
  if (rating.toLowerCase().includes('high')) return 'default';
  if (rating.toLowerCase().includes('medium')) return 'secondary';
  return 'destructive';
}

export default DestinationCard;
