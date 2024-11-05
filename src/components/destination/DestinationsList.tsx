import { Destination } from '@/types/types';
import { SavedDestinationsList } from './SavedDestinations/SavedDestinationsList';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface DestinationsListProps {
  destinations: Destination[];
  onDestinationSelect: (destination: Destination) => void;
  selectedDestinationId?: number | null;
  className?: string;
}

export function DestinationsList({
  destinations,
  onDestinationSelect,
  selectedDestinationId,
  className,
}: DestinationsListProps) {
  return (
    <Card className={cn('min-w-[300px] bg-white/70 dark:bg-green-800/30', className)}>
      <CardContent className="p-4">
        <ScrollArea className="h-[300px] w-full pr-4">
          <SavedDestinationsList
            destinations={destinations}
            selectedDestinationId={selectedDestinationId}
            onSelect={onDestinationSelect}
            mode="explore"
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
