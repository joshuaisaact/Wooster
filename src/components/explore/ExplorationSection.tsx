import { useSavedDestinations } from '@/hooks/destination/useSavedDestinations';
import { DestinationsList } from '../destination/DestinationsList';
import { Destination } from '@/types';

interface ExplorationSectionProps {
  onDestinationClick: (destination: Destination) => void;
  focusedDestinationId: number | null;
}

function ExplorationSection({ onDestinationClick, focusedDestinationId }: ExplorationSectionProps) {
  const { data: savedDestinations = [], isLoading } = useSavedDestinations();

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-lg text-muted-foreground">Loading destinations...</div>
      </div>
    );
  }

  return (
    <DestinationsList
      destinations={savedDestinations}
      onDestinationSelect={onDestinationClick}
      selectedDestinationId={focusedDestinationId ? focusedDestinationId : null}
    />
  );
}

export default ExplorationSection;
