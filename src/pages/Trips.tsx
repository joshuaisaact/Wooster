import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Trip } from '../types/types';
import CreateTrip from '@/components/CreateTrip';
import TripCard from '@/components/TripCard';

interface TripsProps {
  trips: Trip[];
  addNewTrip: (trip: Trip) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

function Trips({ trips, isLoading, setIsLoading, addNewTrip }: TripsProps) {
  if (!trips || trips.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">You have no planned trips!</h3>
          <p className="text-muted-foreground text-sm">
            View your upcoming trips here, once you've planned one
          </p>
          <CreateTrip isLoading={isLoading} setIsLoading={setIsLoading} addNewTrip={addNewTrip} />
        </div>
      </div>
    );
  }

  return (
    <div className="text-text flex h-full flex-col items-center pt-10">
      <Header>Trips</Header>
      <div className="grid grid-cols-2 justify-center">
        <ul className="grid h-[600px] w-full max-w-4xl grid-cols-1 gap-10 overflow-y-auto px-10">
          {trips.map((trip) => (
            <li key={trip.trip_id}>
              <Link to={`/trips/${trip.trip_id}`}>
                <TripCard trip={trip} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex h-full w-full items-center justify-center p-10">
          <CreateTrip isLoading={isLoading} setIsLoading={setIsLoading} addNewTrip={addNewTrip} />
        </div>
      </div>
    </div>
  );
}

export default Trips;
