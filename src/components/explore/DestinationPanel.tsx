import { Destination } from '@/types/types';
import { Button } from '@/components/ui/button';
import { MapPinIcon, StarIcon, DollarSignIcon, ShieldCheckIcon } from 'lucide-react';
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
        <h3 className="text-lg font-semibold text-green-900">Select a Destination</h3>
        <p className="mt-2 text-sm text-gray-600">
          Click on any destination to see more details and start planning your trip
        </p>
      </div>
    );
  }

  const { destinationName, country, description, safetyRating, costLevel } = focusedDestination;

  // Helper function for cost level display
  const getCostLevelDetails = (level: string) => {
    const levels = {
      low: { label: 'Budget Friendly', dots: 1 },
      medium: { label: 'Moderate', dots: 2 },
      high: { label: 'Premium', dots: 3 },
    };
    return levels[level as keyof typeof levels] || { label: 'Unknown', dots: 0 };
  };

  const costDetails = getCostLevelDetails(costLevel);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-xl font-semibold text-green-900">{destinationName}</h3>
        <div className="mt-1 flex items-center text-gray-600">
          <MapPinIcon className="mr-1 h-4 w-4" />
          <span className="text-sm">{country}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-gray-600">{description}</p>

      {/* Stats */}
      <div className="grid gap-4">
        {/* Safety Rating */}
        <div className="flex items-center justify-between rounded-lg bg-white/50 p-3">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Safety Rating</span>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  'h-4 w-4',
                  i < safetyRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300',
                )}
              />
            ))}
          </div>
        </div>

        {/* Cost Level */}
        <div className="flex items-center justify-between rounded-lg bg-white/50 p-3">
          <div className="flex items-center gap-2">
            <DollarSignIcon className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Cost Level</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="mr-2 text-sm text-gray-600">{costDetails.label}</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    'h-2 w-2 rounded-full',
                    i < costDetails.dots ? 'bg-green-600' : 'bg-gray-300',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button
          className="w-full bg-green-700 font-medium text-white hover:bg-green-800"
          onClick={() => navigate(`/destinations/${focusedDestination.destinationName}`)}
        >
          View Details
        </Button>
        <Button
          variant="outline"
          className="w-full border-green-700/20 bg-white/50 text-green-700 hover:bg-white/80 hover:text-green-800"
          onClick={() => navigate('/trips', { state: { selectedDestination: focusedDestination } })}
        >
          Plan a Trip
        </Button>
      </div>
    </div>
  );
}

export default DestinationPanel;
