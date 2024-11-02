import { Trip, Destination } from '@/types/types';
import WelcomeSection from './WelcomeSection';
import NextTripSection from './NextTripSection';
import { SavedDestinations } from '../destination/SavedDestinations';
import { cn } from '@/lib/utils';

interface MainContentProps {
  soonestTrip: Trip | null;
  soonestTripDestination: Destination | null;
  onDestinationClick: (destination: Destination) => void;
  className?: string;
}

function MainContent({
  soonestTrip,
  soonestTripDestination,
  onDestinationClick,
  className,
}: MainContentProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="rounded-xl bg-white/70 shadow-lg backdrop-blur-sm transition-colors dark:bg-green-800/30 dark:shadow-green-900/20">
        <div className="divide-y divide-gray-100/30 dark:divide-white/10">
          <div className="p-6 md:p-8">
            <WelcomeSection nextDestination={soonestTripDestination} />
          </div>
          <div className="p-6 md:p-8">
            <NextTripSection trip={soonestTrip} destination={soonestTripDestination} />
          </div>
          <div className="p-6 md:p-8">
            <SavedDestinations
              onDestinationSelect={onDestinationClick}
              selectedDestinationId={null}
              className="border-none shadow-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainContent;
