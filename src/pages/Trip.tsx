import { useParams } from 'react-router-dom';
import { TripView } from '@/components/trip/TripView';
import { useAppContext } from '@/hooks/useAppContext';
import { useTripData } from '@/hooks/trip/useTripData';

export default function TripPage() {
  const { tripId } = useParams<{ tripId: string }>();
  const { state } = useAppContext();
  const { trips, destinations } = state;
  const { trip, destination } = useTripData(tripId, trips, destinations);

  if (!trip) {
    return <div className="flex h-full items-center justify-center">Trip not found</div>;
  }

  return <TripView trip={trip} destination={destination} />;
}
