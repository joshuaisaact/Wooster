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
  const { destinationId } = useParams<{ destinationId: string }>();

  useEffect(() => {
    if (!state?.destinations) {
      console.error('State is undefined or destinations are missing');
      return;
    }

    // Find destination from state
    const foundDestination = state.destinations.find(
      (dest) => dest.destination_id === Number(destinationId),
    );

    if (!foundDestination) {
      // Fetch the destination if it's not found in the reducer state
      const fetchDestination = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
          const response = await fetch(`http://localhost:4000/destinations/${destinationId}`);
          const data = await response.json();
          dispatch({ type: 'SET_DESTINATIONS', payload: [...state.destinations, data] });
        } catch (error) {
          console.error('Error fetching destination details:', error);
        } finally {
          dispatch({ type: 'SET_LOADING', payload: false }); // Ensure loading is turned off
        }
      };

      fetchDestination();
    } else {
      // If destination is already found, ensure loading is turned off
      if (state.isLoading) {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  }, [destinationId, dispatch, state.destinations, state.isLoading]);

  if (state.isLoading) {
    return <p>Loading...</p>;
  }

  const destination = state.destinations.find(
    (dest) => dest.destination_id === Number(destinationId),
  );

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
