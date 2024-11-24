import { Marker, Popup } from 'react-leaflet';
import { Activity } from '@/types';
import { createCustomIcon } from './Icons';
import { createLatLng } from './types';

interface MarkersProps {
  activities: Activity[];
  selectedActivityId: number | null;
}

export function MapMarkers({ activities, selectedActivityId }: MarkersProps) {
  return (
    <>
      {activities.map((activity) => (
        <Marker
          key={activity.activityId}
          position={createLatLng(activity.latitude, activity.longitude)}
          icon={
            selectedActivityId === activity.activityId
              ? createCustomIcon('red')
              : createCustomIcon('blue')
          }
        >
          <Popup>
            <strong>{activity.activityName}</strong>
            <br />
            {activity.description}
          </Popup>
        </Marker>
      ))}
    </>
  );
}
