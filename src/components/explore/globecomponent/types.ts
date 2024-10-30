export interface GlobePoint {
  lat: number;
  lng: number;
  name: string;
}

export interface GlobeInstance {
  pointOfView: (
    coords: { lat: number; lng: number; altitude: number },
    transitionMs?: number,
  ) => void;
  globeImageUrl: (url: string) => GlobeInstance;
  bumpImageUrl: (url: string) => GlobeInstance;
  backgroundColor: (color: string) => GlobeInstance;
  width: (width: number) => GlobeInstance;
  height: (height: number) => GlobeInstance;
  htmlElementsData: (data: GlobePoint[]) => GlobeInstance;
  htmlElement: (fn: (d: GlobePoint) => HTMLElement) => GlobeInstance;
  (element: HTMLElement): void;
}
