import { useParams } from 'react-router-dom';
import DestinationDetail from '@/components/DestinationDetail';
import { useAppContext } from '@/hooks/useAppContext';
import { Destination } from '@/types/types';

function DestinationSummary() {
  const { state } = useAppContext();
  const { isLoading, destinations } = state;
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();

  // Check if the destination exists in the state
  const destination = destinations.find(
    (dest: Destination) => dest.destination_name === destinationName,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div className="text-text flex flex-col items-center p-4">
      <DestinationDetail destination={destination} />
    </div>
  );
}

export default DestinationSummary;
