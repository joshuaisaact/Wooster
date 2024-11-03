import React, { useEffect, useRef, useMemo } from 'react';
import Globe from 'globe.gl';
import { GlobeInstance } from './types';

interface Destination {
  latitude: number;
  longitude: number;
  destinationName: string;
  destinationId: number;
}

interface GlobeComponentProps {
  destinations?: Destination[];
  focusedDestination?: Destination | null;
  className?: string;
  initialAltitude?: number;
}

const GlobeComponent: React.FC<GlobeComponentProps> = ({
  destinations = [],
  focusedDestination = null,
  className = '',
  initialAltitude = 1.5,
}) => {
  const globeEl = useRef<HTMLDivElement>(null);
  const globeInstanceRef = useRef<GlobeInstance | null>(null);

  const points = useMemo(
    () =>
      destinations.map(({ latitude, longitude, destinationName }) => ({
        lat: latitude,
        lng: longitude,
        name: destinationName,
      })),
    [destinations],
  );

  // Initialize Globe only once
  useEffect(() => {
    const currentGlobeEl = globeEl.current;
    if (!currentGlobeEl) return;

    const globe = Globe() as GlobeInstance;
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    globe
      .globeImageUrl('/earth-texture.png')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundColor(isDarkMode ? '#1c3027' : '#F0F7F4')
      .width(currentGlobeEl.clientWidth)
      .height(currentGlobeEl.clientHeight)
      .htmlElementsData(points)
      .htmlElement((d) => {
        const el = document.createElement('div');
        el.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="relative">
            <div class="h-1.5 w-1.5 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.5)]"></div>
            <div class="absolute -inset-0.5 animate-[ping_2s_ease-in-out_infinite] opacity-40">
              <div class="h-full w-full rounded-full bg-yellow-400"></div>
            </div>
          </div>
          <div class="text-[0.65rem] text-white font-medium whitespace-nowrap px-1.5 py-0.5 mt-1 rounded-full"
               style="background: rgba(0, 0, 0, 0.75); backdrop-filter: blur(4px); text-shadow: 0 1px 2px rgba(0,0,0,0.5);">
            ${d.name}
          </div>
        </div>
      `;
        return el;
      });

    globe(currentGlobeEl);
    globeInstanceRef.current = globe;

    const handleResize = () => {
      if (globeInstanceRef.current) {
        globeInstanceRef.current
          .width(currentGlobeEl.clientWidth)
          .height(currentGlobeEl.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (currentGlobeEl) {
        currentGlobeEl.innerHTML = '';
      }
      globeInstanceRef.current = null;
    };
  }, []); // Empty dependency array - only run once

  // Handle focused destination changes with closer zoom
  useEffect(() => {
    if (!globeInstanceRef.current) return;

    if (focusedDestination) {
      globeInstanceRef.current.pointOfView(
        {
          lat: focusedDestination.latitude,
          lng: focusedDestination.longitude,
          altitude: 0.1, // Zoom in closer when focused
        },
        1000,
      );
    } else {
      globeInstanceRef.current.pointOfView(
        {
          lat: 0,
          lng: 0,
          altitude: initialAltitude,
        },
        1000,
      );
    }
  }, [focusedDestination, initialAltitude]);

  return <div ref={globeEl} className={`h-full w-full ${className}`} />;
};

export default GlobeComponent;
