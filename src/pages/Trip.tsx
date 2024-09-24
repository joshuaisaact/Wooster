import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DayNav from '@/components/DayNav';
import { Destination, Trip as TripType } from '@/types/types';
import ItineraryPage from './ItineraryPage';
import DestinationDetail from '@/components/DestinationDetail';

interface TripProps {
  trips: TripType[];
  destinations: Destination[];
}

function flattenItinerary(trip: TripType) {
  if (trip.itinerary && Array.isArray(trip.itinerary)) {
    // Itinerary is already in the expected format
    return trip.itinerary;
  }
  // If the itinerary is nested, flatten it (if applicable)
  return trip.itinerary;
}

function Trip({ trips, destinations }: TripProps) {
  const { tripId } = useParams<{ tripId: string }>();
  const [currentDay, setCurrentDay] = useState(0); // Start from day 1
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [trip, setTrip] = useState<TripType | null>(null); // To store the current trip

  useEffect(() => {
    // Fetch the trip from the local props
    const localTrip = trips.find((t) => t.trip_id === tripId);
    if (localTrip) {
      setTrip(localTrip);
      setIsLoading(false); // Stop loading if trip is found
    } else {
      // Optionally handle the case when the trip is not found
      console.error('Trip not found locally');
      setIsLoading(false);
    }
  }, [tripId, trips]);

  // Loading state
  if (isLoading) {
    return <p>Loading trip details...</p>;
  }

  // Show an error message if the trip is not found
  if (!trip) {
    return <p>Trip not found</p>;
  }

  // Find the corresponding destination using the trip's destination_name
  const selectedDestination = destinations.find(
    (d) => d.destination_name === trip.destination_name,
  );

  // Flatten the itinerary for easier access
  const flattenedItinerary = flattenItinerary(trip);
  const currentDayItinerary = flattenedItinerary ? flattenedItinerary[currentDay - 1] : [];

  return (
    <div className="text-text flex h-full w-full flex-col pt-10">
      <div className="flex flex-col items-center justify-center">
        <DayNav trip={trip} currentDay={currentDay} setCurrentDay={setCurrentDay} />
      </div>
      {/* Render the destination summary only if currentDay is 0 */}
      {currentDay === 0 ? (
        selectedDestination ? (
          <DestinationDetail destination={selectedDestination} trip={trip} />
        ) : (
          <p>Destination not found.</p>
        )
      ) : (
        <>
          <div className="flex w-full">
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
