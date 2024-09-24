import { ReactNode } from 'react';
import { useState } from 'react';
import CreateDestination from '@/components/CreateDestnation';
import { Destination as DestinationType, Trip } from '@/types/types';
import TripCard from '@/components/TripCard';
import SavedDestinations from '@/components/SavedDestinations';
import CreateTrip from '@/components/CreateTrip';

interface DashboardProps {
  children: ReactNode;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleAddNewDestination: (newDestination: DestinationType) => void;
  trips: Trip[];
  destinations: DestinationType[];
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
      .filter((trip) => new Date(trip.start_date) >= today) // Filter out past trips
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())[0]; // Sort by date
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
              <h2 className="mt-4 text-2xl font-bold">Welcome back, Josh!</h2>
              <img src="./wooster-suitcase-no-bg.png" className="h-40" />
            </div>
            <h2>Your next trip:</h2>
            {soonestTrip ? (
              <TripCard trip={soonestTrip} destination={soonestTripDestination} />
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
            {/* Placeholder for additional widgets or controls */}
            <CreateTrip
              location={selectedDestination?.destination_name}
              addNewTrip={addNewTrip}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            {/* Another section for widgets */}
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
