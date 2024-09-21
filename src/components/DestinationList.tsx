import { Destination } from '@/types/types';
import { useState, useEffect } from 'react';
import CreateDestination from './CreateDestnation';

interface DestinationListProps {
  baseURL: string;
}

function DestinationList({ baseURL }: DestinationListProps) {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleAddNewDestination(newDestination) {
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
              <h3>{destination.destination_name}</h3>
              <p>{destination.description}</p>
              <p>Country: {destination.country}</p>
              <p>
                Coordinates: {destination.latitude}, {destination.longitude}
              </p>
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
