import { Destination } from '@/types/types';
import { useState, useEffect } from 'react';
import CreateDestination from './CreateDestnation';
import { Link } from 'react-router-dom';

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
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="flex w-full max-w-md flex-wrap justify-center gap-4">
          {destinations.map((destination) => (
            <li
              key={destination.destination_id}
              className="mb-4 rounded-lg border transition-colors duration-200 hover:bg-gray-100"
            >
              <Link
                to={`/destinations/${encodeURIComponent(destination.destination_name)}`}
                className="block p-4"
              >
                <h3>{destination.destination_name}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <CreateDestination
        addNewDestination={handleAddNewDestination}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </div>
  );
}

export default DestinationList;
