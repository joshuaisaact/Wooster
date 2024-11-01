import { SupabaseClient } from '@supabase/supabase-js';

// Global backend URL for fetching data
export const BASE_URL: string = process.env.REACT_APP_BASE_URL || 'http://localhost:4000';

// Helper function to get auth token
const getAuthHeader = async (supabase: SupabaseClient) => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    Authorization: `Bearer ${session?.access_token}`,
    'Content-Type': 'application/json',
  };
};

// Fetch destinations data
export const fetchDestinations = async () => {
  const res = await fetch(`${BASE_URL}/destinations`);
  if (!res.ok) throw new Error('Failed to fetch destinations');
  return res.json();
};

// Create a new destination (protected route)
export const createDestination = async (supabase: SupabaseClient, destinationName: string) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/destination`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ destination: destinationName }),
  });

  if (!response.ok) {
    throw new Error('Failed to create destination');
  }

  const result = await response.json();
  return result.destination;
};

// Delete a destination (protected route)
export const deleteDestination = async (supabase: SupabaseClient, destinationId: number) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/destinations/${destinationId}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete destination: ${response.statusText}`);
  }
};

// Fetch trips data (protected route)
export const fetchTrips = async (supabase: SupabaseClient) => {
  const headers = await getAuthHeader(supabase);
  const res = await fetch(`${BASE_URL}/trips`, {
    headers,
  });
  if (!res.ok) throw new Error('Failed to fetch trips');
  return res.json();
};

// Create a trip (protected route)
export const createTrip = async (
  supabase: SupabaseClient,
  tripData: {
    days: number; // removed userId since it comes from auth
    location: string;
    startDate: string | null;
  },
) => {
  const headers = await getAuthHeader(supabase);
  console.log('Sending trip data:', tripData);

  const response = await fetch(`${BASE_URL}/trip`, {
    method: 'POST',
    headers,
    body: JSON.stringify(tripData),
  });

  if (!response.ok) {
    throw new Error('Failed to create trip');
  }

  const result = await response.json();
  return result;
};

// Delete a trip (protected route)
export const deleteTrip = async (supabase: SupabaseClient, tripId: string) => {
  const headers = await getAuthHeader(supabase);
  const response = await fetch(`${BASE_URL}/trips/${tripId}`, {
    method: 'DELETE',
    headers,
  });
  if (!response.ok) {
    throw new Error(`Failed to delete trip: ${response.statusText}`);
  }
};
