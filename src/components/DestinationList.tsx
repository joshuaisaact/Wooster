import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/types/types';
import CreateDestination from './CreateDestnation';
import DestinationCard from './DestinationCard';
import GlobeComponent from '@/pages/GlobeComponent';
import DestinationFullList from './DestinationFullList';
import SavedDestinations from './SavedDestinations';
import { Destination as DestinationType } from '@/types/types';

interface DestinationListProps {
  destinations: DestinationType[];
  handleAddNewDestination: (newDestination: DestinationType) => void;
}

function DestinationList({ destinations, handleAddNewDestination }: DestinationListProps) {
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [globeHeight, setGlobeHeight] = useState(600); // Default height

  function handleButtonClick(destination: Destination) {
    setFocusedDestination(destination);
  }

  useEffect(() => {
    // Function to handle window resize and adjust the globe height
    function updateGlobeHeight() {
      const windowHeight = window.innerHeight;
      const adjustedHeight = windowHeight * 0.5; // Adjust globe height to 60% of window height
      setGlobeHeight(adjustedHeight);
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
        <div className={`bg-background min-h-[${globeHeight}] rounded-lg p-6`}>
          {isLoading ? (
            <p>Loading globe...</p>
          ) : (
            <GlobeComponent
              destinations={destinations}
              focusedDestination={focusedDestination}
              height={globeHeight} // Use the responsive globe height
            />
          )}
        </div>

        <div>
          <SavedDestinations destinations={destinations} handleButtonClick={handleButtonClick} />
        </div>

        <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Destination List</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {destinations.map((destination) => (
                <li key={destination.destination_id}>
                  <Link
                    to={`/destinations/${encodeURIComponent(destination.destination_name)}`}
                    className="block"
                  >
                    <DestinationCard destination={destination} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
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
          <CreateDestination
            addNewDestination={handleAddNewDestination}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default DestinationList;
