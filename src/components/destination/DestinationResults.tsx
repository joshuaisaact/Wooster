// components/destination/DestinationResults.tsx
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import DestinationCard from './DestinationCard';
import { Destination } from '@/types/types';

interface DestinationResultsProps {
  isLoading: boolean;
  filteredDestinations: Destination[];
  onResetFilters: () => void;
}

export function DestinationResults({
  isLoading,
  filteredDestinations,
  onResetFilters,
}: DestinationResultsProps) {
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-lg">Loading amazing destinations...</p>
      </div>
    );
  }

  if (filteredDestinations.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center space-y-4">
        <p className="text-lg text-gray-600 dark:text-green-100/70">
          No destinations found matching your criteria
        </p>
        <Button
          variant="outline"
          onClick={onResetFilters}
          className="bg-green-700 font-medium tracking-tight transition-all duration-200 hover:bg-green-800 active:scale-[0.98] dark:bg-green-600 dark:hover:bg-green-700"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredDestinations.map((destination) => (
        <li
          key={destination.destinationId}
          className="transition-transform duration-200 hover:scale-[1.02]"
        >
          <Link
            to={`/destinations/${encodeURIComponent(destination.destinationName)}`}
            className="block h-full"
          >
            <DestinationCard destination={destination} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
