import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Destination } from '@/types';
import { Link } from 'react-router-dom';

interface SavedDestinationsListProps {
  destinations: Destination[];
  selectedDestinationId?: number | null;
  onSelect: (destination: Destination) => void;
  mode: 'dashboard' | 'explore';
}

export function SavedDestinationsList({
  destinations,
  selectedDestinationId,
  onSelect,
  mode,
}: SavedDestinationsListProps) {
  if (!destinations.length) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-gray-600 dark:text-green-100/70">
        <p className="text-center">
          No saved destinations yet
          <br />
          <span className="text-xs">Add some destinations to get started!</span>
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      {destinations.map((destination) => {
        const isSelected = selectedDestinationId === destination.destinationId;

        // Conditional rendering based on the mode prop
        return mode === 'dashboard' ? (
          <Link
            key={destination.destinationId}
            to={`/destinations/${destination.destinationName}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={cn(
              buttonVariants({
                variant: 'default',
                size: 'default',
              }),
              'w-full bg-green-800 font-medium tracking-tight transition-all duration-200 hover:bg-green-700 active:scale-[0.98] dark:bg-green-700 dark:text-white dark:hover:bg-green-700 dark:hover:bg-green-800/40',
            )}
          >
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {destination.destinationName}
            </span>
          </Link>
        ) : (
          <Button
            key={destination.destinationId}
            onClick={() => onSelect(destination)}
            variant={isSelected ? 'default' : 'outline'}
            className={cn(
              'group min-h-[40px] w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap border-input/50 transition-all duration-200',
              isSelected
                ? 'bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700'
                : 'bg-white/50 hover:border-green-600/30 hover:bg-green-50/50 hover:text-green-700 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:hover:border-green-400/30 dark:hover:bg-green-800/40 dark:hover:text-white',
            )}
            size="sm"
          >
            <span className="inline-block max-w-full overflow-hidden text-ellipsis">
              {destination.destinationName}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
