import { Destination, Trip } from '../types/types';
import CreateTrip from '@/components/CreateTrip';
import TripCard from '@/components/TripCard';
import { Action } from '@/store/reducer';
import { useAppContext } from '@/hooks/useAppContext';

function Trips() {
  const { state } = useAppContext();
  const { trips, destinations } = state;

  if (!trips || trips.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">You have no planned trips!</h3>
          <p className="text-muted-foreground text-sm">
            View your upcoming trips here, once you've planned one
          </p>
          <CreateTrip />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center pt-10 text-text">
      {/* <Header>Trips</Header> */}
      <div className="flex w-full justify-between">
        <div className="w-2/3 p-10">
          <ul className="h-[calc(100vh-120px)] overflow-y-auto">
            {trips.map((trip) => {
              const destination = destinations.find(
                (dest) => dest.destinationName === trip.destinationName,
              );

              return (
                <li key={trip.tripId} className="mb-10">
                  <TripCard trip={trip} destination={destination} />
                </li>
              );
            })}
          </ul>
        </div>
        <div className="sticky top-0 w-1/3 p-10">
          <CreateTrip />
          <img src="wooster-on-maps-no-bg.png" />
        </div>
      </div>
    </div>
  );
}

export default Trips;
