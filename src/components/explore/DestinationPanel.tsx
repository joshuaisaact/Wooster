import { Destination } from '@/types';
import { Button } from '@/components/ui/button';
import { MapPinIcon, DollarSignIcon, Sun, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface DestinationPanelProps {
  focusedDestination: Destination | null;
}

function DestinationPanel({ focusedDestination }: DestinationPanelProps) {
  const navigate = useNavigate();

  if (!focusedDestination) {
    return (
      <div className="py-8 text-center">
        <h3 className="text-lg font-semibold text-green-900 dark:text-white/95">
          Select a Destination
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-green-100/70">
          Click on any destination to see more details and start planning your trip
        </p>
      </div>
    );
  }

  const {
    destinationName,
    country,
    description,
    costLevel,
    bestTimeToVisit,
    averageTemperatureHigh,
    averageTemperatureLow,
    officialLanguage,
    currency,
  } = focusedDestination;

  const getCostLevelDetails = (level: string) => {
    const levels = {
      Low: { label: 'Budget Friendly', dots: 1 },
      Medium: { label: 'Moderate', dots: 2 },
      High: { label: 'Premium', dots: 3 },
    };
    return levels[level as keyof typeof levels] || { label: 'Unknown', dots: 0 };
  };

  const costDetails = getCostLevelDetails(costLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-green-900 dark:text-white/95">
          {destinationName}
        </h3>
        <div className="mt-1 flex items-center text-gray-600 dark:text-green-100/70">
          <MapPinIcon className="mr-1 h-4 w-4" />
          <span className="text-sm">{country}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-600 dark:text-green-100/70">{description}</p>

      {/* Stats */}
      <div className="grid gap-4">
        {/* Best Time & Temperature */}
        <div className="grid grid-cols-1 gap-2 rounded-lg bg-white/50 p-3 transition-all duration-200 hover:bg-white/70 hover:shadow-sm dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:hover:shadow-green-900/20">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white/95">
              Best Time to Visit
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600 dark:text-green-100/70">{bestTimeToVisit}</span>
            <span className="text-xs text-gray-500 dark:text-green-100/50">
              {averageTemperatureLow}°F - {averageTemperatureHigh}°F
            </span>
          </div>
        </div>

        {/* Cost Level */}
        <div className="grid grid-cols-1 gap-2 rounded-lg bg-white/50 p-3 transition-all duration-200 hover:bg-white/70 hover:shadow-sm dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:hover:shadow-green-900/20">
          <div className="flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white/95">Cost Level</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-green-100/70">
                {costDetails.label}
              </span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all duration-200',
                      i < costDetails.dots
                        ? 'bg-green-600 dark:bg-green-400'
                        : 'bg-gray-300 dark:bg-green-900/50',
                      i < costDetails.dots &&
                        'group-hover:bg-green-700 dark:group-hover:bg-green-300',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Language & Currency */}
        <div className="grid grid-cols-1 gap-2 rounded-lg bg-white/50 p-3 transition-all duration-200 hover:bg-white/70 hover:shadow-sm dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:hover:shadow-green-900/20">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white/95">Local Info</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-600 dark:text-green-100/70">{officialLanguage}</span>
            <span className="text-xs text-gray-500 dark:text-green-100/50">{currency}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          className="w-full bg-green-700 font-medium text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
          onClick={() => navigate(`/destinations/${focusedDestination.destinationName}`)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="w-full border-green-700/20 bg-white/50 text-green-700 hover:bg-white/80 hover:text-green-800 dark:border-green-400/20 dark:bg-green-900/30 dark:text-green-100 dark:hover:bg-green-900/50 dark:hover:text-green-50"
          onClick={() => navigate('/trips', { state: { selectedDestination: focusedDestination } })}
        >
          Plan a Trip
        </Button>
      </div>
    </div>
  );
}

export default DestinationPanel;
