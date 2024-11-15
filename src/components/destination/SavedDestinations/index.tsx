import { Destination } from '@/types/types';
import { SavedDestinationsList } from './SavedDestinationsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useSavedDestinations } from '@/lib/query/destinations';
import { Skeleton } from '@/components/ui/Skeleteon';

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
  const { data: savedDestinations = [], isLoading, isError, error } = useSavedDestinations();

  return (
    <Card className={cn('bg-white/70 dark:bg-green-800/30 md:min-w-[300px]', className)}>
      <CardHeader className="border-b border-gray-200/70 pb-3 dark:border-gray-100/30">
        <CardTitle className="text-gray-900 dark:text-white/95">Saved Destinations</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <ScrollArea type="auto" className="h-[300px] w-full overflow-y-auto pr-4 md:h-[400px]">
          {isLoading ? (
            // Loading skeleton that matches your list layout
            <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-green-100/10 dark:bg-green-800/20" />
              ))}
            </div>
          ) : isError ? (
            // Error state that matches your empty state style
            <div className="flex h-32 items-center justify-center text-sm text-red-600 dark:text-red-400">
              <p className="text-center">
                Error loading destinations
                <br />
                <span className="text-xs">
                  {error instanceof Error ? error.message : 'Please try again later'}
                </span>
              </p>
            </div>
          ) : (
            // Your existing list component
            <SavedDestinationsList
              destinations={savedDestinations}
              selectedDestinationId={selectedDestinationId}
              onSelect={onDestinationSelect}
              mode={mode}
            />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
