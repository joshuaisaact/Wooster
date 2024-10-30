import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';
import { SavedDestinationsList } from './SavedDestinationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SavedDestinationsProps {
  onDestinationSelect: (destination: Destination) => void;
  selectedDestinationId?: number | null;
  className?: string;
}

export function SavedDestinations({
  onDestinationSelect,
  selectedDestinationId,
  className,
}: SavedDestinationsProps) {
  const {
    state: { destinations },
  } = useAppContext();

  return (
    <Card className={cn('min-w-[300px]', className)}>
      <CardHeader className="border-b pb-3">
        <CardTitle>My Saved Destinations</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[300px] w-full pr-4">
          <SavedDestinationsList
            destinations={destinations}
            selectedDestinationId={selectedDestinationId}
            onSelect={onDestinationSelect}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
