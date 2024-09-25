import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Destination, Trip } from '@/types/types';
import DestinationDetail from '@/components/DestinationDetail';

interface DestinationSummaryProps {
  addNewTrip?: (trip: Trip) => void;
  onDeleteDestination?: (destinationId: number) => void;
  onDeleteTrip?: (tripId: string) => void;
  dispatch: React.Dispatch<any>; // Assuming you're using useReducer
  state: { isLoading: boolean; destinations: Destination[] }; // Reducer state
}

function DestinationSummary({
  addNewTrip,
  onDeleteDestination,
  onDeleteTrip,
  dispatch,
  state,
}: DestinationSummaryProps) {
  const { destinationId: destinationName } = useParams<{ destinationId: string }>();

  // Check if the destination exists in the state
  const destination = state.destinations.find((dest) => dest.destination_name === destinationName);

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  if (!destination) {
    return <p>Destination not found.</p>;
  }

  return (
    <div className="text-text flex flex-col items-center p-4">
      <DestinationDetail
        destination={destination}
        addNewTrip={addNewTrip}
        onDeleteDestination={onDeleteDestination}
        onDeleteTrip={onDeleteTrip}
        dispatch={dispatch}
      />
    </div>
  );
}

export default DestinationSummary;
