import { Link } from 'react-router-dom';
import { Destination, Trip } from '../types/types';
import CreateTrip from '@/components/CreateTrip';
import TripCard from '@/components/TripCard';

interface TripsProps {
  trips: Trip[];
  addNewTrip: (trip: Trip) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  destinations: Destination[];
}

function Trips({ trips, destinations, isLoading, setIsLoading, addNewTrip }: TripsProps) {
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
      {/* <Header>Trips</Header> */}
      <div className="flex w-full max-w-6xl justify-between">
        <div className="w-2/3 p-10">
          <ul className="h-[calc(100vh-120px)] overflow-y-auto">
            {trips.map((trip, index) => {
              const destination = destinations.find(
                (dest) => dest.destination_name === trip.destination_name,
              );

              return (
                <li key={trip.trip_id} className="mb-10">
                  <TripCard trip={trip} destination={destination} index={index} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sticky top-0 w-1/3 p-10">
          <CreateTrip isLoading={isLoading} setIsLoading={setIsLoading} addNewTrip={addNewTrip} />
          <img src="wooster-on-maps-no-bg.png" />
        </div>
      </div>
    </div>
  );
}

export default Trips;
