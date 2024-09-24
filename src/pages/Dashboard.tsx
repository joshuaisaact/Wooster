import { ReactNode, useState } from 'react';
import CreateDestination from '@/components/CreateDestnation';
import { Destination as DestinationType, Trip } from '@/types/types';
import TripCard from '@/components/TripCard';
import SavedDestinations from '@/components/SavedDestinations';
import CreateTrip from '@/components/CreateTrip';
import Map from '@/components/Map'; // Import your map component

interface DashboardProps {
  children: ReactNode;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleAddNewDestination: (newDestination: DestinationType) => void;
  trips: Trip[];
  destinations: DestinationType[];
  addNewTrip: (trip: Trip) => void;
}

function Dashboard({
  children,
  trips,
  destinations,
  handleAddNewDestination,
  isLoading,
  setIsLoading,
  addNewTrip,
}: DashboardProps) {
  const [selectedDestination, setSelectedDestination] = useState<DestinationType | null>(null);

  const getSoonestTrip = (trips: Trip[]) => {
    const today = new Date();
    return trips
      .filter((trip) => new Date(trip.start_date) >= today)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0];
  };

  const soonestTrip = getSoonestTrip(trips);
  const soonestTripDestination = soonestTrip
    ? destinations.find(
        (destination) => destination.destination_name === soonestTrip.destination_name,
      )
    : null;

  const handleDestinationClick = (destination: DestinationType) => {
    setSelectedDestination(destination); // Update the selected destination state
  };

  return (
    <div className="text-text flex h-full flex-col items-center pt-10">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 pt-10 lg:grid-cols-3">
        {/* Main content area - two-thirds width */}
        <div className="space-y-7 lg:col-span-2">
          <div className="bg-background flex min-h-[600px] flex-col gap-10 rounded-lg p-6 shadow-md">
            <div className="flex w-full flex-row items-center justify-between">
              <section>
                <h2 className="mt-4 text-2xl font-bold">Welcome back, Josh!</h2>
                <p>
                  Your next adventure is just around the corner. Ready to continue planning your
                  trip to {soonestTripDestination?.destination_name}? Wooster has all the tools you
                  need to make it unforgettable.
                </p>
              </section>
              <img src="./wooster-suitcase-no-bg.png" className="h-40" />
            </div>
            <h2>Your next trip:</h2>
            {soonestTrip ? (
              <div className="flex w-full flex-row items-stretch gap-1">
                {/* Map takes 1/3 of the width */}
                {soonestTripDestination &&
                  soonestTripDestination.latitude &&
                  soonestTripDestination.longitude && (
                    <div className="w-1/3">
                      <Map
                        latitude={soonestTripDestination.latitude}
                        longitude={soonestTripDestination.longitude}
                        className="h-full rounded-lg shadow-md"
                      />
                    </div>
                  )}

                {/* Trip Card takes 2/3 of the width */}
                <div className="w-2/3">
                  <TripCard trip={soonestTrip} destination={soonestTripDestination} />
                </div>
              </div>
            ) : (
              <p>No upcoming trips found.</p>
            )}
            <SavedDestinations
              destinations={destinations}
              handleButtonClick={handleDestinationClick}
            />
          </div>
        </div>

        {/* Sidebar - one-third width */}
        <div className="space-y-10 lg:col-span-1">
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            <CreateTrip
              location={selectedDestination?.destination_name}
              addNewTrip={addNewTrip}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            <CreateDestination
              addNewDestination={handleAddNewDestination}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
