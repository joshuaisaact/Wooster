import { Activity } from '@/types';
import { LatLngExpression, LatLngTuple } from 'leaflet';

export interface MapComponentProps {
  activities?: Activity[];
  selectedActivityId?: number | null;
  latitude?: number;
  longitude?: number;
  className?: string;
  isInteractive?: boolean;
  showZoomControls?: boolean;
}

export interface MapRef {
  flyTo: (latlng: LatLngExpression, zoom: number) => void;
}
export const createLatLng = (lat: number, lng: number): LatLngTuple => [lat, lng];
