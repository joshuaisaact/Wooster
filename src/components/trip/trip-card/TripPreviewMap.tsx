import { Map } from '@/components/shared/map';
import { Destination } from '@/types';

interface TripPreviewMapProps {
  destination: Destination;
}

export function TripPreviewMap({ destination }: TripPreviewMapProps) {
  if (!destination.latitude || !destination.longitude) return null;

  return (
    <div className="h-48 w-full md:w-64">
      <Map
        latitude={destination.latitude}
        longitude={destination.longitude}
        className="h-full w-full rounded-lg shadow-md"
        isInteractive={false}
        showZoomControls={false}
      />
    </div>
  );
}
