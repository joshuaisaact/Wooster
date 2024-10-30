import { useState } from 'react';
import { Destination } from '@/types/types';
import { useAppContext } from '@/hooks/useAppContext';
import { getSoonestTrip } from '@/utils/trips';
import MainContent from '@/components/dashboard/MainContent';
import Sidebar from '@/components/dashboard/Sidebar';

function Dashboard() {
  const { state } = useAppContext();
  const { isLoading, trips, destinations } = state;
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const soonestTrip = !isLoading ? getSoonestTrip(trips) : null;
  const soonestTripDestination = soonestTrip
    ? (destinations.find(
        (destination) => destination.destinationName === soonestTrip.destinationName,
      ) ?? null)
    : null;

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center pt-10 text-text">
      <div className="grid w-full max-w-7xl grid-cols-1 gap-8 pt-10 lg:grid-cols-3">
        <MainContent
          soonestTrip={soonestTrip}
          soonestTripDestination={soonestTripDestination}
          onDestinationClick={setSelectedDestination}
        />
        <Sidebar selectedDestination={selectedDestination} />
      </div>
    </div>
  );
}

export default Dashboard;
