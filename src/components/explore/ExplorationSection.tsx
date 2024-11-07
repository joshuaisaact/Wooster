import { useAppContext } from '@/hooks/useAppContext';
import { DestinationsList } from '../destination/DestinationsList';
import { Destination } from '@/types/types';

interface ExplorationSectionProps {
  onDestinationClick: (destination: Destination) => void;
  focusedDestinationId: number | null;
}

function ExplorationSection({ onDestinationClick, focusedDestinationId }: ExplorationSectionProps) {
  const { state } = useAppContext();
  const { savedDestinations } = state;

  return (
    <DestinationsList
      destinations={savedDestinations}
      onDestinationSelect={onDestinationClick}
      selectedDestinationId={focusedDestinationId ? focusedDestinationId : null}
    />
  );
}

export default ExplorationSection;
