import { SavedDestinations } from '../destination/SavedDestinations';
import { Destination } from '@/types/types';

interface ExplorationSectionProps {
  onDestinationClick: (destination: Destination) => void;
  focusedDestinationId: number | null;
}

function ExplorationSection({ onDestinationClick, focusedDestinationId }: ExplorationSectionProps) {
  return (
    <div className="flex flex-row">
      <SavedDestinations
        onDestinationSelect={onDestinationClick}
        selectedDestinationId={focusedDestinationId}
      />
      <div className="mt-6 flex items-center justify-center">
        <img
          src="wooster-suitcase-yellow-no-bg.png"
          alt="Wooster mascot"
          className="h-72 max-w-max p-6"
        />
      </div>
    </div>
  );
}

export default ExplorationSection;
