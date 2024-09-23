import { ReactNode } from 'react';
import CreateDestination from '@/components/CreateDestnation';
import { Destination as DestinationType, Trip } from '@/types/types';
import TripCard from '@/components/TripCard';
import SavedDestinations from '@/components/SavedDestinations';

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
}: DashboardProps) {
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
      ) // Adjust based on your actual property names
    : null;

  return (
    <div className="text-text flex h-full flex-col items-center pt-10">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 pt-10 lg:grid-cols-3">
        {/* Main content area - two-thirds width */}
        <div className="space-y-7 lg:col-span-2">
          <div className="bg-background flex min-h-[600px] flex-col items-center rounded-lg p-6 shadow-md">
            <img src="./dashboard-image-removebg-preview.png" className="h-auto w-96" />
            <h2 className="mt-4 text-2xl font-bold">Welcome back, Josh!</h2>
            <h2>Your next planned trip:</h2>
            {soonestTrip ? (
              <TripCard trip={soonestTrip} destination={soonestTripDestination} />
            ) : (
              <p>No upcoming trips found.</p>
            )}
            <SavedDestinations destinations={destinations} />
          </div>
        </div>

        {/* Sidebar - one-third width */}
        <div className="space-y-10 lg:col-span-1">
          <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
            {/* Placeholder for additional widgets or controls */}
            {children}
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
