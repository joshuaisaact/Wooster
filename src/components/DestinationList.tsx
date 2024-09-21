import { Destination } from '@/types/types';
import { useState, useEffect } from 'react';
import CreateDestination from './CreateDestnation';
import { Link } from 'react-router-dom';
import DestinationCard from './DestinationCard';

interface DestinationListProps {
  baseURL: string;
}

function DestinationList({ baseURL }: DestinationListProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
      {/* Destination Cards */}
      <div className="col-start-1 sm:col-span-8">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {destinations.map((destination) => (
              <li key={destination.destination_id} className="mb-4">
                <Link
                  to={`/destinations/${encodeURIComponent(destination.destination_name)}`}
                  className="block p-4"
                >
                  <DestinationCard destination={destination} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Destination Form */}
      <div className="col-start-9 p-4 sm:col-span-4">
        <CreateDestination
          addNewDestination={handleAddNewDestination}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </div>
  );
}

export default DestinationList;
