import GlobeComponent from './globecomponent';
import { Destination } from '@/types/types';

interface GlobeSectionProps {
  destinations: Destination[];
  focusedDestination: Destination | null;
  isLoading: boolean;
}

function GlobeSection({ destinations, focusedDestination, isLoading }: GlobeSectionProps) {
  if (isLoading) {
    return <p className="p-4 text-gray-600 dark:text-green-100/70">Loading globe...</p>;
  }

  return (
    <div className="w-full">
      <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-white/70 dark:bg-green-950/50">
        <div className="absolute inset-0">
          <GlobeComponent
            destinations={destinations}
            focusedDestination={focusedDestination}
            className="h-full w-full"
            initialAltitude={1.5}
          />
        </div>
      </div>
    </div>
  );
}

export default GlobeSection;
