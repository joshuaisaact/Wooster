import { useParams } from 'react-router-dom';
import DestinationView from '@/components/destination/DestinationView';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';

function DestinationSummary() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();

  const destination = destinations.find(
    (dest: Destination) => dest.destinationName === destinationName,
  );

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  if (!destination) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-lg">Destination not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <DestinationView destination={destination} />
    </div>
  );
}

export default DestinationSummary;
