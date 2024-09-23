import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import DayNav from '@/components/DayNav';
import { Destination, Trip as TripType } from '@/types/types';
import ItineraryPage from './ItineraryPage';
import DestinationDetail from '@/components/DestinationDetail';

interface TripProps {
  trips: TripType[];
  destinations: Destination[];
}

function flattenItinerary(trip: { itinerary }) {
  if (trip.itinerary && Array.isArray(trip.itinerary.itinerary)) {
    // Itinerary is nested, flatten it
    return trip.itinerary.itinerary;
  }
  // Itinerary is already in the expected format
  return trip.itinerary;
}

function Trip({ trips, destinations }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(1); // Start from day 1
  const [destination, setDestination] = useState<Destination | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchDestination = async () => {
      // Check if trip exists locally first
      const localTrip = trips.find((t) => t.trip_id === tripId);
      if (localTrip) {
        setDestination(localTrip.destination); // Set local destination
        setIsLoading(false); // Local trip found, stop loading
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/trips/${tripId}`);
        const data = await response.json();
        setDestination(data.destination); // Assuming data has a destination property
      } catch (error) {
        console.error('Error fetching trip data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetch
      }
    };

    fetchDestination();
  }, [tripId, trips]);

  const trip = trips.find((t) => t.trip_id === tripId);

  // Add a loading state to prevent undefined data rendering
  if (isLoading) {
    return <p>Loading trip details...</p>;
  }

  // Show an error message if the trip is not found
  if (!trip) {
    return <p>Trip not found</p>;
  }

  const flattenedItinerary = flattenItinerary(trip);
  const currentDayItinerary = flattenedItinerary ? flattenedItinerary[currentDay - 1] : [];

  const selectedDestination = destinations.find(
    (d) => d.destination_name === trip.destination_name,
  );

  return (
    <div className="text-text flex h-full w-full flex-col pt-10">
      <div className="flex flex-col items-center justify-center">
        <Header>{trip.destination_name}</Header>
        <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>
      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        <DestinationDetail destination={selectedDestination} />
      ) : (
        <>
          <div className="flex w-full">
            {/* Added a div to ensure full width for the itinerary */}
            {currentDayItinerary && currentDayItinerary.activities.length > 0 ? (
              <ItineraryPage currentDay={currentDayItinerary} />
            ) : (
              <p>No activities for Day {currentDay}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Trip;
