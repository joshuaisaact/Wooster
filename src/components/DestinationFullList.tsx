import DestinationCard from './DestinationCard';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/hooks/useAppContext';

function DestinationFullList() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Destination List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {destinations.map((destination) => (
            <li key={destination.destinationId}>
              <Link
                to={`/destinations/${encodeURIComponent(destination.destinationName)}`}
                className="block"
              >
                <DestinationCard destination={destination} />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DestinationFullList;
