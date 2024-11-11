import { useState, useEffect } from 'react';
import { useAppContext } from '../useAppContext';

export function useDestinationDetails(destinationName: string | undefined) {
  const { state, loadDestinationActivities } = useAppContext();
  const { allDestinations, activities } = state;
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  const destination = destinationName
    ? allDestinations.find((dest) => dest.destinationName === destinationName)
    : undefined;

  const destinationActivities = destinationName ? activities[destinationName] || [] : [];

  useEffect(() => {
    let isMounted = true;

    const loadActivitiesIfNeeded = async () => {
      if (!destinationName || activities[destinationName]) {
        return;
      }

      setIsLoadingActivities(true);
      try {
        await loadDestinationActivities(destinationName);
      } finally {
        if (isMounted) {
          setIsLoadingActivities(false);
        }
      }
    };

    loadActivitiesIfNeeded();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    destination,
    destinationActivities,
    isLoadingActivities,
    isLoading: isLoadingActivities,
  };
}
