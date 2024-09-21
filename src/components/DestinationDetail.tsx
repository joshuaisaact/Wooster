import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Destination } from '@/types/types'; // Ensure this interface is updated
import Header from './Header';

function DestinationDetail() {
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
    <div className="flex flex-col items-center p-4">
      <Header>{destination.destination_name}</Header>
      <div className="mt-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-md">
        <h1 className="mb-2 text-2xl font-bold">{destination.destination_name}</h1>
        <p className="mb-2 text-gray-700">{destination.description}</p>
        <p className="text-gray-600">Country: {destination.country}</p>
        <p className="text-gray-600">
          Coordinates: {destination.latitude}, {destination.longitude}
        </p>
        <p className="text-gray-600">Best Time to Visit: {destination.best_time_to_visit}</p>
        <p className="text-gray-600">
          Average Low Temperature: {destination.average_temperature_low}°F
        </p>
        <p className="text-gray-600">
          Average High Temperature: {destination.average_temperature_high}°F
        </p>
        <p className="text-gray-600">Popular Activities: {destination.popular_activities}</p>
        <p className="text-gray-600">Travel Tips: {destination.travel_tips}</p>
        <p className="text-gray-600">Nearby Attractions: {destination.nearby_attractions}</p>
        <p className="text-gray-600">
          Transportation Options: {destination.transportation_options}
        </p>
        <p className="text-gray-600">Accessibility Info: {destination.accessibility_info}</p>
        <p className="text-gray-600">Official Language: {destination.official_language}</p>
        <p className="text-gray-600">Currency: {destination.currency}</p>
        <p className="text-gray-600">Local Cuisine: {destination.local_cuisine}</p>
        <p className="text-gray-600">User Ratings: {destination.user_ratings}</p>
        <p className="text-gray-600">Cost Level: {destination.cost_level}</p>
        <p className="text-gray-600">Safety Rating: {destination.safety_rating}</p>
        <p className="text-gray-600">Cultural Significance: {destination.cultural_significance}</p>
      </div>
    </div>
  );
}

export default DestinationDetail;
