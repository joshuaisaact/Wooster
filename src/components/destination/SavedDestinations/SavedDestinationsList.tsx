import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Destination } from '@/types/types';

interface SavedDestinationsListProps {
  destinations: Destination[];
  selectedDestinationId?: number | null;
  onSelect: (destination: Destination) => void;
}

export function SavedDestinationsList({
  destinations,
  selectedDestinationId,
  onSelect,
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
    <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
      {destinations.map((destination) => (
        <Button
          key={destination.destinationId}
          onClick={() => onSelect(destination)}
          variant={selectedDestinationId === destination.destinationId ? 'default' : 'outline'}
          className={cn(
            'border-input/50 group min-h-[40px] w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap transition-all duration-200',
            selectedDestinationId === destination.destinationId
              ? 'bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700'
              : 'bg-white/50 hover:border-green-600/30 hover:bg-green-50/50 hover:text-green-700 dark:border-white/10 dark:bg-green-800/30 dark:text-green-100 dark:hover:border-green-400/30 dark:hover:bg-green-800/40 dark:hover:text-white',
          )}
          size="sm"
        >
          <span className="inline-block max-w-full overflow-hidden text-ellipsis">
            {destination.destinationName}
          </span>
        </Button>
      ))}
    </div>
  );
}
