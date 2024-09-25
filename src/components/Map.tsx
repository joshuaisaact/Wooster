import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import { Activity } from '@/types/types';

// Set default marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconRetinaUrl,
  iconUrl: markerIconUrl,
  shadowUrl: markerShadowUrl,
});

// Props type definition
interface MapComponentProps {
  activities?: Activity[];
  selectedActivityId?: number | null; // Allow null for no selection
  latitude?: number;
  longitude?: number;
  className?: string;
  isInteractive?: boolean;
  showZoomControls?: boolean;
}

const createCustomIcon = (color: string) =>
  new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

// Component for markers
const Markers = ({
  activities,
  selectedActivityId,
}: {
  activities: Activity[];
  selectedActivityId: number | null;
}) => {
  return (
    <>
      {activities.map((activity) => (
        <Marker
          key={activity.activity_id}
          position={[activity.latitude, activity.longitude]}
          icon={
            selectedActivityId === activity.activity_id
              ? createCustomIcon('red')
              : createCustomIcon('blue')
          }
        >
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
      map.fitBounds(bounds);
    } else if (latitude && longitude) {
      map.setView([latitude, longitude], 13);
    }
  }, [activities, latitude, longitude, map]);

  return null;
};

// Main Map component
const Map = forwardRef(
  (
    {
      activities = [],
      selectedActivityId = null,
      latitude = 0,
      longitude = 0,
      className,
      isInteractive = true,
      showZoomControls = true,
    }: MapComponentProps,
    ref,
  ) => {
    const mapRef = React.useRef<L.Map | null>(null);

    useImperativeHandle(ref, () => ({
      flyTo: (latlng: L.LatLngExpression, zoom: number) => {
        if (mapRef.current) {
          mapRef.current.flyTo(latlng, zoom);
        }
      },
    }));

    const initialCenter =
      activities.length > 0
        ? ([activities[0].latitude, activities[0].longitude] as L.LatLngExpression)
        : ([latitude, longitude] as L.LatLngExpression);

    useEffect(() => {
      if (selectedActivityId && mapRef.current) {
        const activity = activities.find((act) => act.activity_id === selectedActivityId);
        if (activity) {
          const latLng = [activity.latitude, activity.longitude];
          mapRef.current.flyTo(latLng, 17);
        }
      }
    }, [selectedActivityId, activities]);

    return (
      <MapContainer
        center={initialCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className={className}
        scrollWheelZoom={isInteractive}
        zoomControl={showZoomControls}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          zIndex={1}
        />

        <Markers
          activities={activities}
          selectedActivityId={selectedActivityId} // Pass selected activity ID directly
        />
        <MapWithBounds activities={activities} latitude={latitude} longitude={longitude} />
      </MapContainer>
    );
  },
);

export default Map;
