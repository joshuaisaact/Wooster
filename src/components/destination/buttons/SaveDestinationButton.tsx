import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Destination } from '@/types';
import { useSaveDestinationToggle } from '@/hooks/destination/useSavedDestinationToggle';

interface SaveDestinationButtonProps {
  destination: Destination;
}

export function SaveDestinationButton({ destination }: SaveDestinationButtonProps) {
  const { toggleSaveDestination, isDestinationSaved, isPending } = useSaveDestinationToggle();
  const isSaved = isDestinationSaved(destination.destinationId);

  return (
    <Button
      variant="outline"
      size="sm"
      className="group flex items-center gap-2 border-gray-200 bg-white/80 hover:bg-white dark:border-white/10 dark:bg-green-800/30"
      onClick={(e) => {
        e.stopPropagation();
        toggleSaveDestination(destination, e);
      }}
    >
      <Star
        className={cn(
          'h-4 w-4 transition-all',
          isSaved
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-500 group-hover:fill-yellow-400 group-hover:text-yellow-400 dark:text-gray-300',
          isPending && 'animate-pulse',
        )}
      />
      <span className="text-sm text-gray-700 dark:text-gray-200">{isSaved ? 'Saved' : 'Save'}</span>
    </Button>
  );
}
