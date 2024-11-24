import { useState, useRef } from 'react';
import { Activity } from '@/types';

export function useItinerarySelection(activities: Activity[]) {
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const handleActivitySelect = (activityId: number) => {
    setSelectedActivityId(activityId);

    const selectedActivity = activities.find((activity) => activity.activityId === activityId);

    if (selectedActivity && mapRef.current) {
      mapRef.current.flyTo([selectedActivity.latitude, selectedActivity.longitude], 15);
    }
  };

  return {
    selectedActivityId,
    handleActivitySelect,
    mapRef,
  };
}
