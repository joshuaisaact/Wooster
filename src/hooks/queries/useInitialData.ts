import { useTrips } from '../trip/useTrips';
import { useSavedDestinations } from '../destination/useSavedDestinations';
import { useAllDestinations } from '../destination/useAllDestinations';

export function useInitialData() {
  const tripsQuery = useTrips();

  const allDestinationsQuery = useAllDestinations();

  const savedDestinationsQuery = useSavedDestinations();

  const isLoading =
    tripsQuery.isLoading || allDestinationsQuery.isLoading || savedDestinationsQuery.isLoading;
  const isError =
    tripsQuery.isError || allDestinationsQuery.isError || savedDestinationsQuery.isError;

  return {
    trips: tripsQuery.data,
    allDestinations: allDestinationsQuery.data,
    savedDestinations: savedDestinationsQuery.data,
    isLoading,
    isError,
  };
}
