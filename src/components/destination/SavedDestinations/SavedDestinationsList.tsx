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
      <div className="text-muted-foreground flex h-full items-center justify-center">
        No saved destinations yet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {destinations.map((destination) => (
        <Button
          key={destination.destinationId}
          onClick={() => onSelect(destination)}
          variant={selectedDestinationId === destination.destinationId ? 'default' : 'outline'}
          className={cn(
            'w-full justify-start overflow-hidden text-ellipsis whitespace-nowrap',
            selectedDestinationId === destination.destinationId
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'hover:bg-green-50 hover:text-green-600',
          )}
          size="sm"
        >
          {destination.destinationName}
        </Button>
      ))}
    </div>
  );
}
