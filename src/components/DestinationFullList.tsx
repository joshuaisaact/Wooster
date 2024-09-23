import DestinationCard from './DestinationCard';
import { Link } from 'react-router-dom';

function DestinationFullList({ destinations }) {
  return (
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
  );
}

export default DestinationFullList;
