import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Destination } from '@/types/types';
import DestinationDetail from '@/components/DestinationDetail';

interface DestinationSummaryProps {
  destinations?: Destination[]; // Make destinations optional in case it's not passed in
}

function DestinationSummary({ destinations = [] }: DestinationSummaryProps) {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(!destinations.length); // Only show loading if no destinations are passed in

  useEffect(() => {
    // Check if destinations were passed as props
    if (destinations.length > 0) {
      const foundDestination = destinations.find((dest) => dest.destination_name === destinationId);
      setDestination(foundDestination || null);
    } else {
      // Fallback: Fetch the destination if not found in the passed-in array
      const fetchDestination = async () => {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:4000/destinations/${destinationId}`);
          const data = await response.json();
          setDestination(data);
        } catch (error) {
          console.error('Error fetching destination details:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchDestination();
    }
  }, [destinationId, destinations]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div className="text-text flex flex-col items-center p-4">
      <Header>{destination.destination_name}</Header>
      <DestinationDetail destination={destination} />
    </div>
  );
}

export default DestinationSummary;
