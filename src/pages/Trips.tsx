import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Trip } from '../types/types';

interface TripsProps {
  trips: Trip[];
}

function Trips({ trips }: TripsProps) {
  if (!trips || trips.length === 0) {
    return <Header>No trips found! Why not schedule a trip?</Header>;
  }

  return (
    <div className="flex h-full flex-col items-center pt-10">
      <Header>Trips</Header>
      <div className="flex flex-col items-center">
        <ul className="flex w-full max-w-md flex-wrap justify-center gap-4">
          {trips.map((trip) => (
            <li
              key={trip.id}
              className="mb-4 rounded-lg border transition-colors duration-200 hover:bg-gray-100"
            >
              <Link
                to={`/trips/${trip.id}`}
                className="flex items-center justify-center rounded-lg px-4 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-700 hover:text-white"
              >
                {trip.destination} ({trip.num_days} days)
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Trips;
