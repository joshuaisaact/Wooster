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
  mode: 'dashboard' | 'explore';
}

export function SavedDestinations({
  onDestinationSelect,
  selectedDestinationId,
  className,
  mode,
}: SavedDestinationsProps) {
  const {
    state: { destinations },
  } = useAppContext();

  return (
    <Card className={cn('min-w-[300px] bg-white/70 dark:bg-green-800/30', className)}>
      <CardHeader className="border-b border-gray-100/30 pb-3 dark:border-white/10">
        <CardTitle className="text-gray-900 dark:text-white/95">My Saved Destinations</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea className="h-[300px] w-full pr-4">
          <SavedDestinationsList
            destinations={destinations}
            selectedDestinationId={selectedDestinationId}
            onSelect={onDestinationSelect}
            mode={mode}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
