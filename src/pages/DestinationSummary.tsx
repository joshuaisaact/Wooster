import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import { Destination } from '@/types/types';
import DestinationDetail from '@/components/DestinationDetail';

function DestinationSummary() {
  const { destinationId } = useParams<{ destinationId: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
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
  }, [destinationId]);

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
