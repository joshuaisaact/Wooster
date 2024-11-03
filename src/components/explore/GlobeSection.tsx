import { useState, useEffect } from 'react';
import GlobeComponent from './globecomponent';
import { Destination } from '@/types/types';

interface GlobeSectionProps {
  destinations: Destination[];
  focusedDestination: Destination | null;
  isLoading: boolean;
}

function GlobeSection({ destinations, focusedDestination, isLoading }: GlobeSectionProps) {
  const [dimensions, setDimensions] = useState({ height: 600, width: 600 });

  useEffect(() => {
    function updateDimensions() {
      const isMobile = window.innerWidth < 768;
      setDimensions({
        height: isMobile ? window.innerHeight * 0.3 : window.innerHeight * 0.5,
        width: isMobile ? window.innerWidth * 0.9 : window.innerWidth * 0.6,
      });
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (isLoading) {
    return <p className="p-4 text-gray-600 dark:text-green-100/70">Loading globe...</p>;
  }

  return (
    <div className="min-h-[300px] rounded-lg bg-white/70 transition-colors dark:bg-green-950/50 md:min-h-[600px]">
      <GlobeComponent
        destinations={destinations}
        focusedDestination={focusedDestination}
        height={dimensions.height}
        width="100%"
      />
    </div>
  );
}
export default GlobeSection;
