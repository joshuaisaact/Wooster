import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import Globe from 'globe.gl';

interface Destination {
  latitude: number;
  longitude: number;
  destinationName: string;
}

interface GlobeComponentProps {
  height?: number;
  width?: number;
  destinations?: Destination[];
  focusedDestination?: Destination | null;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  height = 600,
  width = 800,
  destinations = [],
  focusedDestination = null,
}) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<object | null>(null);
  console.log(globeInstanceRef);

  const points = useMemo(
    () =>
      destinations.map(({ latitude, longitude, destinationName }) => ({
        lat: latitude,
        lng: longitude,
        name: destinationName,
      })),
    [destinations],
  );

  const focusOnCoordinates = useCallback((lat: number, lng: number) => {
    if (globeInstanceRef.current) {
      globeInstanceRef.current.pointOfView({ lat, lng, altitude: 0.2 }, 1000);
    }
  }, []);

  useEffect(() => {
    if (focusedDestination) {
      focusOnCoordinates(focusedDestination.latitude, focusedDestination.longitude);
    }
  }, [focusedDestination, focusOnCoordinates]);

  useEffect(() => {
    // Store the current globeEl reference to avoid accessing a potentially stale value
    const currentGlobeEl = globeEl.current;

    const globe = Globe()
      .globeImageUrl('/earth-texture.png')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      // .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
      .backgroundColor('#F0F7F4')
      .width(width)
      .height(height)
      .htmlElementsData(points)
      .htmlElement((d) => {
        console.log(d);
        const el = document.createElement('div');
        el.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                <path d="M5 3v4"/>
                <path d="M19 17v4"/>
                <path d="M3 5h4"/>
                <path d="M17 19h4"/>
              </svg>
            </div>
            <div class="text-xs font-bold text-white bg-black bg-opacity-50 px-2 py-1 rounded-full mt-1">
              ${d.name}
            </div>
          </div>
        `;
        return el;
      });

    // Initialize globe on the current element
    if (currentGlobeEl) {
      globe(currentGlobeEl);
    }

    globeInstanceRef.current = globe;

    // Cleanup function
    return () => {
      if (currentGlobeEl) {
        currentGlobeEl.innerHTML = ''; // Safely clear the reference
      }
      globeInstanceRef.current = null;
    };
  }, [height, width, points]);

  return (
    <div
      ref={globeEl}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="flex items-center justify-center overflow-hidden rounded-lg bg-white"
    />
  );
};

export default GlobeComponent;
