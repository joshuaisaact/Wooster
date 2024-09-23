import DestinationCard from './DestinationCard';
import { Link } from 'react-router-dom';
import { Destination } from '@/types/types';

interface DestinationFullListProps {
  destinations: Destination[];
  isLoading: boolean;
  deleteDestination: (destination: Destination) => Promise<void>;
}

function DestinationFullList({
  destinations,
  isLoading,
  deleteDestination,
}: DestinationFullListProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Destination List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <li key={destination.destination_id}>
              <Link
                to={`/destinations/${encodeURIComponent(destination.destination_name)}`}
                className="block"
              >
                <DestinationCard
                  destination={destination}
                  onDeleteDestination={deleteDestination}
                  isLink={true}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DestinationFullList;
