import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import { Activity } from '@/types/types';

// Set default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// Props type definition
interface MapComponentProps {
  activities?: Activity[];
  latitude?: number;
  longitude?: number;
  className?: string;
}

// Component for markers
const Markers = ({ activities }: { activities: Activity[] }) => {
  return (
    <>
      {activities.map((activity, index) => (
        <Marker key={index} position={[activity.latitude, activity.longitude]}>
          <Popup>
            <strong>{activity.activity_name}</strong>
            <br />
            {activity.description}
          </Popup>
        </Marker>
      ))}
    </>
  );
};

// Component for handling map bounds
const MapWithBounds = ({ activities, latitude, longitude }: MapComponentProps) => {
  const map = useMap();

  useEffect(() => {
    if (activities && activities.length > 0) {
      const bounds = L.latLngBounds(
        activities.map((activity) => [activity.latitude, activity.longitude]),
      );
      map.fitBounds(bounds); // Adjust the map to fit the bounds of the activities
      console.log(
        'Fitting bounds to positions:',
        activities.map((a) => [a.latitude, a.longitude]),
      ); // Debugging
    } else if (latitude && longitude) {
      map.setView([latitude, longitude], 13); // Set view to default lat/lon if no activities
      console.log('Setting view to default location:', [latitude, longitude]); // Debugging
    }
  }, [activities, latitude, longitude, map]);

  return null; // This component doesn't render anything itself
};

// Main Map component
function Map({ activities = [], latitude = 0, longitude = 0, className }: MapComponentProps) {
  const initialCenter =
    activities.length > 0
      ? [activities[0].latitude, activities[0].longitude]
      : [latitude, longitude];

  return (
    <MapContainer
      center={initialCenter}
      zoom={13}
      style={{ height: '100%', width: '100%' }}
      className={className}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        zIndex={1} // Lower z-index for map tiles
      />

      <Markers activities={activities} />
      <MapWithBounds activities={activities} latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
}

export default Map;
