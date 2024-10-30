import { useState } from 'react';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';
import GlobeSection from '@/components/explore/GlobeSection';
import DestinationPanel from '@/components/explore/DestinationPanel';
import ExplorationSection from '@/components/explore/ExplorationSection';

function Explore() {
  const { state } = useAppContext();
  const { destinations, isLoading } = state;
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);

  const handleDestinationClick = (destination: Destination) => {
    setFocusedDestination((prev) =>
      prev?.destinationId === destination.destinationId ? null : destination,
    );
  };

  return (
    <div className="container mx-auto px-4 text-text">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-7 lg:col-span-2">
          <GlobeSection
            destinations={destinations}
            focusedDestination={focusedDestination}
            isLoading={isLoading}
          />
          <ExplorationSection
            onDestinationClick={handleDestinationClick}
            focusedDestinationId={focusedDestination?.destinationId || null}
          />
        </div>
        <div className="lg:col-span-1">
          <DestinationPanel focusedDestination={focusedDestination} />
        </div>
      </div>
    </div>
  );
}

export default Explore;
