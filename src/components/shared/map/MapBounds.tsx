import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { MapComponentProps, createLatLng } from './types';

export function MapBounds({ activities, latitude, longitude }: MapComponentProps) {
  const map = useMap();

  useEffect(() => {
    if (activities && activities.length > 0) {
      const bounds = new LatLngBounds(
        activities.map((activity) => createLatLng(activity.latitude, activity.longitude)),
      );
      map.fitBounds(bounds);
    } else if (latitude && longitude) {
      map.setView(createLatLng(latitude, longitude), 13);
    }
  }, [activities, latitude, longitude, map]);

  return null;
}
