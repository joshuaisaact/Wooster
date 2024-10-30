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
      setDimensions({
        height: window.innerHeight * 0.5,
        width: window.innerWidth * 0.6,
      });
    }

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  if (isLoading) {
    return <p>Loading globe...</p>;
  }

  return (
    <div className="min-h-[600px] rounded-lg bg-background">
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