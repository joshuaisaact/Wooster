export interface Destination {
  destinationId: number;
  destinationName: string;
  latitude: number;
  longitude: number;
  description: string;
  country: string;
  created_at: string;
  bestTimeToVisit: string;
  averageTemperatureLow: string;
  averageTemperatureHigh: string;
  popularActivities: string;
  travelTips: string;
  normalizedName: string;
  nearbyAttractions: string;
  transportationOptions: string;
  accessibilityInfo: string;
  officialLanguage: string;
  currency: string;
  localCuisine: string;
  costLevel: string;
  safetyRating: string;
  culturalSignificance: string;
}

export interface CreateDestinationParams {
  destinationName: string;
}

export interface DestinationResponse {
  destination: Destination;
}

export interface DestinationsResponse {
  destinations: Destination[];
}

export interface SavedDestinationsResponse {
  savedDestinations: Destination[];
}
