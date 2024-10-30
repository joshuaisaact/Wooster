// components/destination/DestinationCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer } from 'lucide-react';
import { Destination } from '@/types/types';
import { truncateText } from '@/utils/text';

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
    <Card className="h-full transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl">{destinationName}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col space-y-4">
        <p className="text-muted-foreground flex-1 text-sm">
          {description ? truncateText(description, 150) : 'No description available'}
        </p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MapPinIcon className="h-3 w-3" />
              <span className="truncate">{country}</span>
            </Badge>
            <Badge variant="secondary">💰 {costLevel}</Badge>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">{bestTimeToVisit}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Thermometer className="h-3 w-3" />
              <span className="text-xs">
                {averageTemperatureLow}°-{averageTemperatureHigh}°F
              </span>
            </Badge>
          </div>

          <div className="flex justify-end">
            <Badge variant={getSafetyBadgeVariant(safetyRating)} className="text-xs">
              🛡️ {safetyRating}
            </Badge>
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
