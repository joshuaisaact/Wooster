import { useState } from 'react';
import CreateDestination from '@/components/CreateDestnation';
import { Destination, Destination as DestinationType, Trip } from '@/types/types';
import TripCard from '@/components/TripCard';
import SavedDestinations from '@/components/SavedDestinations';
import CreateTrip from '@/components/CreateTrip';
import { useAppContext } from '@/hooks/useAppContext';

function Dashboard() {
  const { state } = useAppContext(); // Access state and dispatch
  const { isLoading, trips, destinations } = state;
  const [selectedDestination, setSelectedDestination] = useState<DestinationType | null>(null);

  const getSoonestTrip = (trips: Trip[]) => {
    const today = new Date();
    return trips
      .filter((trip) => new Date(trip.startDate) >= today)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())[0];
  };

  // Get the soonest trip only if not loading
  const soonestTrip = !isLoading ? getSoonestTrip(trips) : null;
  const soonestTripDestination = soonestTrip
    ? destinations.find(
        (destination: Destination) => destination.destinationName === soonestTrip.destinationName,
      )
    : null;

  const handleDestinationClick = (destination: DestinationType) => {
    setSelectedDestination(destination); // Update the selected destination state
  };

  // Display a loading message while data is being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full flex-col items-center pt-10 text-text">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 pt-10 lg:grid-cols-3">
        {/* Main content area - two-thirds width */}
        <div className="space-y-7 lg:col-span-2">
          <div className="flex min-h-[600px] flex-col gap-10 rounded-lg bg-white p-8 shadow-md">
            <div className="flex w-full flex-row items-center justify-between">
              <section>
                <h2 className="mb-5 mt-4 text-2xl font-bold">Welcome back, Josh!</h2>
                <span>
                  <strong>Your next adventure is just around the corner.</strong>
                </span>
                <p className="mt-5">
                  Ready to continue planning your trip to {soonestTripDestination?.destinationName}?
                  Wooster has all the tools you need to make it unforgettable.
                </p>
              </section>
              <img src="./wooster-suitcase-no-bg.png" className="h-40" />
            </div>
            <h2>
              <strong>Next trip:</strong>
            </h2>
            {soonestTrip ? (
              <div className="flex w-full flex-row items-stretch gap-1">
                <TripCard trip={soonestTrip} destination={soonestTripDestination} />
              </div>
            ) : (
              <p>No upcoming trips found.</p>
            )}
            <SavedDestinations handleButtonClick={handleDestinationClick} />
          </div>
        </div>

        {/* Sidebar - one-third width */}
        <div className="space-y-10 lg:col-span-1">
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            <CreateTrip location={selectedDestination} />
          </div>
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            <CreateDestination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
