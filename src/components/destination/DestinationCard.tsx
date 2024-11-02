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
      low: 'text-green-600 bg-green-50 border-green-200 dark:text-green-200 dark:bg-green-900/50 dark:border-green-700',
      medium:
        'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-700',
      high: 'text-red-600 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-900/50 dark:border-red-700',
    };
    return (
      colors[level.toLowerCase() as keyof typeof colors] ||
      'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-700'
    );
  };

  return (
    <Card className="group h-full overflow-hidden border-none bg-white/70 shadow-lg transition-all duration-200 hover:bg-white/80 hover:shadow-xl dark:bg-green-800/30 dark:shadow-green-900/20 dark:hover:bg-green-800/40">
      <CardHeader className="border-b border-gray-100 bg-white/50 p-6 dark:border-white/10 dark:bg-green-800/20">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-bold text-green-900 group-hover:text-green-800 dark:text-white/95 dark:group-hover:text-white">
              {destinationName}
            </CardTitle>
            <div className="mt-2 flex items-center gap-2 text-gray-600 dark:text-green-100/70">
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
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-green-100/70">
          {description || 'No description available'}
        </p>

        <div className="mt-auto space-y-3 border-t border-gray-100 pt-4 dark:border-white/10">
          <div className="flex items-center gap-2 text-gray-600 dark:text-green-100/70">
            <Calendar className="h-4 w-4" />
            <span className="text-sm">Best Time: {bestTimeToVisit}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-green-100/70">
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
    high: 'text-green-600 bg-green-50 border-green-200 dark:text-green-200 dark:bg-green-900/50 dark:border-green-700',
    medium:
      'text-yellow-600 bg-yellow-50 border-yellow-200 dark:text-yellow-200 dark:bg-yellow-900/50 dark:border-yellow-700',
    low: 'text-red-600 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-900/50 dark:border-red-700',
  };
  return (
    colors[rating.toLowerCase() as keyof typeof colors] ||
    'text-gray-600 bg-gray-50 border-gray-200 dark:text-gray-300 dark:bg-gray-800/50 dark:border-gray-700'
  );
}

export default DestinationCard;
