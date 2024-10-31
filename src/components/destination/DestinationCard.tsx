import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPinIcon, Calendar, Thermometer, DollarSign, ShieldCheck } from 'lucide-react';
import { Destination } from '@/types/types';
import { cn } from '@/lib/utils';

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

  const getCostLevelColor = (level: string) => {
    const colors = {
      low: 'text-green-600 bg-green-50 border-green-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      high: 'text-red-600 bg-red-50 border-red-200',
    };
    return (
      colors[level.toLowerCase() as keyof typeof colors] ||
      'text-gray-600 bg-gray-50 border-gray-200'
    );
  };

  return (
    <Card className="group h-full overflow-hidden border-none bg-white/70 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl">
      <CardHeader className="border-b border-gray-100 bg-white/50 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-green-900 group-hover:text-green-800">
              {destinationName}
            </CardTitle>
            <div className="mt-2 flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-4 w-4" />
              <span className="text-sm">{country}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge
              variant="outline"
              className={cn(
                'flex items-center gap-1 px-2 py-1 text-xs font-medium',
                getCostLevelColor(costLevel),
              )}
            >
              <DollarSign className="h-3 w-3" />
              {costLevel}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                'flex items-center gap-1 px-2 py-1 text-xs font-medium',
                getSafetyBadgeColor(safetyRating),
              )}
            >
              <ShieldCheck className="h-3 w-3" />
              {safetyRating}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4 p-6">
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {description || 'No description available'}
        </p>

        <div className="mt-auto space-y-3 border-t border-gray-100 pt-4">
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Best Time: {bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Thermometer className="h-4 w-4" />
            <span className="text-sm">
              Temperature: {averageTemperatureLow}°-{averageTemperatureHigh}°F
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function getSafetyBadgeColor(rating: string): string {
  const colors = {
    high: 'text-green-600 bg-green-50 border-green-200',
    medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    low: 'text-red-600 bg-red-50 border-red-200',
  };
  return (
    colors[rating.toLowerCase() as keyof typeof colors] ||
    'text-gray-600 bg-gray-50 border-gray-200'
  );
}

export default DestinationCard;
