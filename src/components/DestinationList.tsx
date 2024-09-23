import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Destination } from '@/types/types';
import CreateDestination from './CreateDestnation';
import DestinationCard from './DestinationCard';
import GlobeComponent from '@/pages/GlobeComponent';
import DestinationFullList from './DestinationFullList';
import SavedDestinations from './SavedDestinations';

export default function DestinationList() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [focusedDestination, setFocusedDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleButtonClick(destination: Destination) {
    setFocusedDestination(destination);
  }

  function handleAddNewDestination(newDestination: Destination) {
    setDestinations((prevDestinations) => [...prevDestinations, newDestination]);
  }

  async function fetchDestinations() {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:4000/destinations`);
      const data = await res.json();
      setDestinations(data);
    } catch (error) {
      console.error(`There was an error loading destinations:`, error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="space-y-7 lg:col-span-2">
        <div className="bg-background min-h-[600px] rounded-lg p-6">
          {isLoading ? (
            <p>Loading globe...</p>
          ) : (
            <GlobeComponent
              destinations={destinations}
              focusedDestination={focusedDestination}
              height={600}
              width="100%"
            />
          )}
        </div>
        {/* <div className="rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">My Saved Destinations</h2>
          <div className="flex flex-wrap gap-2">
            {destinations.map((destination) => (
              <button
                key={destination.destination_id}
                onClick={() => handleButtonClick(destination)}
                className="rounded bg-green-600 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
              >
                {destination.destination_name}
              </button>
            ))}
          </div>
        </div> */}
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
