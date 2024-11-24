export const queryKeys = {
  destinations: {
    all: () => ['destinations'] as const,
    saved: () => [...queryKeys.destinations.all(), 'saved'] as const,
    activities: (destinationName: string) =>
      [...queryKeys.destinations.all(), 'activities', destinationName] as const,
  },
  trips: {
    all: () => ['trips'] as const,
    detail: (id: string) => [...queryKeys.trips.all(), id] as const,
  },
} as const;
