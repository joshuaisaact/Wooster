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
    state: { savedDestinations },
  } = useAppContext();

  return (
    <Card className={cn('bg-white/70 dark:bg-green-800/30 md:min-w-[300px]', className)}>
      <CardHeader className="border-b border-gray-200/70 pb-3 dark:border-gray-100/30">
        <CardTitle className="text-gray-900 dark:text-white/95">Saved Destinations</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea type="auto" className="h-[300px] w-full overflow-y-auto pr-4 md:h-[400px]">
          <SavedDestinationsList
            destinations={savedDestinations}
            selectedDestinationId={selectedDestinationId}
            onSelect={onDestinationSelect}
            mode={mode}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
