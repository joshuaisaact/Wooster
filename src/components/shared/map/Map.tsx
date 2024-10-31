import React, { useEffect, forwardRef, useImperativeHandle } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapMarkers } from './MapMarkers';
import { MapBounds } from './MapBounds';
import { MapComponentProps, MapRef, createLatLng } from './types';
import './Icons';

const Map = forwardRef<MapRef, MapComponentProps>(
  (
    {
      activities = [],
      selectedActivityId = null,
      latitude = 0,
      longitude = 0,
      className,
      isInteractive = true,
      showZoomControls = true,
    },
    ref,
  ) => {
    const mapRef = React.useRef<L.Map | null>(null);

    useImperativeHandle(ref, () => ({
      flyTo: (latlng: LatLngExpression, zoom: number) => {
        if (mapRef.current) {
          mapRef.current.flyTo(latlng, zoom);
        }
      },
    }));

    const initialCenter: LatLngExpression =
      activities.length > 0
        ? createLatLng(activities[0].latitude, activities[0].longitude)
        : createLatLng(latitude, longitude);

    useEffect(() => {
      if (selectedActivityId && mapRef.current) {
        const activity = activities.find((act) => act.activityId === selectedActivityId);
        if (activity) {
          mapRef.current.flyTo(createLatLng(activity.latitude, activity.longitude), 17);
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
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          zIndex={1}
        />
        <MapMarkers activities={activities} selectedActivityId={selectedActivityId} />
        <MapBounds activities={activities} latitude={latitude} longitude={longitude} />
      </MapContainer>
    );
  },
);

export default Map;
