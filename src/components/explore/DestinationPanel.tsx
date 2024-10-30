import { Link } from 'react-router-dom';
import { Destination } from '@/types/types';
import DestinationCard from '../destination/DestinationCard';
import CreateDestination from '../CreateDestination';

interface DestinationPanelProps {
  focusedDestination: Destination | null;
}

function DestinationPanel({ focusedDestination }: DestinationPanelProps) {
  return (
    <div className="space-y-10">
      <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
        {focusedDestination ? (
          <Link
            to={`/destinations/${encodeURIComponent(focusedDestination.destinationName)}`}
            className="block"
          >
            <DestinationCard destination={focusedDestination} />
          </Link>
        ) : (
          <p className="w-80">Select a destination to see details.</p>
        )}
      </div>
      <div className="max-w-max rounded-lg bg-white p-6 shadow-md">
        <CreateDestination />
      </div>
    </div>
  );
}

export default DestinationPanel;
