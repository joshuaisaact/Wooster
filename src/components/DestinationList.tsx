import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/types/types';
import CreateDestination from './CreateDestnation';
import DestinationCard from './DestinationCard';
import GlobeComponent from '@/pages/GlobeComponent';
import SavedDestinations from './SavedDestinations';
import { useAppContext } from '@/hooks/useAppContext';

function DestinationList() {
  const { state } = useAppContext();
  const { destinations, isLoading } = state;
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);
  const [globeDimensions, setGlobeDimensions] = useState({ height: 600, width: 600 }); // Default height

  function handleButtonClick(destination: Destination) {
    setFocusedDestination((prevFocusedDestination) =>
      prevFocusedDestination?.destination_id === destination.destination_id ? null : destination,
    );
  }

  useEffect(() => {
    // Function to handle window resize and adjust the globe height
    function updateGlobeHeight() {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const adjustedHeight = windowHeight * 0.5; // Adjust globe height to 60% of window height
      const adjustedWidth = windowWidth * 0.6; // Adjust globe width to 80% window width
      setGlobeDimensions({ height: adjustedHeight, width: adjustedWidth });
    }

    updateGlobeHeight(); // Set initial height

    // Add event listener for window resize
    window.addEventListener('resize', updateGlobeHeight);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateGlobeHeight);
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-7 lg:col-span-2">
        <div
          className={`bg-background min-h-[${globeDimensions.height}] min-w-[${globeDimensions.width}] rounded-lg`}
        >
          {isLoading ? (
            <p>Loading globe...</p>
          ) : (
            <GlobeComponent
              destinations={destinations}
              focusedDestination={focusedDestination}
              height={globeDimensions.height} // Use the responsive globe height
              width="100%" // Use the responsive globe width
            />
          )}
        </div>

        <div className="flex flex-row">
          <SavedDestinations
            handleButtonClick={handleButtonClick}
            focusedDestinationId={focusedDestination?.destination_id || null}
          />
          <div className="mt-6 flex items-center justify-center">
            <img src="wooster-suitcase-yellow-no-bg.png" className="h-72 max-w-max p-6" />
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
          {focusedDestination ? (
            <Link
              to={`/destinations/${encodeURIComponent(focusedDestination.destination_name)}`}
              className="block"
            >
              <DestinationCard destination={focusedDestination} />
            </Link>
          ) : (
            <p className="w-80">Select a destination to see details.</p>
          )}
        </div>
        <div className="mt-10 max-w-max rounded-lg bg-white p-6 shadow-md">
          <CreateDestination />
        </div>
      </div>
    </div>
  );
}

export default DestinationList;
