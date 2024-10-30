import { Trip, Destination } from '@/types/types';
import WelcomeSection from './WelcomeSection';
import NextTripSection from './NextTripSection';
import { SavedDestinations } from '../destination/SavedDestinations';

interface MainContentProps {
  soonestTrip: Trip | null;
  soonestTripDestination: Destination | null;
  onDestinationClick: (destination: Destination) => void;
}

function MainContent({
  soonestTrip,
  soonestTripDestination,
  onDestinationClick,
}: MainContentProps) {
  return (
    <div className="space-y-7 lg:col-span-2">
      <div className="flex min-h-[600px] flex-col gap-10 rounded-lg bg-white p-8 shadow-md">
        <WelcomeSection nextDestination={soonestTripDestination} />
        <NextTripSection trip={soonestTrip} destination={soonestTripDestination} />
        <SavedDestinations
          onDestinationSelect={onDestinationClick}
          selectedDestinationId={null}
          className="border-none shadow-none"
        />
      </div>
    </div>
  );
}

export default MainContent;
