import GlobeComponent from './globecomponent';
import { Destination } from '@/types';

interface GlobeSectionProps {
  destinations: Destination[] | undefined;
  focusedDestination: Destination | null;
  isLoading: boolean;
}

function GlobeSection({ destinations, focusedDestination, isLoading }: GlobeSectionProps) {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse text-lg text-gray-600 dark:text-green-100/70">
          Loading globe...
        </div>
      </div>
    );
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
